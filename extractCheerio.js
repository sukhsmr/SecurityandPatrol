const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('contact-us-main.html', 'utf8');
const $ = cheerio.load(content);

// We need the 4 top level elementor sections inside data-elementor-id="9"
const sections = $('div[data-elementor-id="9"] > section.elementor-top-section');

const htmlToJsx = (html) => {
  let jsx = html;
  
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  
  // Close unclosed tags (img, input, br, hr)
  jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');
  
  // Replace inline styles
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styles) => {
    let jsStyles = styles.split(';').filter(s => s.trim() !== '').reduce((acc, style) => {
      let [key, value] = style.split(':').map(s => s.trim());
      if (key && value) {
        let camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc.push(`"${camelKey}": "${value}"`);
      }
      return acc;
    }, []).join(', ');
    return `style={{ ${jsStyles} }}`;
  });

  // remove <textarea ...></textarea> issues where text might be unclosed
  return jsx;
};

const createComponent = (fileName, componentName, htmlContent) => {
  const jsx = htmlToJsx(htmlContent);
  const content = `export default function ${componentName}() {\n  return (\n    <>\n      ${jsx}\n    </>\n  );\n}\n`;
  fs.writeFileSync(fileName, content);
}

// 0: Hero
// 1: Map Title
// 2: Map
// 3: Form

if (sections.length >= 4) {
  createComponent('src/components/contact/ContactHero.tsx', 'ContactHero', $(sections[0]).prop('outerHTML'));
  createComponent('src/components/contact/ContactMap.tsx', 'ContactMap', $(sections[1]).prop('outerHTML') + '\n' + $(sections[2]).prop('outerHTML'));
  createComponent('src/components/contact/ContactForm.tsx', 'ContactForm', $(sections[3]).prop('outerHTML'));
  
  // The 5th section is the services banner if it exists
  if (sections.length >= 5) {
      createComponent('src/components/contact/ContactServicesBanner.tsx', 'ContactServicesBanner', $(sections[4]).prop('outerHTML'));
  }
} else {
  console.log('Did not find enough sections:', sections.length);
}
