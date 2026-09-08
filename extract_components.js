const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '..', '..', 'index.html');
const componentsDir = path.join(__dirname, '..', 'src', 'components');
const sectionsDir = path.join(componentsDir, 'sections');
const layoutDir = path.join(componentsDir, 'layout');

[componentsDir, sectionsDir, layoutDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

// Utility to clean up HTML for JSX
function htmlToJsx(htmlStr) {
    // Basic replacements
    let jsx = htmlStr
        .replace(/class="/g, 'className="')
        .replace(/for="/g, 'htmlFor="')
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .replace(/<img(.*?)>/g, '<img$1 />') // self close img
        .replace(/<input(.*?)>/g, '<input$1 />') // self close input
        .replace(/<br(.*?)>/g, '<br$1 />') // self close br
        .replace(/<hr(.*?)>/g, '<hr$1 />') // self close hr
        .replace(/<meta(.*?)>/g, '<meta$1 />')
        .replace(/<link(.*?)>/g, '<link$1 />')
        .replace(/srcset="(.*?)"/g, '') // remove srcset to simplify for now
        .replace(/style="([^"]*)"/g, (match, styleStr) => {
            // Very naive style to JSX object converter
            const rules = styleStr.split(';').filter(r => r.trim());
            const obj = rules.reduce((acc, rule) => {
                const parts = rule.split(':');
                if (parts.length >= 2) {
                    let prop = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                    let val = parts.slice(1).join(':').trim().replace(/'/g, "\\'");
                    acc.push(`${prop}: '${val}'`);
                }
                return acc;
            }, []);
            return `style={{ ${obj.join(', ')} }}`;
        });
        
    // Fix asset URLs
    jsx = jsx.replace(/(src|href)="[^"]*wp-content\/uploads\/\d{4}\/\d{2}\/([^"]+)"/g, '$1="/images/$2"');
    jsx = jsx.replace(/(src|href)="[^"]*wp-content\/plugins\/[^"]+\/([^"]+\.(png|jpg|jpeg|svg|gif|woff|woff2|ttf))"/g, '$1="/images/$2"');

    // Also fix inline style background images
    jsx = jsx.replace(/url\([^)]*wp-content\/uploads\/\d{4}\/\d{2}\/([^)]+)\)/g, 'url(/images/$1)');

    return jsx;
}

function writeComponent(dir, name, content) {
    const jsxContent = htmlToJsx(content);
    const fileContent = `
import React from 'react';

const ${name} = () => {
  return (
    <>
      ${jsxContent}
    </>
  );
};

export default ${name};
`;
    fs.writeFileSync(path.join(dir, `${name}.tsx`), fileContent);
    console.log(`Generated ${name} component.`);
}

// 1. Header
if ($('header').length > 0) {
    writeComponent(layoutDir, 'Header', $.html($('header')));
}

// 2. Footer
if ($('footer').length > 0) {
    writeComponent(layoutDir, 'Footer', $.html($('footer')));
}

// 3. Main Sections
const sections = [];
$('.elementor-section').each((i, el) => {
    if ($(el).parents('.elementor-section').length === 0) {
        sections.push(el);
    }
});

console.log('sections length: ', sections.length);
let count = 0;
sections.forEach((el, i) => {
    // We will name them Section1, Section2, etc. based on index since names are hard to guess
    const id = $(el).attr('id');
    const name = id ? id.charAt(0).toUpperCase() + id.slice(1).replace(/-./g, x=>x[1].toUpperCase()) : `Section${i + 1}`;
    
    // Guessing semantic name
    let semanticName = `Section${i+1}`;
    const text = $(el).text().toLowerCase();
    if (i === 0) semanticName = 'HeroSection';
    else if (text.includes('our services') || text.includes('security services')) semanticName = 'ServicesSection';
    else if (text.includes('about us') || text.includes('who we are')) semanticName = 'AboutSection';
    else if (text.includes('testimonials') || text.includes('what our clients say')) semanticName = 'TestimonialsSection';
    else if (text.includes('contact us') || text.includes('get in touch') || $(el).find('form').length > 0) semanticName = 'ContactSection';
    else semanticName = name;
    
    writeComponent(sectionsDir, semanticName, $.html(el));
    count++;
});

console.log(`Extracted ${count} sections.`);
