export default function decorate(block) {
  // Content block with background image on left, text on right
  // Structure: First row = image, second row = content
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  if (rows.length === 0) return;
  
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('content-wrapper');
  
  // Process first row as background image
  if (rows[0]) {
    const firstRowCells = Array.from(rows[0].querySelectorAll(':scope > div'));
    if (firstRowCells.length > 0) {
      const imgCell = firstRowCells[0];
      const img = imgCell.querySelector('img');
      
      if (img) {
        const bgDiv = document.createElement('div');
        bgDiv.classList.add('content-bg');
        bgDiv.style.backgroundImage = `url('${img.src}')`;
        wrapper.append(bgDiv);
      }
    }
  }
  
  // Process second row as content (title + text)
  if (rows[1]) {
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-text');
    
    const contentCells = Array.from(rows[1].querySelectorAll(':scope > div'));
    contentCells.forEach((cell) => {
      const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
      const paragraphs = cell.querySelectorAll('p');
      
      if (heading) {
        heading.classList.add('content-title');
      }
      
      paragraphs.forEach((p) => {
        p.classList.add('content-paragraph');
      });
      
      // Append all content
      Array.from(cell.children).forEach((child) => {
        contentDiv.append(child.cloneNode(true));
      });
    });
    
    wrapper.append(contentDiv);
  }
  
  // Replace block content
  block.textContent = '';
  block.append(wrapper);
}
