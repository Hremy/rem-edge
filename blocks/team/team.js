import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Team block: grid of team members with photo + name + role
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('team-wrapper');
  
  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 1) {
      const teamMember = document.createElement('div');
      teamMember.classList.add('team-member');
      
      // Photo
      const img = cells[0].querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [
          { width: '400' },
          { width: '300' },
        ]);
        picture.classList.add('team-photo');
        teamMember.append(picture);
      }
      
      // Name and role
      const info = document.createElement('div');
      info.classList.add('team-info');
      
      if (cells[1]) {
        const heading = cells[1].querySelector('h3, h4');
        if (heading) {
          const name = document.createElement('h3');
          name.classList.add('team-name');
          name.textContent = heading.textContent;
          info.append(name);
        }
        
        const paragraphs = cells[1].querySelectorAll('p');
        if (paragraphs.length > 0) {
          const role = document.createElement('p');
          role.classList.add('team-role');
          role.textContent = paragraphs[0].textContent;
          info.append(role);
        }
      }
      
      teamMember.append(info);
      wrapper.append(teamMember);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
