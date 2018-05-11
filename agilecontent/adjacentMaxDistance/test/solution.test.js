var assert = require('assert');
var S = require('../solution.js');


describe('Solution', function() {

  it('should be a function', function() {

    assert.equal(typeof S, 'function');  

  })

  it('should return -2 if no adjacent exist or invalid entry data', function() {

   assert.equal(S(8) ,-2);

  })

 it('should return 4 if A = [0,3,3,7,5,3,11,1]', function() {

   assert.equal(S([0,3,3,7,5,3,11,1]), 4);  

  })

 it('should return 5 if A = [0,3,3,12,5,3,7,1]', function() {

   assert.equal(S([0,3,3,12,5,3,7,1]), 5);  

  })



});

