const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '..', 'index.html');
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
        .replace(/http-equiv="/g, 'httpEquiv="')
        .replace(/charset="/g, 'charSet="')
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .replace(/<img([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<img${p1} />`) // self close img safely
        .replace(/<input([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<input${p1} />`) // self close input
        .replace(/<br([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<br${p1} />`) // self close br
        .replace(/<hr([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<hr${p1} />`) // self close hr
        .replace(/<link([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<link${p1} />`) // self close link
        .replace(/<meta([^>]*?)>/g, (m, p1) => p1.endsWith('/') ? m : `<meta${p1} />`) // self close meta
        .replace(/href="(?!\/|http|#)([^"]*)"/g, 'href="/$1"') // make relative hrefs absolute
        .replace(/src="(?!\/|http|#|data:)([^"]*)"/g, 'src="/$1"') // make relative srcs absolute
        .replace(/style="([^"]*)"/g, (match, styleStr) => {
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
        
    jsx = jsx.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (m, p1, p2) => {
        return `<style${p1} dangerouslySetInnerHTML={{ __html: \`${p2.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />`;
    });
    jsx = jsx.replace(/<script([^>]*)>([\s\S]*?)<\/script>/g, (m, p1, p2) => {
        if (!p2.trim()) return `<script${p1}></script>`;
        return `<script${p1} dangerouslySetInnerHTML={{ __html: \`${p2.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />`;
    });
    jsx = jsx.replace(/(src|href)="([^"]*wp-(content|includes)[^"]*)"/g, (match, attr, val) => {
        if (!val.startsWith('http') && !val.startsWith('/')) {
            return `${attr}="/${val}"`;
        }
        return match;
    });

    return jsx;
}

let headHtml = $('head').html();
// Make relative paths absolute directly on the raw HTML
headHtml = headHtml.replace(/href="(?!\/|http|#)([^"]*)"/g, 'href="/$1"');
headHtml = headHtml.replace(/src="(?!\/|http|#|data:)([^"]*)"/g, 'src="/$1"');
headHtml = headHtml.replace(/(?<!\/)wp-content\//g, '/wp-content/'); // Catch dynamic imports or url() in css
headHtml = headHtml.replace(/<script[^>]*detect\.min\.js[^>]*><\/script>/g, ''); // Remove detect.min.js to fix CORS error

// Minify to prevent whitespace issues
headHtml = headHtml.replace(/>\s+</g, '><').trim();

// Extract body scripts
let bodyScripts = '';
$('body script').each((i, el) => {
    bodyScripts += $.html(el) + '\n';
});
// Make relative paths absolute directly on the raw HTML
bodyScripts = bodyScripts.replace(/href="(?!\/|http|#)([^"]*)"/g, 'href="/$1"');
bodyScripts = bodyScripts.replace(/src="(?!\/|http|#|data:)([^"]*)"/g, 'src="/$1"');
bodyScripts = bodyScripts.replace(/(?<!\/)wp-content\//g, '/wp-content/'); // Catch dynamic imports
bodyScripts = bodyScripts.replace(/<script[^>]*detect\.min\.js[^>]*><\/script>/g, ''); // Remove detect.min.js to fix CORS error


const txt = fs.readFileSync('../index.html', 'utf8');
const bodyMatch = txt.match(/<body[^>]*class="([^"]*)"/);
const bodyClasses = bodyMatch ? bodyMatch[1] : '';

const layoutTsx = `// @ts-nocheck
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

export const metadata: Metadata = {
  title: "Licensed Security Guard Services in California - ADS Guards",
  description: "Licensed Security Guard Services in California - ADS Guards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning dangerouslySetInnerHTML={{ __html: ${JSON.stringify(headHtml)} }} />
      <body suppressHydrationWarning className="${bodyClasses}">
        <Header />
        <main id="inner-wrap" className="wrap kt-clear" role="main">
          <div id="primary" className="content-area">
            <div className="content-container site-container">
              <div id="main" className="site-main">
                <div className="content-wrap">
                  <article id="post-7" className="entry content-bg single-entry post-7 page type-page status-publish has-post-thumbnail hentry">
                    <div className="entry-content-wrap">
                      <div className="entry-content single-content">
                        <div data-elementor-type="wp-page" data-elementor-id="7" className="elementor elementor-7" data-elementor-post-type="page">
                          {children}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: ${JSON.stringify(bodyScripts)} }} />
      </body>
    </html>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'app', 'layout.tsx'), layoutTsx);
console.log('Updated layout.tsx');
