var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var http = require('http');
var data;
var Client = require('node-rest-client').Client; 
var fs = require('fs');

var client = new Client();

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("images").find({}).toArray(function(err, result) {
    if (err) throw err;
    data = result;
    db.close();
  });
});


http.createServer(function (req, res) {  
    req.url = req.url.slice(1);
    var size = Object.keys(data).length;
    var control = false;
    
    for (var i = 0 ; i < size; i++){
        if ( req.url == data[i].url){
            control = true;
        }
    }

    if(control){
        fs.readFile(req.url, function(err, data) {
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.write(data);
            res.end();
        });
    }
    else{
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data, null, 3));
        res.end();
    }
}).listen(8080);




