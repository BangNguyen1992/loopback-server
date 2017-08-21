'use strict';

const Promise = require('bluebird');

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  const AccessToken = app.models.AccessToken;
  const User = app.models.User;

  const email = 'admin@example.com';
  const password = 's3cr3t';
  const accessToken = 's3cr3t';
  // function callback() { console.log('Access Token: ', accessToken); }
  console.log('Access Token: ', accessToken);
  return Promise.resolve()
    .then(() => User.findOne({ where: { email } }))
    .then(response => (response ? response : User.create({ email, password })))
    .then(user => AccessToken.upsert({ id: accessToken, userId: user.id }))
    .asCallback(cb);

  // process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
