const fs      = require('fs');
const http    = require('http');

const port    = 3000;
const host    = 'localhost';

const dataJson = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const server = http.createServer((req, res) => {
  const path = req.url;

  if (path === '/' || path === '/overview') {
    res.end( 'This is OVERVIEW');
    console.log(path);
  } else if (path === '/product') {
    res.end('This is PRODUCT')
  } else if (path === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(dataJson);
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
