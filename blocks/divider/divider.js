export default function decorate(block) {
  // Divider block: visual separator
  
  block.classList.add('divider-block');
  block.textContent = '';
  
  const divider = document.createElement('div');
  divider.classList.add('divider-line');
  
  block.append(divider);
}
