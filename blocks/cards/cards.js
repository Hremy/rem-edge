import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    
    ul.append(li);
  });
  
  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [
        { width: '750' },
        { width: '500' },
        { width: '300' },
      ])
    );
  });
  
  block.replaceChildren(ul);
  
  // Apply grid variations based on block classes
  // Usage: Add class "two-column", "three-column", "four-column", or "five-column" to the block
  const gridVariations = ['two-column', 'three-column', 'four-column', 'five-column'];
  gridVariations.forEach((variation) => {
    if (block.classList.contains(variation)) {
      block.classList.add(variation);
    }
  });
}
