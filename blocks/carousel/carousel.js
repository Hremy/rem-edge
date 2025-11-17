export default function decorate(block) {
  // Carousel component: image/content slider with navigation
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');
  
  const container = document.createElement('div');
  container.classList.add('carousel-container');
  
  const slides = document.createElement('div');
  slides.classList.add('carousel-slides');
  
  let slideIndex = 0;
  const slideElements = [];
  
  // Create slides from rows
  rows.forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    if (idx === 0) slide.classList.add('active');
    
    cells.forEach((cell) => {
      const img = cell.querySelector('img');
      const heading = cell.querySelector('h2, h3, h4');
      const paragraphs = cell.querySelectorAll('p');
      
      if (img) {
        const imgClone = img.cloneNode(true);
        imgClone.classList.add('carousel-image');
        slide.append(imgClone);
      }
      
      if (heading || paragraphs.length > 0) {
        const content = document.createElement('div');
        content.classList.add('carousel-content');
        
        if (heading) {
          const h = document.createElement('h3');
          h.classList.add('carousel-title');
          h.textContent = heading.textContent;
          content.append(h);
        }
        
        paragraphs.forEach((p) => {
          const para = document.createElement('p');
          para.classList.add('carousel-text');
          para.textContent = p.textContent;
          content.append(para);
        });
        
        slide.append(content);
      }
    });
    
    slides.append(slide);
    slideElements.push(slide);
  });
  
  container.append(slides);
  
  // Previous button
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-btn', 'carousel-prev');
  prevBtn.innerHTML = '&#10094;';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  
  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-btn', 'carousel-next');
  nextBtn.innerHTML = '&#10095;';
  nextBtn.setAttribute('aria-label', 'Next slide');
  
  // Dots navigation
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('carousel-dots');
  
  const dotElements = [];
  slideElements.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (idx === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    dotsContainer.append(dot);
    dotElements.push(dot);
  });
  
  // Show slide function
  function showSlide(n) {
    if (slideElements.length === 0) return;
    
    if (n >= slideElements.length) slideIndex = 0;
    if (n < 0) slideIndex = slideElements.length - 1;
    
    slideElements.forEach((slide) => slide.classList.remove('active'));
    dotElements.forEach((dot) => dot.classList.remove('active'));
    
    slideElements[slideIndex].classList.add('active');
    dotElements[slideIndex].classList.add('active');
  }
  
  // Navigation handlers
  prevBtn.addEventListener('click', () => {
    slideIndex--;
    showSlide(slideIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    slideIndex++;
    showSlide(slideIndex);
  });
  
  // Dot click handlers
  dotElements.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      slideIndex = idx;
      showSlide(slideIndex);
    });
  });
  
  // Auto-advance carousel every 5 seconds
  setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 5000);
  
  wrapper.append(prevBtn);
  wrapper.append(container);
  wrapper.append(nextBtn);
  wrapper.append(dotsContainer);
  
  block.textContent = '';
  block.append(wrapper);
}
