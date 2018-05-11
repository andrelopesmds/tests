var express = require('express')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var app = express()
var appPath = __dirname;
const path = require('path');
const CPF = require('cpf');
var controlDB = require('./controlDB.js');
var Isemail = require('isemail');

// create DB and table if they don't exist
controlDB.createDB(appPath + '/db/');

//serve static files - js css html images and so on
app.use(serveStatic(path.join(appPath, '../static'), {'index':['index.html']}))

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.post('/search/', function(req, res){

  var cpf = CPF.clear(req.body.searchCPF);

  getDataFromDatabase(function(data){
    
    if(data!=''){
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.send({'success':'false'});
    }
  }, cpf)

})

app.post('/', function(req, res){

  var cpf = CPF.clear(req.body.cpf);

  getDataFromDatabase(function(data){   

    if(data==''){
      // new user - insert data in DB
      var name = req.body.name;
      var email = req.body.email;
      var cpf = req.body.cpf;
      var address = req.body.address;
      var mainPhone = req.body.mainPhone;
      var extraPhones = req.body.extraPhones;
      var maritalStatus = req.body.maritalStatus;

      // data validation
      if( name && email && cpf && address && mainPhone && maritalStatus && CPF.isValid(cpf) && Isemail.validate(email) ){

        cpf = CPF.clear(cpf);  // remove . and - from number
        controlDB.insert(appPath + '/db/', name, email, cpf, address, mainPhone, extraPhones[0], extraPhones[1], extraPhones[2], extraPhones[3], maritalStatus);

        res.setHeader('Content-Type', 'application/json');
        res.send({'name':name});
        //res.send("Thanks for subscribing");

      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send({'success':'false'});
      } 
    } else{
      // old user - update data in DB
      var name = req.body.name;
      var email = req.body.email;
      var cpf = req.body.cpf;
      var address = req.body.address;
      var mainPhone = req.body.mainPhone;
      var extraPhones = req.body.extraPhones;
      var maritalStatus = req.body.maritalStatus;

      // data validation
      if( name && email && cpf && address && mainPhone && maritalStatus && CPF.isValid(cpf) && Isemail.validate(email) ){

        cpf = CPF.clear(cpf);  // remove . and - from number
        controlDB.update(appPath + '/db/', name, email, cpf, address, mainPhone, extraPhones[0], extraPhones[1], extraPhones[2], extraPhones[3], maritalStatus);

        res.setHeader('Content-Type', 'application/json');
        res.send({'name':name});
        //res.send("data updated");

      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send({'success':'false'});
      }

    }

  }, cpf)

})

app.listen(8080, 'localhost')


function getDataFromDatabase(callback, cpf) {
    controlDB.getUsers(path.join(appPath, '/db/'), function(subscription) {
      callback(subscription);
    }, cpf);
}

module.exports = app; // for testing
