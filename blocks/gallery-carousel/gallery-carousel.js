export default function decorate(block) {
  // Gallery Carousel component: image grid with lightbox
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('gallery-carousel-wrapper');
  
  const container = document.createElement('div');
  container.classList.add('gallery-carousel-container');
  
  // Process each row as a gallery item (skip first row which is the block name)
  rows.slice(1).forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 1) {
      // Try to get image from first cell or link from second cell
      let imageUrl = null;
      let caption = '';
      
      const firstCell = cells[0];
      const secondCell = cells[1];
      
      // Check first cell for image
      const img = firstCell.querySelector('img');
      if (img) {
        imageUrl = img.src;
        caption = img.alt || '';
      }
      
      // Check second cell for link (URL)
      const link = secondCell?.querySelector('a');
      if (link && !imageUrl) {
        imageUrl = link.href;
        caption = link.textContent || '';
      } else if (link && imageUrl) {
        // If we have both, use the link as the full-size image
        imageUrl = link.href;
      }
      
      // Also check for text content in second cell
      if (!imageUrl && secondCell) {
        const text = secondCell.textContent.trim();
        if (text.startsWith('http')) {
          imageUrl = text;
        }
      }
      
      if (imageUrl) {
        const item = document.createElement('div');
        item.classList.add('gallery-carousel-item');
        
        // Create gallery link with lightbox
        const galleryLink = document.createElement('a');
        galleryLink.href = imageUrl;
        galleryLink.classList.add('gallery-carousel-link');
        galleryLink.setAttribute('data-fancybox', 'gallery');
        galleryLink.setAttribute('data-caption', caption);
        
        // Create placeholder image - this will be the main display
        const placeholderImg = document.createElement('img');
        placeholderImg.src = imageUrl;
        placeholderImg.alt = caption;
        placeholderImg.classList.add('gallery-carousel-placeholder');
        placeholderImg.style.width = '100%';
        placeholderImg.style.height = '100%';
        placeholderImg.style.objectFit = 'cover';
        placeholderImg.style.display = 'block';
        
        galleryLink.append(placeholderImg);
        item.append(galleryLink);
        container.append(item);
        
        console.log('Gallery item added:', imageUrl);
      }
    }
  });
  
  wrapper.append(container);
  
  block.textContent = '';
  block.append(wrapper);
  
  // Load Fancybox if available
  if (window.Fancybox) {
    window.Fancybox.bind('[data-fancybox="gallery"]', {
      on: {
        reveal: (fancybox, slide) => {
          // Optional: add custom behavior
        }
      }
    });
  }
}
