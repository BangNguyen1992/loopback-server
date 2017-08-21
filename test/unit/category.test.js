'use strict';

const { app, expect } = require('../common');

const Category = app.models.Category;
const Product = app.models.Product;

describe('Category', function() {
  describe('Hooks', function() {
    it('should now allow deleting a category with products', function() {
      return Promise.resolve()
        .then(() => Category.create({ name: 'my category' }))
        .then(category => Product.create({ name: 'category-product', price: 299, categoryId: category.id }))
        .then(result => Category.destroyById(result.categoryId))
        .then(result => expect(result).to.equal(null))
        .catch(error => expect(error).to.equal('Error deleting category with products'));
    });
  });
});
