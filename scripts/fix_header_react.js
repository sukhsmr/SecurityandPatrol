const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf-8');

// Replace useEffect
content = content.replace(/\/\/ Mobile menu logic[\s\S]*?\}, \[\]\);/m, 
`const [servicesOpen, setServicesOpen] = useState(false);
  const [officesOpen, setOfficesOpen] = useState(false);`);

// Add onClick to arrows
content = content.replace(/<i aria-hidden="true" className="icon icon-down-arrow1 elementskit-submenu-indicator"><\/i>/g, 
  `<i aria-hidden="true" className="icon icon-down-arrow1 elementskit-submenu-indicator" onClick={(e) => { e.preventDefault(); const li = e.target.closest('li'); if(li.id === 'menu-item-31') setServicesOpen(!servicesOpen); else setOfficesOpen(!officesOpen); }}></i>`);

// Handle panel class based on ID
content = content.replace(/<li id="menu-item-31"([\s\S]*?)<div className="elementskit-megamenu-panel">/g, 
  `<li id="menu-item-31"$1<div className={\`elementskit-megamenu-panel \${servicesOpen ? 'elementskit-dropdown-open' : ''}\`}>`);

content = content.replace(/<li id="menu-item-968"([\s\S]*?)<div className="elementskit-megamenu-panel">/g, 
  `<li id="menu-item-968"$1<div className={\`elementskit-megamenu-panel \${officesOpen ? 'elementskit-dropdown-open' : ''}\`}>`);

fs.writeFileSync('src/components/layout/Header.tsx', content, 'utf-8');
console.log('Fixed Header.tsx React state');
