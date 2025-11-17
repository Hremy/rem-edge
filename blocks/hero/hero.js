import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Hero block for Acerbis OEM with parallax effect
  // Structure: First row = image, subsequent rows = content
  
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  
  if (rows.length === 0) return;
  
  // Process first row as background image
  const firstRow = rows[0];
  const firstRowCells = Array.from(firstRow.querySelectorAll(':scope > div'));
  
  if (firstRowCells.length > 0) {
    const imgCell = firstRowCells[0];
    const img = imgCell.querySelector('img');
    
    if (img) {
      // Create optimized picture element
      const picture = createOptimizedPicture(img.src, img.alt, false, [
        { width: '1920' },
        { width: '1200' },
        { width: '768' },
      ]);
      picture.classList.add('hero-bg');
      
      // Create parallax container
      const parallaxContainer = document.createElement('div');
      parallaxContainer.classList.add('hero-parallax-container');
      parallaxContainer.append(picture);
      block.prepend(parallaxContainer);
      
      // Add parallax scroll effect
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroTop = block.offsetTop;
        const scrollPercent = (scrollY - heroTop) / window.innerHeight;
        if (scrollPercent < 1) {
          picture.style.transform = `translateY(${scrollPercent * 50}px)`;
        }
      });
      
      imgCell.remove();
    }
  }
  
  // Process content rows
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero-content-wrapper');
  
  rows.slice(1).forEach((row) => {
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    
    cells.forEach((cell) => {
      const heading = cell.querySelector('h1, h2, h3');
      const paragraphs = cell.querySelectorAll('p');
      const links = cell.querySelectorAll('a');
      
      if (heading) {
        heading.classList.add('hero-title');
      }
      
      paragraphs.forEach((p) => {
        p.classList.add('hero-text');
      });
      
      links.forEach((link) => {
        // Check if it's a video link
        if (link.href.includes('youtube') || link.href.includes('vimeo')) {
          link.classList.add('hero-video-link');
        } else {
          link.classList.add('hero-cta');
        }
      });
      
      cell.classList.add('hero-content');
      contentWrapper.append(cell);
    });
  });
  
  block.append(contentWrapper);
  
  // Handle video embeds
  const videoLinks = block.querySelectorAll('.hero-video-link');
  videoLinks.forEach((link) => {
    const url = link.href;
    let embedUrl = '';
    
    if (url.includes('youtube')) {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      if (videoId) {
        embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
      }
    } else if (url.includes('vimeo')) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      if (videoId) {
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
      }
    }
    
    if (embedUrl) {
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.classList.add('hero-video');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      link.replaceWith(iframe);
    }
  });
}
