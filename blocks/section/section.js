export default function decorate(block) {
  // Generic section block for flexible content
  // Accepts headings, paragraphs, lists, and other text elements
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    cells.forEach((cell) => {
      // Add section-content class for styling
      cell.classList.add('section-content');
      
      // Style headings
      const headings = cell.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((h) => {
        h.classList.add('section-heading');
      });
      
      // Style paragraphs
      const paragraphs = cell.querySelectorAll('p');
      paragraphs.forEach((p) => {
        p.classList.add('section-paragraph');
      });
      
      // Style lists
      const lists = cell.querySelectorAll('ul, ol');
      lists.forEach((list) => {
        list.classList.add('section-list');
      });
      
      // Style links
      const links = cell.querySelectorAll('a');
      links.forEach((link) => {
        link.classList.add('section-link');
      });
    });
  });
}
