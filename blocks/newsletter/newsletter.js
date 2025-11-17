export default function decorate(block) {
  // Newsletter block: email subscription form
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('newsletter-wrapper');
  
  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('newsletter-heading');
  heading.textContent = 'Subscribe to Our Newsletter';
  
  // Description
  const description = document.createElement('p');
  description.classList.add('newsletter-description');
  description.textContent = 'Get the latest updates delivered to your inbox.';
  
  // Form
  const form = document.createElement('form');
  form.classList.add('newsletter-form');
  
  // Email input
  const input = document.createElement('input');
  input.type = 'email';
  input.placeholder = 'Enter your email';
  input.classList.add('newsletter-input');
  input.required = true;
  
  // Submit button
  const button = document.createElement('button');
  button.type = 'submit';
  button.classList.add('newsletter-button');
  button.textContent = 'Subscribe';
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    input.value = '';
  });
  
  form.append(input);
  form.append(button);
  
  wrapper.append(heading);
  wrapper.append(description);
  wrapper.append(form);
  
  block.textContent = '';
  block.append(wrapper);
}
