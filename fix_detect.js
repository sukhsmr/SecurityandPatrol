const fs = require('fs');

let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Count before
const before = (layout.match(/optimization-detective/g) || []).length;

// Remove all script tags related to optimization-detective / detect.min.js
// These are dynamic import() calls injected by WordPress optimization-detective plugin
layout = layout.replace(/<script[^>]*optimization-detective[^>]*>[\s\S]*?<\/script>/gi, '');
layout = layout.replace(/<script[^>]*detect\.min\.js[^>]*>[\s\S]*?<\/script>/gi, '');

// Also remove any inline script that references optimization-detective (self-closing or not)
layout = layout.replace(/<link[^>]*optimization-detective[^>]*\/?>/gi, '');

// Also strip out any dynamic import() references to detect.min.js from inline scripts
// The problematic pattern is: import("https://www.adsguards.com/...detect.min.js...")
// These are embedded inside dangerouslySetInnerHTML strings - we need to handle escaped quotes
// The string in the TSX file will have \\\" escaping
layout = layout.replace(/\\(["'])https:\/\/www\.adsguards\.com\/wp-content\/plugins\/optimization-detective\/[^"'\\]*\\1/g, '""');

// Count after
const after = (layout.match(/optimization-detective/g) || []).length;

fs.writeFileSync('src/app/layout.tsx', layout);
console.log(`Removed optimization-detective references: ${before} -> ${after}`);
