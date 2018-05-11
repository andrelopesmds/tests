var express = require('express')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var app = express()
var appPath = __dirname;
const path = require('path');
const uuidv1 = require('uuid/v1'); 	//v1 - timestamp
var jwt = require('jwt-simple');
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');
var moment = require('moment');


// connect to DB
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '/var/run/postgresql',
    user : 'andre',
    password : '',
    database : 'andre',
    port: 5432
  }
});

//create table (if not exists)
knex.schema.createTableIfNotExists('users', function (table) {
  table.increments();
  table.string('name');
  table.string('email');
  table.string('uuid');
  table.timestamps();
}).then(() => {})


//serve static files - js css html images and so on
app.use(serveStatic(path.join(appPath, '../public'), {'index':['form.html']}))

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())


app.post('/', function(req, res){

	// received data
	var name = req.body.name;
	var email = req.body.email;

	//create uuid
	var uuid = uuidv1();
	
	//jwt
	moment.locale();
	var expires = moment().add(7, 'days').valueOf();
	var token = jwt.encode({
		iss: uuid,
		exp: expires
	},app.get('jwtTokenSecret'));

	//obj to store into DB
	var obj2 = {name: name, email: email, uuid: uuid};

	knex.insert(obj2).into("users").then(function (id) {
	  console.log(id);
	})

	//obj to return
	var obj = {name: name, uuid: uuid, token: token};
	console.log(obj);	
	
	//response = { name, iiud ,token}
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(obj));


})

app.listen(8080, 'localhost')



