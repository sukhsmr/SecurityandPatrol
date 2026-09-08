const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '..', 'index.html');
const componentsDir = path.join(__dirname, 'src', 'components');
const sectionsDir = path.join(componentsDir, 'sections');
const layoutDir = path.join(componentsDir, 'layout');

[componentsDir, sectionsDir, layoutDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

// Utility to clean up HTML for JSX
function htmlToJsx(htmlStr) {
    let jsx = htmlStr
        .replace(/class="/g, 'className="')
        .replace(/for="/g, 'htmlFor="')
        .replace(/tabindex="/g, 'tabIndex="')
        .replace(/fetchpriority="/g, 'fetchPriority="')
        .replace(/novalidate/g, 'noValidate')
        .replace(/autocomplete="/g, 'autoComplete="')
        .replace(/readonly/g, 'readOnly')
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .replace(/<input([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<input${p1} />`) // self close input
        .replace(/<br([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<br${p1} />`) // self close br
        .replace(/<hr([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<hr${p1} />`) // self close hr
        .replace(/<meta(.*?)>/g, '') // remove meta tags to simplify
        .replace(/<link(.*?)>/g, '') // remove link tags to simplify
        
      // Replace generic relative paths for href and src to start with /
      // DO NOT strip https://www.adsguards.com/ because HTTrack didn't download lazy loaded assets
      jsx = jsx.replace(/href="(?!\/|http|#)([^"]*)"/g, 'href="/$1"')
               .replace(/src="(?!\/|http|#|data:)([^"]*)"/g, 'src="/$1"');

      // Convert class= to className= and handle other React attributes
      jsx = jsx.replace(/class="/g, 'className="')
               .replace(/for="/g, 'htmlFor="')
               .replace(/<br>/g, '<br />')
               .replace(/<hr>/g, '<hr />')
               .replace(/<img([^>]*)>/g, '<img$1 />');
      
      // Fix style strings to objects (basic fix, for robust use a library, but works for simple inline styles)
      jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
        const styleObj = styleString.split(';').filter(s => s.trim()).reduce((acc, style) => {
          const [key, value] = style.split(':');
          if (key && value) {
            const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            acc[camelKey] = value.trim();
          }
          return acc;
        }, {});
        return `style={${JSON.stringify(styleObj)}}`;
      });
      // Further fix any unclosed image tags inside `<img ... />` if any (cheerio might have already fixed it)

    jsx = jsx.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (m, p1, p2) => {
        return `<style${p1} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(p2)} }} />`;
    });
    jsx = jsx.replace(/<script([^>]*)>([\s\S]*?)<\/script>/g, (m, p1, p2) => {
        if (!p2.trim()) return `<script${p1} />`;
        return `<script${p1} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(p2)} }} />`;
    });

    return jsx;
}

function writeComponent(dir, name, content) {
    const jsxContent = htmlToJsx(content);
    const fileContent = `// @ts-nocheck
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

if ($('header').length > 0) {
    writeComponent(layoutDir, 'Header', $.html($('header')));
}

if ($('footer').length > 0) {
    writeComponent(layoutDir, 'Footer', $.html($('footer')));
}

// Extract Sections
const sections = [];
$('.elementor-section').each((i, el) => {
    if ($(el).parents('.elementor-section').length === 0 && $(el).closest('header').length === 0 && $(el).closest('footer').length === 0) {
        sections.push(el);
    }
});

let count = 0;
sections.forEach((el, i) => {
    const id = $(el).attr('id');
    const name = id ? id.charAt(0).toUpperCase() + id.slice(1).replace(/-./g, x=>x[1].toUpperCase()) : `Section${i + 1}`;
    
    let semanticName = `Section${i+1}`;
    const text = $(el).text().toLowerCase();
    if (i === 0) semanticName = `HeroSection`;
    else if (text.includes('our services') || text.includes('security services')) semanticName = `ServicesSection_${i+1}`;
    else if (text.includes('about us') || text.includes('who we are')) semanticName = `AboutSection_${i+1}`;
    else if (text.includes('testimonials') || text.includes('what our clients say')) semanticName = `TestimonialsSection_${i+1}`;
    else if (text.includes('contact us') || text.includes('get in touch') || $(el).find('form').length > 0) semanticName = `ContactSection_${i+1}`;
    else semanticName = name;
    
    writeComponent(sectionsDir, semanticName, $.html(el));
    count++;
});

console.log(`Extracted ${count} sections.`);
