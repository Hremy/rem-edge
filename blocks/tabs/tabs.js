export default function decorate(block) {
  // Tabs block: tabbed content switcher
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('tabs-wrapper');
  
  // Tab buttons
  const tabButtons = document.createElement('div');
  tabButtons.classList.add('tabs-buttons');
  
  // Tab content
  const tabContents = document.createElement('div');
  tabContents.classList.add('tabs-contents');
  
  rows.forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 2) {
      // Create button
      const btn = document.createElement('button');
      btn.classList.add('tab-button');
      btn.textContent = cells[0].textContent.trim();
      btn.setAttribute('data-tab', idx);
      if (idx === 0) btn.classList.add('active');
      
      // Create content
      const content = document.createElement('div');
      content.classList.add('tab-content');
      content.setAttribute('data-tab', idx);
      content.innerHTML = cells[1].innerHTML;
      if (idx === 0) content.classList.add('active');
      
      // Click handler
      btn.addEventListener('click', () => {
        // Remove active from all
        document.querySelectorAll('.tab-button').forEach((b) => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        content.classList.add('active');
      });
      
      tabButtons.append(btn);
      tabContents.append(content);
    }
  });
  
  wrapper.append(tabButtons);
  wrapper.append(tabContents);
  
  block.textContent = '';
  block.append(wrapper);
}
