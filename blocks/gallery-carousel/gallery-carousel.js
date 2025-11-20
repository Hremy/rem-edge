export default function decorate(block) {
  // Gallery Carousel component: 4-column image grid with lightbox
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const container = document.createElement('div');
  container.classList.add('gallery-carousel-container');
  
  // Process each row as a gallery item (skip first row which is the block name)
  rows.slice(1).forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 1) {
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
        imageUrl = link.href;
      }
      
      // Check for text content in second cell
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
        
        // Create image
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = caption;
        imgElement.classList.add('gallery-carousel-image');
        
        galleryLink.append(imgElement);
        item.append(galleryLink);
        container.append(item);
      }
    }
  });
  
  block.textContent = '';
  block.append(container);
  
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
