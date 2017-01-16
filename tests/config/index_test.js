var expect = require('expect.js');

describe('test configuration module', function () {
   it('load configuration', function (done) {
       var config = require('./../../config');
       expect(config.env).to.eql('test');
       expect(config.deep.key).to.eql('test');
       expect(config.deep.untouched).to.eql('untouched');
       done();
   })
});
