'use strict';

const local = process.env.NODE_ENV;

if (local) {
  console.log('Using MongoDB from: ', local);

  const dataSources = {
    db: {
      name: 'db',
      connector: 'memory',
      file: 'db.json',
    },
  };
  module.exports = dataSources;
};
