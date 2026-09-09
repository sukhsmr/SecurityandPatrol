import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = path.join(process.cwd(), 'src', 'components');

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

const files = getAllFiles(COMPONENTS_DIR);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // 1. data-src="..." to src="..."
  // but wait, if it already has a dummy src, we should replace that src.
  // The structure is usually: src="dummy.gif" data-src="/images/local/..."
  // It's easier to just strip data-src and use it as src.
  
  // Replace data-src="url" with src="url"
  content = content.replace(/data-src="([^"]+)"/g, 'src="$1"');
  
  // Replace data-srcset="url" with srcSet="url"
  content = content.replace(/data-srcset="([^"]+)"/g, 'srcSet="$1"');

  // Replace data-sizes="url" with sizes="url"
  content = content.replace(/data-sizes="([^"]+)"/g, 'sizes="$1"');
  
  // Remove dummy src like src="data:image..." if it exists and we already have a real src from data-src
  // Actually, wait, replacing data-src with src might result in two src attributes: src="dummy" src="real". 
  // Let's use a regex to fix img tags directly.
  
  content = content.replace(/<img([^>]*)>/g, (match, p1) => {
    let newAttrs = p1;
    let realSrc = '';
    let realSrcSet = '';
    
    const dataSrcMatch = p1.match(/data-src="([^"]+)"/);
    if (dataSrcMatch) realSrc = dataSrcMatch[1];
    
    const dataSrcsetMatch = p1.match(/data-srcset="([^"]+)"/);
    if (dataSrcsetMatch) realSrcSet = dataSrcsetMatch[1];
    
    // Remove lazy load attributes
    newAttrs = newAttrs.replace(/data-src="[^"]*"/, '')
                       .replace(/data-srcset="[^"]*"/, '')
                       .replace(/data-lazyloaded="[^"]*"/, '')
                       .replace(/data-placeholder-resp="[^"]*"/, '')
                       .replace(/data-ll-status="[^"]*"/, '')
                       .replace(/data-sizes="([^"]+)"/, 'sizes="$1"');
    
    // Replace dummy src with real src
    if (realSrc) {
      if (newAttrs.includes('src=')) {
        newAttrs = newAttrs.replace(/src="[^"]*"/, `src="${realSrc}"`);
      } else {
        newAttrs += ` src="${realSrc}"`;
      }
    }
    
    if (realSrcSet) {
      if (newAttrs.includes('srcSet=')) {
        newAttrs = newAttrs.replace(/srcSet="[^"]*"/, `srcSet="${realSrcSet}"`);
      } else if (newAttrs.includes('srcset=')) {
        newAttrs = newAttrs.replace(/srcset="[^"]*"/, `srcSet="${realSrcSet}"`);
      } else {
        newAttrs += ` srcSet="${realSrcSet}"`;
      }
    }
    
    return `<img${newAttrs}>`;
  });

  // some files might have srcset instead of srcSet
  content = content.replace(/srcset=/g, 'srcSet=');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Fixed images in ${file}`);
  }
}

console.log('Image fix complete.');
