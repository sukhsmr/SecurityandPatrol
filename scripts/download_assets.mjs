import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import https from 'https';
import http from 'http';

const BASE_URL = 'https://www.adsguards.com';
const INPUT_HTML = 'adsguards_index.html';
const OUTPUT_HTML = 'adsguards_index_local.html';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const CSS_DIR = path.join(PUBLIC_DIR, 'css');
const JS_DIR = path.join(PUBLIC_DIR, 'js');
const IMG_DIR = path.join(PUBLIC_DIR, 'images', 'downloaded');

[CSS_DIR, JS_DIR, IMG_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`Already exists: ${dest}`);
      return resolve();
    }
    const req = (url.startsWith('https') ? https : http).get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status Code: ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function getFileName(url) {
  try {
    const parsed = new URL(url, BASE_URL);
    let pathname = parsed.pathname;
    let filename = path.basename(pathname);
    if (!filename) filename = 'index';
    if (parsed.search) {
        filename = filename + '_' + Buffer.from(parsed.search).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
    }
    return filename;
  } catch (e) {
    return path.basename(url) || 'unknown';
  }
}

async function run() {
  const html = fs.readFileSync(INPUT_HTML, 'utf-8');
  const $ = cheerio.load(html);
  
  const downloads = [];

  // CSS
  $('link[rel="stylesheet"]').each((i, el) => {
    let href = $(el).attr('href');
    if (href) {
      if (href.startsWith('//')) href = 'https:' + href;
      else if (href.startsWith('/')) href = BASE_URL + href;
      else if (!href.startsWith('http')) href = BASE_URL + '/' + href;

      let filename = 'css_' + i + '_' + getFileName(href);
      if (!filename.endsWith('.css')) filename += '.css';
      const dest = path.join(CSS_DIR, filename);
      
      downloads.push(download(href, dest).catch(e => console.error(e.message)));
      $(el).attr('href', `/css/${filename}`);
    }
  });

  // JS
  $('script[src]').each((i, el) => {
    let src = $(el).attr('src');
    if (src) {
      if (src.startsWith('//')) src = 'https:' + src;
      else if (src.startsWith('/')) src = BASE_URL + src;
      else if (!src.startsWith('http')) src = BASE_URL + '/' + src;

      let filename = 'js_' + i + '_' + getFileName(src);
      if (!filename.endsWith('.js')) filename += '.js';
      const dest = path.join(JS_DIR, filename);
      
      downloads.push(download(src, dest).catch(e => console.error(e.message)));
      $(el).attr('src', `/js/${filename}`);
    }
  });

  // Images
  $('img').each((i, el) => {
    let src = $(el).attr('src');
    if (src && !src.startsWith('data:')) {
      if (src.startsWith('//')) src = 'https:' + src;
      else if (src.startsWith('/')) src = BASE_URL + src;
      else if (!src.startsWith('http')) src = BASE_URL + '/' + src;

      const filename = 'img_' + i + '_' + getFileName(src);
      const dest = path.join(IMG_DIR, filename);
      
      downloads.push(download(src, dest).catch(e => console.error(e.message)));
      $(el).attr('src', `/images/downloaded/${filename}`);
    }
  });

  await Promise.all(downloads);
  
  fs.writeFileSync(OUTPUT_HTML, $.html());
  console.log('Done downloading assets and rewriting HTML');
}

run().catch(console.error);
