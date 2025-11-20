export default function decorate(block) {
  // Banner component: hero banner with background image + overlay + CTA
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  // First row: background image
  const firstRow = rows[0];
  const bgCell = firstRow.querySelector(':scope > div');
  const bgImg = bgCell?.querySelector('img');
  
  if (bgImg) {
    block.style.backgroundImage = `url('${bgImg.src}')`;
  }
  
  // Content rows
  const content = document.createElement('div');
  content.classList.add('banner-content');
  
  rows.slice(1).forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    cells.forEach((cell) => {
      const heading = cell.querySelector('h1, h2, h3');
      const paragraphs = cell.querySelectorAll('p');
      const links = cell.querySelectorAll('a');
      
      if (heading) {
        const h = document.createElement('h1');
        h.classList.add('banner-heading');
        h.textContent = heading.textContent;
        content.append(h);
      }
      
      paragraphs.forEach((p) => {
        const para = document.createElement('p');
        para.classList.add('banner-text');
        para.textContent = p.textContent;
        content.append(para);
      });
      
      links.forEach((link) => {
        const btn = document.createElement('a');
        btn.href = link.href;
        btn.classList.add('banner-button');
        btn.textContent = link.textContent;
        content.append(btn);
      });
    });
  });
  
  block.textContent = '';
  block.append(content);
}
