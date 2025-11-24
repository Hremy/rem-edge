export default function decorate(block) {
  // Locations Cards block: facility cards with image, title, and address
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  console.warn('🎯 LOCATIONS CARDS - Total rows:', rows.length);
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('locations-cards-wrapper');
  
  // Process each row as a location card (skip first row which is block name)
  rows.slice(1).forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    console.warn(`🎯 Row ${idx + 1} - Cells:`, cells.length);
    
    // Log cell content for debugging
    cells.forEach((cell, cellIdx) => {
      const hasImg = cell.querySelector('img') ? 'YES' : 'NO';
      const text = cell.textContent.trim().substring(0, 50);
      console.warn(`  Cell ${cellIdx}: Image=${hasImg}, Text="${text}"`);
    });
    
    if (cells.length >= 2) {
      const card = document.createElement('div');
      card.classList.add('location-card');
      
      // Image container - check first cell for image
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('location-card-image');
      
      let img = cells[0].querySelector('img');
      if (img) {
        const newImg = img.cloneNode(true);
        imageContainer.append(newImg);
        console.warn(`  ✅ Image found in cell 0`);
      } else {
        // Fallback: use background or placeholder
        imageContainer.style.backgroundColor = '#f0f0f0';
        imageContainer.textContent = 'No Image';
      }
      
      // Content container (black background)
      const contentContainer = document.createElement('div');
      contentContainer.classList.add('location-card-content');
      
      // Title - from second cell
      const title = document.createElement('div');
      title.classList.add('location-card-title');
      title.textContent = cells[1].textContent.trim();
      
      // Address - from third cell if exists, otherwise empty
      const address = document.createElement('div');
      address.classList.add('location-card-address');
      if (cells.length >= 3) {
        address.textContent = cells[2].textContent.trim();
      } else {
        address.textContent = '';
      }
      
      // Triangle accent
      const triangle = document.createElement('div');
      triangle.classList.add('location-card-triangle');
      
      contentContainer.append(title);
      contentContainer.append(address);
      contentContainer.append(triangle);
      
      card.append(imageContainer);
      card.append(contentContainer);
      wrapper.append(card);
      
      console.warn(`  ✅ Card created: "${title.textContent}"`);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
