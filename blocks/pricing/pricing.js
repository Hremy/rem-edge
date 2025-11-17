export default function decorate(block) {
  // Pricing block: pricing plans with features and CTA
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('pricing-wrapper');
  
  rows.forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 4) {
      const plan = document.createElement('div');
      plan.classList.add('pricing-plan');
      
      // Plan name
      const name = document.createElement('h3');
      name.classList.add('pricing-name');
      name.textContent = cells[0].textContent.trim();
      
      // Features
      const features = document.createElement('ul');
      features.classList.add('pricing-features');
      const featureText = cells[1].textContent.trim().split('\n');
      featureText.forEach((f) => {
        if (f.trim()) {
          const li = document.createElement('li');
          li.textContent = f.trim();
          features.append(li);
        }
      });
      
      // Price
      const price = document.createElement('div');
      price.classList.add('pricing-price');
      price.textContent = cells[2].textContent.trim();
      
      // Button
      const btnCell = cells[3];
      const link = btnCell.querySelector('a');
      const button = document.createElement('a');
      button.classList.add('pricing-button');
      button.href = link ? link.href : '#';
      button.textContent = link ? link.textContent : 'Get Started';
      
      plan.append(name);
      plan.append(features);
      plan.append(price);
      plan.append(button);
      wrapper.append(plan);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
