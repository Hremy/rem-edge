import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // clear original content
  block.textContent = '';

  const content = document.createElement('div');
  content.classList.add('footer-content');

  const meta = document.createElement('div');
  meta.classList.add('footer-meta');

  if (!fragment) {
    block.append(content);
    block.append(meta);
    return;
  }

  const ul = fragment.querySelector('ul');
  
  if (!ul) {
    // fallback: just append fragment as-is
    while (fragment.firstElementChild) block.append(fragment.firstElementChild);
    block.append(content);
    block.append(meta);
    return;
  }

  const topLis = Array.from(ul.querySelectorAll(':scope > li'));
  console.log('Footer: Found top-level items:', topLis.length, topLis.map(li => li.textContent.trim().substring(0, 30)));
  
  if (!topLis.length) {
    block.append(content);
    block.append(meta);
    return;
  }

  // First 4 top-level items => columns
  const columnItems = topLis.slice(0, 4);
  const metaItems = topLis.slice(4);

  columnItems.forEach((item, idx) => {
    const column = document.createElement('div');
    column.classList.add('footer-column');

    const colUl = document.createElement('ul');

    // Heading (own text only)
    const headingLi = document.createElement('li');
    headingLi.classList.add('footer-heading');

    const ownTextNode = Array.from(item.childNodes)
      .find((n) => n.nodeType === Node.TEXT_NODE);
    headingLi.textContent = (ownTextNode ? ownTextNode.textContent : '').trim();
    
    colUl.append(headingLi);

    // Links (children of nested <ul>, if any)
    const nested = item.querySelector(':scope > ul');
    if (nested) {
      const linksUl = document.createElement('ul');
      linksUl.classList.add('footer-links');

      nested.querySelectorAll(':scope > li').forEach((li) => {
        const linkLi = document.createElement('li');
        linkLi.textContent = li.textContent.trim();
        linksUl.append(linkLi);
      });

      if (linksUl.childElementCount) headingLi.append(linksUl);
    }

    column.append(colUl);
    content.append(column);
  });

  // Meta row from remaining items
  const metaLeft = document.createElement('div');
  metaLeft.classList.add('footer-meta-left');

  const metaRight = document.createElement('div');
  metaRight.classList.add('footer-meta-right');

  const isButtonLabel = (label) => {
    const t = label.toLowerCase();
    return t.includes('contact') || t.includes('mondo acerbis') || t.includes('acerbis world');
  };

  metaItems.forEach((item) => {
    const rawText = item.textContent.trim();
    if (!rawText) return;

    // Normalise whitespace
    const text = rawText.replace(/\s+/g, ' ');

    if (isButtonLabel(text)) {
      const link = document.createElement('a');
      link.classList.add('footer-meta-button');
      link.textContent = text;

      // Use real URLs for the buttons
      if (/contact/i.test(text)) {
        link.href = 'https://www.acerbis.com/it/contatti';
      } else {
        // Acerbis World / Mondo Acerbis
        link.href = 'https://www.acerbis.com/it';
      }

      metaRight.append(link);
    } else {
      const p = document.createElement('p');
      p.textContent = text;
      metaLeft.append(p);
    }
  });
  
  meta.append(metaLeft);
  if (metaRight.childElementCount) meta.append(metaRight);
  
  block.append(content);
  if (meta.childElementCount) block.append(meta);
}
