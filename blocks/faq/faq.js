export default function decorate(block) {
  // FAQ block: accordion-style Q&A
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('faq-wrapper');
  
  rows.forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    if (cells.length >= 2) {
      const faqItem = document.createElement('div');
      faqItem.classList.add('faq-item');
      
      // Question (header)
      const questionBtn = document.createElement('button');
      questionBtn.classList.add('faq-question');
      questionBtn.textContent = cells[0].textContent.trim();
      questionBtn.setAttribute('aria-expanded', 'false');
      
      // Answer (content)
      const answerDiv = document.createElement('div');
      answerDiv.classList.add('faq-answer');
      answerDiv.innerHTML = cells[1].innerHTML;
      answerDiv.style.display = 'none';
      
      // Toggle on click
      questionBtn.addEventListener('click', () => {
        const isOpen = answerDiv.style.display === 'block';
        answerDiv.style.display = isOpen ? 'none' : 'block';
        questionBtn.setAttribute('aria-expanded', !isOpen);
        faqItem.classList.toggle('open');
      });
      
      faqItem.append(questionBtn);
      faqItem.append(answerDiv);
      wrapper.append(faqItem);
    }
  });
  
  block.textContent = '';
  block.append(wrapper);
}
