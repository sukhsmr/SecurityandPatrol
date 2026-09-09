import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const BASE_URL = 'https://www.adsguards.com';
const COMPONENTS_DIR = path.join(process.cwd(), 'src', 'components');
const IMG_DIR = path.join(process.cwd(), 'public', 'images', 'local');

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) return resolve();
    const req = (url.startsWith('https') ? https : http).get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`Status: ${res.statusCode} for ${url}`));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

const urlRegex = /(?:https?:\/\/www\.adsguards\.com)?\/wp-content\/uploads\/[a-zA-Z0-9\/\-_.]+/g;

async function run() {
  const files = getAllFiles(COMPONENTS_DIR);
  let downloadPromises = [];
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let matches = content.match(urlRegex);
    
    if (matches) {
      let uniqueUrls = [...new Set(matches)];
      for (let url of uniqueUrls) {
        let fullUrl = url.startsWith('http') ? url : BASE_URL + url;
        let filename = path.basename(url);
        let dest = path.join(IMG_DIR, filename);
        let newUrl = `/images/local/${filename}`;
        
        console.log(`Downloading ${fullUrl} to ${newUrl}`);
        downloadPromises.push(download(fullUrl, dest).catch(e => console.error(e.message)));
        
        // Replace all occurrences in content
        content = content.split(url).join(newUrl);
      }
      fs.writeFileSync(file, content, 'utf-8');
    }
  }
  
  await Promise.all(downloadPromises);
  console.log('Done localizing TSX images.');
}

run();
