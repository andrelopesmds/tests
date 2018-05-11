var sqlite3 = require('sqlite3').verbose();
var db;

exports.connect = function(path) { 
    db = new sqlite3.Database(path + '/DB');
}

exports.createDB = function() {
    db.run("CREATE TABLE IF NOT EXISTS users (name VARCHAR(150), email VARCHAR(100), language VARCHAR(100) )");
};

exports.insert = function(name, email, language, callback) {
    var stmt = db.prepare("INSERT INTO users VALUES (?,?,?)");
    stmt.run(name, email, language);
    stmt.finalize();

    callback();
};

exports.select = function(path) {

    var temp = new sqlite3.Database(path + '/DB');

    temp.serialize(function() {
        temp.each("SELECT * from users",
                  function(err, row) { console.log(row); });
    });

    temp.close();
};
