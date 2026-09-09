const fs = require('fs');

let headerCode = fs.readFileSync('src/components/layout/Header.tsx', 'utf-8');

// Add useEffect import
if (!headerCode.includes('useEffect')) {
    headerCode = headerCode.replace(/import React, { useState } from 'react';/, "import React, { useState, useEffect } from 'react';");
}

// Check if useEffect for mobile menu is already there
if (!headerCode.includes('// Mobile menu logic')) {
    const effectCode = `
  useEffect(() => {
    const handleHamburgerClick = (e) => {
      setMainMenuOpen(true);
    };
    
    const handleCloseClick = (e) => {
      setMainMenuOpen(false);
    };

    const handleSubmenuClick = (e) => {
      e.preventDefault();
      const parentLi = e.target.closest('li');
      if (parentLi) {
        const submenu = parentLi.querySelector('.elementskit-megamenu-panel');
        if (submenu) {
          submenu.classList.toggle('elementskit-dropdown-open');
        }
      }
    };

    const hamburgerBtns = document.querySelectorAll('.elementskit-menu-hamburger');
    const closeBtns = document.querySelectorAll('.elementskit-menu-close, .elementskit-menu-overlay');
    const submenuIndicators = document.querySelectorAll('.elementskit-submenu-indicator');

    hamburgerBtns.forEach(btn => btn.addEventListener('click', handleHamburgerClick));
    closeBtns.forEach(btn => btn.addEventListener('click', handleCloseClick));
    submenuIndicators.forEach(btn => btn.addEventListener('click', handleSubmenuClick));

    return () => {
      hamburgerBtns.forEach(btn => btn.removeEventListener('click', handleHamburgerClick));
      closeBtns.forEach(btn => btn.removeEventListener('click', handleCloseClick));
      submenuIndicators.forEach(btn => btn.removeEventListener('click', handleSubmenuClick));
    };
  }, []);
`;

    headerCode = headerCode.replace(/const \[mobileDropdown, setMobileDropdown\] = useState\(false\);/, `const [mobileDropdown, setMobileDropdown] = useState(false);\n  // Mobile menu logic${effectCode}`);
}

// Add elementskit-menu-overlay
if (!headerCode.includes('elementskit-menu-overlay')) {
    headerCode = headerCode.replace(
        /<div id="ekit-megamenu-primary-menu" className=\{\`elementskit-menu-container/, 
        `<div className={\`elementskit-menu-overlay elementskit-menu-offcanvas-elements ekit-nav-menu--overlay \${mainMenuOpen ? "active" : ""}\`}></div><div id="ekit-megamenu-primary-menu" className={\`elementskit-menu-container`
    );
}

// Add elementskit-menu-close button inside the offcanvas container if missing
if (!headerCode.includes('elementskit-menu-close')) {
    headerCode = headerCode.replace(
        /<ul id="menu-primary-menu"/,
        `<button className="elementskit-menu-close elementskit-menu-toggler" type="button"><i aria-hidden="true" className="ekit-menu-icon icon icon-cross"></i></button><ul id="menu-primary-menu"`
    );
}

fs.writeFileSync('src/components/layout/Header.tsx', headerCode, 'utf-8');
console.log('Fixed Header.tsx');
