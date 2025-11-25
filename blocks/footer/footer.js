export default function decorate(block) {
  // Parse footer data from the table
  const rows = block.querySelectorAll('tr');
  
  // Skip first row (block name)
  if (rows.length < 2) return;
  
  // Build footer structure
  const footer = document.createElement('div');
  footer.className = 'footer-container';
  
  // Create main footer content
  const mainContent = document.createElement('div');
  mainContent.className = 'footer-main';
  
  // Parse main content row (second row)
  const mainRow = rows[1];
  const mainCells = mainRow.querySelectorAll('td');
  
  // Column 1: Logo and description
  const col1 = document.createElement('div');
  col1.className = 'footer-col footer-col-1';
  if (mainCells[0]) {
    const logoDiv = mainCells[0].querySelector('.footer-logo');
    const description = mainCells[0].querySelector('p');
    
    col1.innerHTML = '';
    if (logoDiv) col1.appendChild(logoDiv.cloneNode(true));
    if (description) col1.appendChild(description.cloneNode(true));
  }
  
  // Column 2: Sectors
  const col2 = document.createElement('div');
  col2.className = 'footer-col footer-col-2';
  if (mainCells[1]) {
    const title = mainCells[1].querySelector('h6');
    const links = mainCells[1].querySelector('ul');
    
    col2.innerHTML = '';
    if (title) col2.appendChild(title.cloneNode(true));
    if (links) col2.appendChild(links.cloneNode(true));
  }
  
  // Column 3: Technologies
  const col3 = document.createElement('div');
  col3.className = 'footer-col footer-col-3';
  if (mainCells[2]) {
    const title = mainCells[2].querySelector('h6');
    const links = mainCells[2].querySelector('ul');
    
    col3.innerHTML = '';
    if (title) col3.appendChild(title.cloneNode(true));
    if (links) col3.appendChild(links.cloneNode(true));
  }
  
  // Column 4: Engineering
  const col4 = document.createElement('div');
  col4.className = 'footer-col footer-col-4';
  if (mainCells[3]) {
    const title = mainCells[3].querySelector('h6');
    const links = mainCells[3].querySelector('ul');
    
    col4.innerHTML = '';
    if (title) col4.appendChild(title.cloneNode(true));
    if (links) col4.appendChild(links.cloneNode(true));
  }
  
  mainContent.appendChild(col1);
  mainContent.appendChild(col2);
  mainContent.appendChild(col3);
  mainContent.appendChild(col4);
  
  // Create footer bottom
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';
  
  // Parse footer bottom row (third row)
  if (rows.length > 2) {
    const bottomRow = rows[2];
    const bottomCells = bottomRow.querySelectorAll('td');
    
    // Left side: Copyright
    const footerLeft = document.createElement('div');
    footerLeft.className = 'footer-left';
    if (bottomCells[0]) {
      const copyright = bottomCells[0].querySelector('p');
      if (copyright) footerLeft.appendChild(copyright.cloneNode(true));
    }
    
    // Right side: Buttons
    const footerRight = document.createElement('div');
    footerRight.className = 'footer-right';
    if (bottomCells[3]) {
      const buttons = bottomCells[3].querySelector('.footer-buttons');
      if (buttons) footerRight.appendChild(buttons.cloneNode(true));
    }
    
    footerBottom.appendChild(footerLeft);
    footerBottom.appendChild(footerRight);
  }
  
  // Clear block and append new content
  block.innerHTML = '';
  footer.appendChild(mainContent);
  footer.appendChild(footerBottom);
  block.appendChild(footer);
}
