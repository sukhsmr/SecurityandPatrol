const fs = require('fs');
const path = require('path');

function createComponent(fileName, componentName, jsxFiles) {
  const dir = path.dirname(fileName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let content = `export default function ${componentName}() {\n  return (\n    <>\n`;
  for (let file of jsxFiles) {
    const jsx = fs.readFileSync(file, 'utf8');
    content += jsx.trim().split('\n').map(l => '      ' + l).join('\n') + '\n';
  }
  content += `    </>\n  );\n}\n`;

  fs.writeFileSync(fileName, content);
  console.log('Created ' + fileName);
}

createComponent('src/components/contact/ContactHero.tsx', 'ContactHero', ['Hero.jsx']);
createComponent('src/components/contact/ContactMap.tsx', 'ContactMap', ['MapTitle.jsx', 'Map.jsx']);
createComponent('src/components/contact/ContactForm.tsx', 'ContactForm', ['Form.jsx']);
