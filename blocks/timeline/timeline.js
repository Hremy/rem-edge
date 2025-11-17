export default function decorate(block) {
  // Timeline block: vertical timeline of events/milestones
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('timeline-wrapper');
  
  rows.forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 2) {
      const timelineItem = document.createElement('div');
      timelineItem.classList.add('timeline-item');
      
      // Year/Date
      const year = document.createElement('div');
      year.classList.add('timeline-year');
      year.textContent = cells[0].textContent.trim();
      
      // Event description
      const event = document.createElement('div');
      event.classList.add('timeline-event');
      event.innerHTML = cells[1].innerHTML;
      
      timelineItem.append(year);
      timelineItem.append(event);
      wrapper.append(timelineItem);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
