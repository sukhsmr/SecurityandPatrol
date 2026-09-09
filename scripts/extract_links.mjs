import fs from 'fs';
import * as cheerio from 'cheerio';
const html = fs.readFileSync('adsguards_index_local.html');
const $ = cheerio.load(html);
let links = '';
$('link[rel="stylesheet"]').each((i, el) => {
    links += '<link rel="stylesheet" href="' + $(el).attr('href') + '" />\n';
});
fs.writeFileSync('css_links.txt', links);

let scripts = '';
$('script[src]').each((i, el) => {
    scripts += '<script src="' + $(el).attr('src') + '"></script>\n';
});
fs.writeFileSync('script_links.txt', scripts);
