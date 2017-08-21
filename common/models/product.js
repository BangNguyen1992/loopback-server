'use strict';

module.exports = function(Product) {
  Product.observe('before save', function(ctx, next) {
    if (ctx.instance && ctx.instance.categoryId) {
      return Product.app.models.Category
        .count({ id: ctx.instance.categoryId })
        .then(res => {
          if (res < 1) return Promise.reject('Error adding product to non-existing category');
        });
    }
    return next();
  });
  /**
   * Return true if input larger than zero
   * @param {number} quantity Number to validate
   */
  const validQuantity = quantity => Boolean(quantity > 0);

  /**
   * Buy this product
   * @param {string} quantity Number of products to buy
   * @param {Function(Error, object)} callback
   */

  Product.prototype.buy = function(quantity, callback) {
    if (!validQuantity(quantity))
      return callback(`Invalid quantity ${quantity}`);

    const result = {
      quantity: quantity,
      status: `Bought ${quantity} product(s)`,
    };
    callback(null, result);
  };

  // Validate minimal length of the name
  Product.validatesLengthOf('name', {
    min: 3,
    message: {
      min: 'Name should be at least 3 characters',
    },
  });

  // Validate the name to be unique
  Product.validatesUniquenessOf('name');

  // Validate the price to be positive integer
  const positiveInterger = /^[0-9]*$/;
  const validatePositiveIngeter = function(error) {
    if (!positiveInterger.test(this.price)) error();
  };

  Product.validate('price', validatePositiveIngeter, {
    message: 'Price should be a positive integer',
  });

  // Validate the price must be higher than certain minimal price
  const validateMinimalPrice = function(error, done) {
    const price = this.price;

    process.nextTick(() => {
      const minimalPriceFromDB = 99;
      if (price < minimalPriceFromDB) error();
      done();
    });
  };

  Product.validateAsync('price', validateMinimalPrice, {
    message: 'Price should be highter than the minimal price in the DB',
  });
};
