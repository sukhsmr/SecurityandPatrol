const fs = require('fs');

function htmlToJsx(html) {
  let jsx = html;
  
  // class to className
  jsx = jsx.replace(/class=/g, 'className=');
  // for to htmlFor
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

  return jsx;
}

['Hero', 'MapTitle', 'Map', 'Form'].forEach(name => {
  let html = fs.readFileSync(name + '.html', 'utf8');
  fs.writeFileSync(name + '.jsx', htmlToJsx(html));
});
