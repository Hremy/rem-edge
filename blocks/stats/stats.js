export default function decorate(block) {
  // Stats block: display numbers with labels
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('stats-wrapper');
  
  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 2) {
      const statItem = document.createElement('div');
      statItem.classList.add('stat-item');
      
      // Number
      const number = document.createElement('div');
      number.classList.add('stat-number');
      number.textContent = cells[0].textContent.trim();
      
      // Label
      const label = document.createElement('div');
      label.classList.add('stat-label');
      label.textContent = cells[1].textContent.trim();
      
      statItem.append(number);
      statItem.append(label);
      wrapper.append(statItem);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
