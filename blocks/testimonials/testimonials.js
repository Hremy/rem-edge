export default function decorate(block) {
  // Testimonials block: grid of quotes with author
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('testimonials-wrapper');
  
  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 2) {
      const testimonial = document.createElement('div');
      testimonial.classList.add('testimonial-item');
      
      // Quote (first cell)
      const quoteCell = cells[0];
      const quote = document.createElement('p');
      quote.classList.add('testimonial-quote');
      quote.textContent = quoteCell.textContent.trim();
      testimonial.append(quote);
      
      // Author (second cell)
      const authorCell = cells[1];
      const author = document.createElement('p');
      author.classList.add('testimonial-author');
      author.textContent = '— ' + authorCell.textContent.trim();
      testimonial.append(author);
      
      wrapper.append(testimonial);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
