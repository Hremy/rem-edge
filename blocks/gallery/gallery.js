import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Gallery block: image grid with lightbox
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('gallery-wrapper');
  
  rows.forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    cells.forEach((cell) => {
      const img = cell.querySelector('img');
      
      if (img) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        
        const picture = createOptimizedPicture(img.src, img.alt, false, [
          { width: '600' },
          { width: '400' },
        ]);
        picture.classList.add('gallery-image');
        
        const link = document.createElement('a');
        link.href = img.src;
        link.setAttribute('data-fancybox', 'gallery');
        link.setAttribute('data-caption', img.alt || '');
        link.append(picture);
        
        galleryItem.append(link);
        wrapper.append(galleryItem);
      }
    });
  });
  
  block.textContent = '';
  block.append(wrapper);
}
