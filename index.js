const fs      = require('fs');
const http    = require('http');

const port    = 3000;
const host    = 'localhost';

const dataJson      = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const data          = JSON.parse(dataJson);

const overviewTemp  = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8');
const cardTemp      = fs.readFileSync(`${__dirname}/templates/card-template.html`, 'utf-8');

function createDynamicHTML(template, arrayOfData) {
  const keywords  = ['{PRODUCT_IMG}', '{PRODUCT_NAME}', '{PRODUCT_QUANTITY}', '{PRODUCT_PRICE}', '{PRODUCT_ID}', '{PRODUCT_NOT_ORGANIC}'];

  const arrOfStrHTML  = arrayOfData.map(productData => {
    let strHTML = template;
    keywords.forEach(k => {
      switch (k) {
        case '{PRODUCT_IMG}':
          strHTML = strHTML.replaceAll('{PRODUCT_IMG}', productData['image']);
          break;
        case '{PRODUCT_NAME}':
          strHTML = strHTML.replaceAll('{PRODUCT_NAME}', productData['productName']);
          break;
        case '{PRODUCT_QUANTITY}':
          strHTML = strHTML.replaceAll('{PRODUCT_QUANTITY}', productData['quantity']);
          break;
        case '{PRODUCT_PRICE}':
          strHTML = strHTML.replaceAll('{PRODUCT_PRICE}', productData['price']);
          break;
        case '{PRODUCT_ID}':
          strHTML = strHTML.replaceAll('{PRODUCT_ID}', productData['id']);
          break;
        case '{PRODUCT_NOT_ORGANIC}':
          strHTML = strHTML.replaceAll('{PRODUCT_NOT_ORGANIC}', `${productData.organic ? '' : 'not-organic'}`);
      }
    })
    return strHTML;
  });

  return arrOfStrHTML.join('')
}

const cardsHTML = createDynamicHTML(cardTemp, data);
const overviewPage = overviewTemp.replace('{PRODUCT_CARDS}', cardsHTML);

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
