var express = require('express')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var app = express()
var appPath = __dirname;
const path = require('path');
var controlDB = require('./controldb.js');


// create DB and table if they don't exist
controlDB.connect(appPath + '/db/');
controlDB.createDB();

//serve static files - js css html images and so on
app.use(serveStatic(path.join(appPath, '../static'), {'index':['index.html']}))

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/', function(req, res){

    var name = req.body.name;
    var email = req.body.email;
    var language = req.body.language;

    // data validation
    if( validate(name, email, language) ){
        controlDB.insert(name, email, language, function(){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({success : true}));
        });
    } else {
        // bad request
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({success : false}));
    }
});

app.listen(8080, 'localhost')


function validate(name, email, language){
    // Check if there is any field empty
    if (name && email && language) {
        return true;
    } else {
        return false;
    }
}


module.exports = app; // for testing
