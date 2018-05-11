var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/mydb";
var fs = require( 'fs' );
var url = '/Users/andre/Documents/Projects/Resize/Images';
var images = [];


  // Loop through all the files in the temp directory
fs.readdir( url, function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        } 

        files.forEach( function( file, index ) {
            // Make one pass and make the file complete
            MongoClient.connect(mongoUrl, function(err, db) {
                if (err) throw err;
                var myobj = { name: file.split('.')[0], url: 'Images/'+file, type: ' ' };
                var str = myobj.name;
                if (str.includes('small')){
                    myobj.type = 'small';
                    db.collection("images").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                    })
                }else if(str.includes('medium')){
                    myobj.type = 'medium';
                    db.collection("images").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                    })
                }else if(str.includes('large')){
                    myobj.type = 'large';
                    db.collection("images").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                    })
                }
            })

        } );
} );

