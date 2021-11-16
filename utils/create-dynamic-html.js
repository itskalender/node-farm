module.exports = function createDynamicHTML(template, arrayOfData) {
  const keywords  = [
    '{PRODUCT_IMG}',
    '{PRODUCT_NAME}',
    '{PRODUCT_QUANTITY}',
    '{PRODUCT_PRICE}',
    '{PRODUCT_ID}',
    '{PRODUCT_NOT_ORGANIC}',
    '{PRODUCT_FROM}',
    '{PRODUCT_NUTRIENS}',
    '{PRODUCT_DESCRIPTION}'
  ];

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
          break;
        case '{PRODUCT_FROM}':
          strHTML = strHTML.replaceAll('{PRODUCT_FROM}', productData['from']);
          break;
        case '{PRODUCT_NUTRIENS}':
          strHTML = strHTML.replaceAll('{PRODUCT_NUTRIENS}', productData['nutrients']);
          break;
        case '{PRODUCT_DESCRIPTION}':
          strHTML = strHTML.replaceAll('{PRODUCT_DESCRIPTION}', productData['description']);
          break;
      }
    })
    return strHTML;
  });
  return arrOfStrHTML.join('');
}