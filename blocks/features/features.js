export default function decorate(block) {
  // Features block: 3-column grid of features
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('features-wrapper');
  
  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    cells.forEach((cell) => {
      const feature = document.createElement('div');
      feature.classList.add('feature-item');
      
      const heading = cell.querySelector('h2, h3, h4');
      const paragraphs = cell.querySelectorAll('p');
      
      if (heading) {
        heading.classList.add('feature-title');
        feature.append(heading.cloneNode(true));
      }
      
      paragraphs.forEach((p) => {
        p.classList.add('feature-description');
        feature.append(p.cloneNode(true));
      });
      
      wrapper.append(feature);
    });
  });
  
  block.textContent = '';
  block.append(wrapper);
}
