/**
 * Image Section Block
 * Displays a full-width image section with background image styling
 * Supports responsive layout with proper aspect ratio
 */

export default function decorate(block) {
  // Get the image URL from the block content
  const picture = block.querySelector('picture');
  const link = block.querySelector('a');
  
  if (!picture || !link) {
    return;
  }

  const imageUrl = link.href;
  
  // Create the wrapper structure
  const wrapper = document.createElement('div');
  wrapper.className = 'image-section-wrapper';
  
  // Create the container with background image
  const container = document.createElement('div');
  container.className = 'image-section-container';
  container.style.backgroundImage = `url(${imageUrl})`;
  
  // Create the placeholder image for aspect ratio
  const placeholder = document.createElement('img');
  placeholder.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"%3E%3C/svg%3E';
  placeholder.className = 'image-section-placeholder';
  placeholder.alt = 'Image section';
  
  container.appendChild(placeholder);
  wrapper.appendChild(container);
  
  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(wrapper);
}
