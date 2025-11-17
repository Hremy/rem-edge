import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  sections.querySelectorAll(':scope ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  if (!navSections) return;
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections ? navSections.querySelectorAll('.nav-drop') : [];
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  
  // Build nav model from all list items in the fragment (including nested).
  // Extract text and URL from each <li> to support links.
  const allLis = Array.from(fragment.querySelectorAll('li'));
  if (allLis.length) {
    const labels = [];
    allLis.forEach((li) => {
      // Check if there's a link
      const link = li.querySelector(':scope > a');
      let text = '';
      let url = '';

      if (link) {
        text = link.textContent.trim();
        url = link.href;
      } else {
        // Own text node (ignore nested <ul> text)
        const ownTextNode = Array.from(li.childNodes)
          .find((n) => n.nodeType === Node.TEXT_NODE);
        text = (ownTextNode ? ownTextNode.textContent : '').trim();
      }

      if (text && !labels.find((l) => l.text === text)) {
        labels.push({ text, url });
      }
    });

    // Expected order (from nav-content.txt)
    // 0: Acerbis
    // 1-3: Chi siamo, R&D e Qualità, Sostenibilità
    // 4: Settori
    // 5-9: Motorcycle, Agricoltura, Movimento terra, Material handling, Altri settori
    // 10: Tecnologie
    // 11-12: Stampaggio rotazionale, Stampaggio a iniezione
    // 13: Engineering
    // 14-15: Project Management, Engineering Capability
    // 16: Lavora con noi
    // 17: Contatti
    // 18: Mondo Acerbis

    if (labels.length >= 19) {
      const navModel = [
        { label: labels[0], children: labels.slice(1, 4) },
        { label: labels[4], children: labels.slice(5, 10) },
        { label: labels[10], children: labels.slice(11, 13) },
        { label: labels[13], children: labels.slice(14, 16) },
        { label: labels[16], children: [] },
        { label: labels[17], children: [] },
        { label: labels[18], children: [] },
      ];

      // Brand: Acerbis + OEM DIVISION
      const brandDiv = document.createElement('div');
      brandDiv.classList.add('nav-brand');
      const brandText = document.createElement('div');
      brandText.innerHTML = `<strong>${labels[0].text}</strong><br><small>OEM DIVISION</small>`;
      brandDiv.append(brandText);
      nav.append(brandDiv);

      // Sections (main nav + dropdowns)
      const sectionsDiv = document.createElement('div');
      sectionsDiv.classList.add('nav-sections');
      const sectionsUl = document.createElement('ul');

      navModel.forEach((item) => {
        const li = document.createElement('li');
        
        // Create link or text for main item
        if (item.label.url) {
          const a = document.createElement('a');
          a.href = item.label.url;
          a.textContent = item.label.text;
          li.append(a);
        } else {
          li.textContent = item.label.text;
        }

        if (item.children && item.children.length > 0) {
          li.classList.add('nav-drop');
          const subUl = document.createElement('ul');
          item.children.forEach((childItem) => {
            const subLi = document.createElement('li');
            
            // Create link or text for child item
            if (childItem.url) {
              const a = document.createElement('a');
              a.href = childItem.url;
              a.textContent = childItem.text;
              subLi.append(a);
            } else {
              subLi.textContent = childItem.text;
            }
            
            subUl.append(subLi);
          });
          li.append(subUl);
        }
        sectionsUl.append(li);
      });

      sectionsDiv.append(sectionsUl);
      nav.append(sectionsDiv);
    } else {
      // Fallback: append fragment content as-is
      while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
    }
  } else {
    // Fallback
    while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  }

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand ? navBrand.querySelector('.button') : null;
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // nav-tools (language selector + buttons)
  const toolsDiv = document.createElement('div');
  toolsDiv.classList.add('nav-tools');
  
  // Get current language from localStorage or default to IT
  const currentLang = localStorage.getItem('acerbis-lang') || 'IT';
  
  // Language labels
  const langLabels = {
    IT: { mondo: 'Acerbis World', contatti: 'Contacts', lang: 'ITA', altLang: 'ENGLISH' },
    EN: { mondo: 'Acerbis World', contatti: 'Contacts', lang: 'ENG', altLang: 'ITALIANO' }
  };
  
  toolsDiv.innerHTML = `
    <div class="nav-language-selector">
      <div class="nav-language-dropdown">
        <button class="nav-language-btn">${langLabels[currentLang].lang} ▼</button>
        <div class="nav-language-menu">
          <button class="nav-language-option" data-lang="IT">ITA</button>
          <button class="nav-language-option" data-lang="EN">ENG</button>
        </div>
      </div>
      <span class="nav-language-alt">${langLabels[currentLang].altLang}</span>
    </div>
    <a href="#mondo-acerbis" class="nav-tool-link">${langLabels[currentLang].mondo}</a>
    <a href="#contatti" class="nav-tool-link">${langLabels[currentLang].contatti}</a>
  `;
  nav.append(toolsDiv);
  
  // Language switcher functionality
  const langDropdown = toolsDiv.querySelector('.nav-language-dropdown');
  const langBtn = toolsDiv.querySelector('.nav-language-btn');
  const langMenu = toolsDiv.querySelector('.nav-language-menu');
  const langOptions = toolsDiv.querySelectorAll('.nav-language-option');
  
  // Toggle dropdown
  langBtn.addEventListener('click', () => {
    langMenu.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!langDropdown.contains(e.target)) {
      langMenu.classList.remove('active');
    }
  });
  
  // Language option selection
  langOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      const lang = opt.getAttribute('data-lang');
      localStorage.setItem('acerbis-lang', lang);
      window.location.reload();
    });
  });

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  if (navSections) {
    hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
    nav.prepend(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    // prevent mobile nav behavior on window resize
    toggleMenu(nav, navSections, isDesktop.matches);
    isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));
  }

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
