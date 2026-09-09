const fs = require('fs');
const html = fs.readFileSync('reference_index_utf8.html', 'utf8');
const forms = html.match(/<form[^>]*>[\s\S]*?<\/form>/gi) || [];
forms.forEach((f, i) => fs.writeFileSync(`form_${i}.html`, f));
console.log(`Found ${forms.length} forms`);
