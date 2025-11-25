export default function decorate(block) {
  // Parse footer data from the block
  const rows = block.querySelectorAll('tr');
  
  // Build footer structure
  const footer = document.createElement('div');
  footer.className = 'footer-container';
  
  // Create main footer content
  const mainContent = document.createElement('div');
  mainContent.className = 'footer-main';
  
  // Column 1: Logo and description
  const col1 = document.createElement('div');
  col1.className = 'footer-col footer-col-1';
  col1.innerHTML = `
    <div class="footer-logo mb-4">
      <a href="https://www.acerbisoem.com/" class="inline-block max-w-full">
        <img src="https://www.acerbisoem.com/wp-content/uploads/2024/04/logo-acerbis-white.svg" alt="Acerbis Logo" class="w-full">
      </a>
    </div>
    <div class="footer-description">
      <p>Dalla progettazione all'industrializzazione del prodotto, dal co-design alla ricerca di nuovi materiali e alla prototipazione.</p>
    </div>
  `;
  
  // Column 2: Sectors
  const col2 = document.createElement('div');
  col2.className = 'footer-col footer-col-2';
  col2.innerHTML = `
    <h6 class="footer-title">Settori</h6>
    <ul class="footer-links">
      <li><a href="https://www.acerbisoem.com/settori/motorcycle/">Motorcycle</a></li>
      <li><a href="https://www.acerbisoem.com/settori/agricoltura/">Agricoltura</a></li>
      <li><a href="https://www.acerbisoem.com/settori/movimento-terra/">Movimento terra</a></li>
      <li><a href="https://www.acerbisoem.com/settori/material-handling/">Material handling</a></li>
      <li><a href="https://www.acerbisoem.com/settori/altri-settori/">Altri settori</a></li>
    </ul>
  `;
  
  // Column 3: Technologies
  const col3 = document.createElement('div');
  col3.className = 'footer-col footer-col-3';
  col3.innerHTML = `
    <h6 class="footer-title">Tecnologie</h6>
    <ul class="footer-links">
      <li><a href="https://www.acerbisoem.com/tecnologie/roto-molding/">Stampaggio rotazionale</a></li>
      <li><a href="https://www.acerbisoem.com/tecnologie/injection-molding/">Stampaggio a iniezione</a></li>
    </ul>
  `;
  
  // Column 4: Engineering
  const col4 = document.createElement('div');
  col4.className = 'footer-col footer-col-4';
  col4.innerHTML = `
    <h6 class="footer-title">Engineering</h6>
    <ul class="footer-links">
      <li><a href="https://www.acerbisoem.com/engineering/projecy-management/">Project Management</a></li>
      <li><a href="https://www.acerbisoem.com/engineering/engineering-capability/">Engineering Capability</a></li>
    </ul>
  `;
  
  mainContent.appendChild(col1);
  mainContent.appendChild(col2);
  mainContent.appendChild(col3);
  mainContent.appendChild(col4);
  
  // Create footer bottom
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';
  footerBottom.innerHTML = `
    <div class="footer-left">
      <p>© 2024 <strong>ACERBIS ITALIA SPA</strong><br>
      Società soggetta all'attività di direzione e coordinamento di Yellow Holding S.r.l.<br>
      P.IVA 00862020161 | 
      <a href="https://www.acerbis.com/it/privacy-policy" target="_blank" rel="noopener">Privacy</a> &amp; 
      <a href="https://www.acerbis.com/it/cookie-policy" target="_blank" rel="noopener">Cookie Policy</a> | 
      <a href="https://www.d-com.it/" target="_blank" rel="noopener">Web agency</a></p>
    </div>
    <div class="footer-right">
      <a class="footer-button" href="https://www.acerbis.com/it/contatti" target="_blank">Contatti</a>
      <a class="footer-button" href="https://www.acerbis.com/it" target="_blank">Mondo Acerbis</a>
    </div>
  `;
  
  // Clear block and append new content
  block.innerHTML = '';
  footer.appendChild(mainContent);
  footer.appendChild(footerBottom);
  block.appendChild(footer);
}
