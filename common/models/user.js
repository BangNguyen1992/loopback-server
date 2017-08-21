'use strict';

// Acess Control https://loopback.io/doc/en/lb3/Controlling-data-access.html

module.exports = function(User) {
  // Validate minimal length of the name
  User.validatesLengthOf('name', {
    min: 3,
    message: {
      min: 'Name should be at least 3 characters',
    },
  });

  // Validate the name to be unique
  User.validatesUniquenessOf('name');
};
