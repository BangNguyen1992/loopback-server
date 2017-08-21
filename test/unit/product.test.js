'use strict';

const { app, expect } = require('../common');

// Get a reference to the product model
const Product = app.models.Product;

describe('It should resolve', function() {
  it('a Product.find', function() {
    return Product
      .find()
      .then(res => console.log(res));
  });
});

describe('Custom methods', function() {
  it('should allow buying a product', function() {
    const product = new Product({ name: 'buy-product', price: 299 });
    return product.buy(10, function(error, result) {
      expect(result.status).to.contain('Bought 10 product(s)');
    });
  });

  it('should not allow buying a negative product quantity', function() {
    const product = new Product({ name: 'buy-product', price: 299 });
    return product.buy(-10, function(error, result) {
      expect(error).to.contain('Invalid quantity -10');
    });
  });

  describe('Validation', function() {
    it('should reject a name shorter than 3 chars', function() {
      return Product.create({ name: 'a', price: 299 })
        .then(result => Promise.reject('Product should not be created'))
        .catch(error => {
          expect(error.message).to.contain('Name should be at least 3 characters');
          expect(error.statusCode).to.be.equal(422);
        });
    });

    it('should reject a duplicated name', function() {
      return Promise.resolve()
        .then(() => Product.create({ name: 'abc', price: 299 }))
        .then(() => Product.create({ name: 'abc', price: 299 }))
        .then(result => Promise.reject('Product should not be created'))
        .catch(error => {
          expect(error.message).to.contain('Details: `name` is not unique');
          expect(error.statusCode).to.be.equal(422);
        });
    });

    it('should reject a negative price', function() {
      return Product.create({ name: 'lowPrice', price: -1 })
        .then(result => Promise.reject('Product should not be created'))
        .catch(error => {
          expect(error.message).to.contain('Price should be a positive integer');
          expect(error.statusCode).to.be.equal(422);
        });
    });

    it('should reject a price below the minimum price', function() {
      return Product.create({ name: 'lowPrice', price: 98 })
        .then(result => Promise.reject('Product should not be created'))
        .catch(error => {
          expect(error.message).to.contain('Price should be highter than the minimal price in the DB');
          expect(error.statusCode).to.be.equal(422);
        });
    });
  });

  describe('Hooks', function() {
    it('should not allow adding a product to non-existing category', function() {
      return Product.create({ name: 'new category', price: 199, categoryId: 9999 })
        .then(result => expect(result).to.equal(null))
        .catch(error => {
          expect(error).to.equal('Error adding product to non-existing category');
        });
    });
  });
});
