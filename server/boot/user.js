'use strict';

// const find = require('lodash/find');
// const remove = require('lodash/remove');
// Access Control https://loopback.io/doc/en/lb3/Controlling-data-access.html

module.exports = function(app) {
  console.log('object', app);
  const User = app.models.User;
  // Validate minimal length of the name
  User.validatesLengthOf('username', {
    min: 4,
    message: {
      min: 'Username should be at least 4 characters',
    },
  });

  // Validate the username to be unique
  User.validatesUniquenessOf('username');
};
