const fs = require('fs');
let html = fs.readFileSync('src/components/layout/header_raw.html', 'utf8');

html = html
  .replace(/class=/g, 'className=')
  .replace(/for=/g, 'htmlFor=')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
  .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
  .replace(/<hr([^>]*[^\/])>/g, '<hr$1 />')
  .replace(/<br([^>]*[^\/])>/g, '<br$1 />');

html = html.replace(/style="([^"]*)"/g, (match, p1) => {
  const styleObj = {};
  p1.split(';').forEach(rule => {
    if (!rule.trim()) return;
    const parts = rule.split(':');
    if (parts.length < 2) return;
    let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
    styleObj[key] = parts[1].trim();
  });
  return 'style={' + JSON.stringify(styleObj) + '}';
});

fs.writeFileSync('src/components/layout/header_jsx.txt', html);
