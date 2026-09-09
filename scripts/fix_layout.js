const fs = require('fs');

let layout = fs.readFileSync('src/app/layout.tsx', 'utf-8');

const cssLinks = fs.readFileSync('css_links.txt', 'utf-8').trim().split('\n').map(l => l.replace('>', '/>'));
const jsLinks = fs.readFileSync('script_links.txt', 'utf-8').trim().split('\n');

const headElements = [...cssLinks, ...jsLinks].map(l => '        ' + l).join('\n');

// Find the dangerouslySetInnerHTML part and replace it
const startIndex = layout.indexOf('<head dangerouslySetInnerHTML');
const endIndex = layout.indexOf('</head>', startIndex);

if (startIndex !== -1) {
  // Try to find the closing bracket if it's self-closing
  let closeIndex = layout.indexOf('/>', startIndex);
  if (closeIndex !== -1 && (endIndex === -1 || closeIndex < endIndex)) {
    // it's self closing
    layout = layout.substring(0, startIndex) + '<head>\n' + headElements + '\n      </head>' + layout.substring(closeIndex + 2);
  } else if (endIndex !== -1) {
    layout = layout.substring(0, startIndex) + '<head>\n' + headElements + '\n      </head>' + layout.substring(endIndex + 7);
  }
}

// Ensure proper jsx attributes for script tags
layout = layout.replace(/<script src="([^"]+)"><\/script>/g, '<script src="$1" async></script>');

fs.writeFileSync('src/app/layout.tsx', layout, 'utf-8');
console.log('Fixed layout.tsx');
