export default function decorate(block) {
  // Accordion component: expandable sections
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('accordion-wrapper');
  
  rows.forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 2) {
      const item = document.createElement('div');
      item.classList.add('accordion-item');
      
      // Header/Title button
      const header = document.createElement('button');
      header.classList.add('accordion-header');
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('aria-controls', `accordion-content-${idx}`);
      
      const title = document.createElement('span');
      title.classList.add('accordion-title');
      title.textContent = cells[0].textContent.trim();
      
      const icon = document.createElement('span');
      icon.classList.add('accordion-icon');
      icon.innerHTML = '+';
      
      header.append(title, icon);
      
      // Content panel
      const content = document.createElement('div');
      content.classList.add('accordion-content');
      content.id = `accordion-content-${idx}`;
      content.setAttribute('hidden', '');
      content.innerHTML = cells[1].innerHTML;
      
      // Toggle functionality
      header.addEventListener('click', () => {
        const isOpen = content.hasAttribute('hidden');
        
        if (isOpen) {
          content.removeAttribute('hidden');
          header.setAttribute('aria-expanded', 'true');
          item.classList.add('open');
        } else {
          content.setAttribute('hidden', '');
          header.setAttribute('aria-expanded', 'false');
          item.classList.remove('open');
        }
      });
      
      item.append(header, content);
      wrapper.append(item);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
