const fs      = require('fs');
const http    = require('http');

const port    = 3000;
const host    = 'localhost';

const dataJson      = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const data          = JSON.parse(dataJson);

const overviewTemp  = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8');
const cardTemp      = fs.readFileSync(`${__dirname}/templates/card-template.html`, 'utf-8');

const productCards = (function generateProductCards() {
  const keywords    = ['{PRODUCT_IMG}', '{PRODUCT_NAME}', '{PRODUCT_QUANTITY}', '{PRODUCT_PRICE}', '{PRODUCT_ID}'];

  const arrOfProductCards  = data.map(productData => {
    let productCard = cardTemp;
    keywords.forEach(k => {
      switch (k) {
        case '{PRODUCT_IMG}':
          productCard = productCard.replaceAll('{PRODUCT_IMG}', productData['image']);
          break;
        case '{PRODUCT_NAME}':
          productCard = productCard.replaceAll('{PRODUCT_NAME}', productData['productName']);
          break;
        case '{PRODUCT_QUANTITY}':
          productCard = productCard.replaceAll('{PRODUCT_QUANTITY}', productData['quantity']);
          break;
        case '{PRODUCT_PRICE}':
          productCard = productCard.replaceAll('{PRODUCT_PRICE}', productData['price']);
          break;
        case '{PRODUCT_ID}':
          productCard = productCard.replaceAll('{PRODUCT_ID}', productData['id']);
      }
    })
    return productCard;
  });

  return arrOfProductCards.join('')
})();

const overviewPage = (function generateOverview() {
  return overviewTemp.replace('{PRODUCT_CARDS}', productCards);
})();

// Server
const server = http.createServer((req, res) => {
  const path = req.url;

  // Root Page
  if (path === '/' || path === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    res.end(overviewPage);

    // Product page
  } else if (path === '/product') {
    res.end('This is PRODUCT')

    // API
  } else if (path === '/api') {
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
