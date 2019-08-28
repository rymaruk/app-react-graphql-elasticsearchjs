const _ = require('lodash');
const client = require('./server.client');
const PRODUCTS = require('./json/books.json').products;

/**
 * Generate own bulk schema:
 * {index: {_index: "catalog"}}
 * {name: "Some name of product", brand: "Name Brand", ...}
 */
let initialBulk = {index: {_index: "catalog"}};
let collectionBulk = [];
_.map(_.keys(PRODUCTS), uuid => {
  collectionBulk = [
    ...collectionBulk, 
    initialBulk, 
    PRODUCTS[uuid]
  ];
});

client.bulk({body: collectionBulk}, function (err, r) {
  if (err) {
    console.log(`Failed Bulk operation\n`, err);
  } else {
    console.log(`🚀 Successfully imported ${_.keys(PRODUCTS).length} items \n`);
  }
});
