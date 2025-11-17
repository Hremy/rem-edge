export default function decorate(block) {
  // CTA block: heading + description + button(s)
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('cta-wrapper');
  
  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    cells.forEach((cell) => {
      const heading = cell.querySelector('h1, h2, h3');
      const paragraphs = cell.querySelectorAll('p');
      const links = cell.querySelectorAll('a');
      
      if (heading) {
        heading.classList.add('cta-heading');
      }
      
      paragraphs.forEach((p) => {
        p.classList.add('cta-text');
      });
      
      links.forEach((link) => {
        link.classList.add('cta-button');
      });
      
      cell.classList.add('cta-content');
      wrapper.append(cell);
    });
  });
  
  block.textContent = '';
  block.append(wrapper);
}
