const fs    = require('fs');
const http  = require('http');
const url   = require('url');

const createDynamicHTML = require('./utils/create-dynamic-html');

const port  = 3000;
const host  = 'localhost';

const dataJson      = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const data          = JSON.parse(dataJson);

const overviewTemp  = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8');
const cardTemp      = fs.readFileSync(`${__dirname}/templates/card-template.html`, 'utf-8');
const productTemp   = fs.readFileSync(`${__dirname}/templates/product-template.html`, 'utf-8');

// Server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Root Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    })

    const cardsHTML     = createDynamicHTML(cardTemp, data);
    const overviewPage  = overviewTemp.replace('{PRODUCT_CARDS}', cardsHTML);

    res.end(overviewPage);

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    const product     = data.filter(obj => obj.id == query.id);
    const productPage = createDynamicHTML(productTemp, product);

    res.end(productPage);

  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(dataJson);

    // 404
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.end('Page cannot find');
  }

});

server.listen(port, host, () => {
  console.log(`Server started listening to on port: ${port}`);
})
