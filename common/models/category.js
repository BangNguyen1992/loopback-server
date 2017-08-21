'use strict';

module.exports = function(Category) {
  Category.observe('before delete', function(ctx) {
    if (ctx.where) {
      return Category.app.models.Product
        .count({ categoryId: ctx.where.id })
        .then(result => {
          if (result > 0) return Promise.reject('Error deleting category with products');
        });
    }
  });

  // Validate minimal length of the name
  Category.validatesLengthOf('name', {
    min: 3,
    message: {
      min: 'Name should be at least 3 characters',
    },
  });

  // Validate the name to be unique
  Category.validatesUniquenessOf('name');
};
