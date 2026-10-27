const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

const URL = 'https://quotes.toscrape.com/';
let ultimo = [];

function scrape() {
  https.get(URL, (res) => {
    let html = '';
    res.on('data', (chunk) => { html += chunk; });
    res.on('end', () => {
      const $ = cheerio.load(html);
      ultimo = $('.quote .author').map((i, el) => $(el).text()).get();
      console.log('Autores extraídos:', ultimo);
    });
  }).on('error', (err) => console.error('Error:', err.message));
}

scrape();
setInterval(scrape, 60000); // cada 60 segundos

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ultimo));
}).listen(3000, () => console.log('Server running at port 3000'));
