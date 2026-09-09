import fs from 'fs';
let lines = fs.readFileSync('src/app/layout.tsx', 'utf-8').split('\n');
const css = fs.readFileSync('css_links.txt', 'utf-8');
const js = fs.readFileSync('script_links.txt', 'utf-8');

let headHtml = '<meta charSet="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />\n' + css + '\n' + js;

// Assuming line index 20 has the head tag. Let's find the line that starts with "      <head"
const headIndex = lines.findIndex(line => line.includes('<head suppressHydrationWarning'));

if (headIndex !== -1) {
    lines[headIndex] = '      <head dangerouslySetInnerHTML={{ __html: `' + headHtml + '` }} />';
    fs.writeFileSync('src/app/layout.tsx', lines.join('\n'));
    console.log('Layout updated.');
} else {
    console.error('Head tag not found.');
}
