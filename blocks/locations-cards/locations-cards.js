export default function decorate(block) {
  // Locations Cards block: facility cards with image, title, and address
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('locations-cards-wrapper');
  
  // Process each row as a location card
  rows.forEach((row, rowIndex) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    // Skip first row if it's the block name
    if (rowIndex === 0 && cells.length === 1 && cells[0].textContent.trim().toLowerCase().includes('locations')) {
      return;
    }
    
    if (cells.length >= 3) {
      const card = document.createElement('div');
      card.classList.add('location-card');
      
      // Image container
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('location-card-image');
      const img = cells[0].querySelector('img');
      if (img) {
        const newImg = img.cloneNode(true);
        imageContainer.append(newImg);
      } else {
        imageContainer.innerHTML = cells[0].innerHTML;
      }
      
      // Content container (black background)
      const contentContainer = document.createElement('div');
      contentContainer.classList.add('location-card-content');
      
      // Title
      const title = document.createElement('div');
      title.classList.add('location-card-title');
      title.textContent = cells[1].textContent.trim();
      
      // Address
      const address = document.createElement('div');
      address.classList.add('location-card-address');
      address.textContent = cells[2].textContent.trim();
      
      // Triangle accent
      const triangle = document.createElement('div');
      triangle.classList.add('location-card-triangle');
      
      contentContainer.append(title);
      contentContainer.append(address);
      contentContainer.append(triangle);
      
      card.append(imageContainer);
      card.append(contentContainer);
      wrapper.append(card);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
