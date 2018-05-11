var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);


describe('Server', function() {

  it('should response with status 200 in homepage', function(done){
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should response with status 200 after search for invalid cpf number', function(done){
    chai.request(server)
      .post('/search/')
      .send({'searchCPF':'279cwe k*-wevwe'})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      })
  });

  it('should response with status 200 after search for cpf not stored in DB', function(done){
    chai.request(server)
      .post('/search/')
      .send({'searchCPF':'279.486.766-00'})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      })
  });

 it('should response with json after search for cpf stored in DB', function(done){
    chai.request(server)
      .post('/search/')
      .send({'searchCPF':'117.294.836-40'})
      .end(function(err, res){
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      })
  });

 it('should response with json after trying to subscribe using invalid cpf', function(done){
    chai.request(server)
      .post('/')
      .send({
        'name':'testName',
        'email':'testEmail@gmail.com', 
        'cpf':'023mc23c-23cm209m23',
        'address':'address',
        'mainPhone':'9999999',
        'extraPhones':["","","",""],
        'maritalStatus':'single'
      })
      .end(function(err, res){
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
     })
  });

 it('should response with json after trying to subscribe using valid cpf', function(done){
    chai.request(server)
      .post('/')
      .send({
        'name':'testName',
        'email':'testEmail@gmail.com', 
        'cpf':'279.486.766-00',
        'address':'address',
        'mainPhone':'9999999',
        'extraPhones':["","","",""],
        'maritalStatus':'single'
      })
      .end(function(err, res){
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
     })
  });


 it('should response with json after trying to update data using stored cpf', function(done){
    chai.request(server)
      .post('/')
      .send({
        'name':'testName',
        'email':'testEmail@gmail.com', 
        'cpf':'117.294.836-40',
        'address':'address',
        'mainPhone':'9999999',
        'extraPhones':["","","",""],
        'maritalStatus':'single'
      })
      .end(function(err, res){
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
     })
  });





});


