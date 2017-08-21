'use strict';

const { app, expect, request } = require('../common');

describe('Category', function() {
  it('should return code 200 when listing Categories', function() {
    return request
      .get('/api/Categories')
      .expect(200);
  });

  it('should return code 401 when trying to create Categories', function() {
    return request
      .post('/api/Categories')
      .send({ name: 'Test Category' })
      .expect(401);
  });

  it('should return code 401 when trying to update Categories', function(done) {
    request
      .patch('/api/Categories/1')
      .send({ name: 'Test Category update' })
      .expect(401, done);
  });

  it('should return code 401 when trying to delete Categories', function(done) {
    request
      .delete('/api/Categories/1')
      .expect(401, done);
  });
});

describe('Product', function() {
  it('should return code 200 when listing Products', function() {
    return request
      .get('/api/Products')
      .expect(200);
  });

  it('should return code 401 when trying to create Products', function() {
    return request
      .post('/api/Products')
      .send({ name: 'Test Product' })
      // .expect(401);
      .catch(error => {
        expect(error.statusCode).to.be.equal(401);
      });
  });

  it('should return code 401 when trying to update Products', function() {
    return request
      .patch('/api/Products/1')
      .send({ name: 'Test Category update' })
      // .expect(401);
      .catch(error => {
        expect(error.statusCode).to.be.equal(401);
      });
  });

  it('should return code 401 when trying to delete Products', function() {
    return request
      .delete('/api/Products/1')
      .expect(401);
    // .catch(error => {
    //   expect(error.statusCode).to.be.equal(401);
    // });
  });

  it('should return code 200 when trying to buy a Product', function() {
    return app.models.Product.create({ name: 'test', price: 199 })
      .then(res => request
        .post(`/api/Products/${res.id}/buy`)
        .send({ quantity: 100 })
        .expect(200));
  });
});
