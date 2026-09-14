const fs = require('fs');

const lsDir = 'C:/Users/ronak/Downloads/vicky/tempalet/www.adsguards.com/wp-content/litespeed/css';
const lsFiles = fs.readdirSync(lsDir);

const results = new Set();
const regex = /\.elementor-3\b/;

for (const f of lsFiles) {
  const content = fs.readFileSync(lsDir + '/' + f, 'utf8');
  const rules = content.split('}').map(r => r + '}');
  const e3Rules = rules.filter(r => regex.test(r));
  e3Rules.forEach(r => results.add(r.trim()));
}

results.forEach(r => console.log(r));
