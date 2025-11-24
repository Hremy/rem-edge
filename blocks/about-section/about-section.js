export default function decorate(block) {
  // About Section block: text content + video + stats
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('about-section-wrapper');
  
  let statsGrid = null;
  let statsCount = 0;
  
  // Process rows based on content type
  rows.forEach((row, rowIndex) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (rowIndex === 0) {
      // First row: two-column layout (image/placeholder + text content)
      if (cells.length >= 2) {
        const container = document.createElement('div');
        container.classList.add('about-section-intro');
        
        // Left column (image/placeholder)
        const leftCol = document.createElement('div');
        leftCol.classList.add('about-section-image');
        leftCol.innerHTML = cells[0].innerHTML;
        
        // Right column (text content)
        const rightCol = document.createElement('div');
        rightCol.classList.add('about-section-content');
        rightCol.innerHTML = cells[1].innerHTML;
        
        container.append(leftCol);
        container.append(rightCol);
        wrapper.append(container);
      }
    } else if (rowIndex === 1) {
      // Second row: video section
      if (cells.length >= 1) {
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('about-section-video');
        videoContainer.innerHTML = cells[0].innerHTML;
        wrapper.append(videoContainer);
      }
    } else if (rowIndex >= 2) {
      // Remaining rows: stats
      // Create stats grid on first stat row
      if (!statsGrid) {
        statsGrid = document.createElement('div');
        statsGrid.classList.add('about-stats-grid');
        wrapper.append(statsGrid);
      }
      
      if (cells.length >= 2) {
        const statItem = document.createElement('div');
        statItem.classList.add('about-stat-item');
        
        // Number
        const number = document.createElement('div');
        number.classList.add('about-stat-number');
        number.textContent = cells[0].textContent.trim();
        
        // Label
        const label = document.createElement('div');
        label.classList.add('about-stat-label');
        label.textContent = cells[1].textContent.trim();
        
        statItem.append(number);
        statItem.append(label);
        statsGrid.append(statItem);
        statsCount++;
      }
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
