export default function decorate(block) {
  // Contact Form component
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('contact-form-wrapper');
  
  // Form title
  const title = document.createElement('h2');
  title.classList.add('contact-form-title');
  title.textContent = 'Get In Touch';
  
  // Form description
  const description = document.createElement('p');
  description.classList.add('contact-form-description');
  description.textContent = 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.';
  
  // Form element
  const form = document.createElement('form');
  form.classList.add('contact-form');
  form.method = 'POST';
  
  // Name field
  const nameGroup = document.createElement('div');
  nameGroup.classList.add('form-group');
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name';
  nameLabel.setAttribute('for', 'contact-name');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'contact-name';
  nameInput.name = 'name';
  nameInput.required = true;
  nameInput.placeholder = 'Your name';
  nameGroup.append(nameLabel, nameInput);
  
  // Email field
  const emailGroup = document.createElement('div');
  emailGroup.classList.add('form-group');
  const emailLabel = document.createElement('label');
  emailLabel.textContent = 'Email';
  emailLabel.setAttribute('for', 'contact-email');
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'contact-email';
  emailInput.name = 'email';
  emailInput.required = true;
  emailInput.placeholder = 'your@email.com';
  emailGroup.append(emailLabel, emailInput);
  
  // Phone field
  const phoneGroup = document.createElement('div');
  phoneGroup.classList.add('form-group');
  const phoneLabel = document.createElement('label');
  phoneLabel.textContent = 'Phone';
  phoneLabel.setAttribute('for', 'contact-phone');
  const phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.id = 'contact-phone';
  phoneInput.name = 'phone';
  phoneInput.placeholder = '+1 (555) 000-0000';
  phoneGroup.append(phoneLabel, phoneInput);
  
  // Subject field
  const subjectGroup = document.createElement('div');
  subjectGroup.classList.add('form-group');
  const subjectLabel = document.createElement('label');
  subjectLabel.textContent = 'Subject';
  subjectLabel.setAttribute('for', 'contact-subject');
  const subjectInput = document.createElement('input');
  subjectInput.type = 'text';
  subjectInput.id = 'contact-subject';
  subjectInput.name = 'subject';
  subjectInput.required = true;
  subjectInput.placeholder = 'How can we help?';
  subjectGroup.append(subjectLabel, subjectInput);
  
  // Message field
  const messageGroup = document.createElement('div');
  messageGroup.classList.add('form-group', 'form-group-full');
  const messageLabel = document.createElement('label');
  messageLabel.textContent = 'Message';
  messageLabel.setAttribute('for', 'contact-message');
  const messageInput = document.createElement('textarea');
  messageInput.id = 'contact-message';
  messageInput.name = 'message';
  messageInput.required = true;
  messageInput.placeholder = 'Your message here...';
  messageInput.rows = 5;
  messageGroup.append(messageLabel, messageInput);
  
  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.classList.add('contact-form-submit');
  submitBtn.textContent = 'Send Message';
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Log form data (in production, send to backend)
    console.log('Form submitted:', data);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.classList.add('contact-form-success');
    successMsg.textContent = '✓ Thank you! We\'ll get back to you soon.';
    form.parentElement.insertBefore(successMsg, form);
    
    // Reset form
    form.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  });
  
  form.append(nameGroup, emailGroup, phoneGroup, subjectGroup, messageGroup, submitBtn);
  
  wrapper.append(title, description, form);
  
  block.textContent = '';
  block.append(wrapper);
}
