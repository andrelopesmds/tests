var sqlite3 = require('sqlite3').verbose();

exports.createDB = function(path) {

    var db = new sqlite3.Database(path + '/DB');

    db.run("CREATE TABLE IF NOT EXISTS users (name VARCHAR(150), email VARCHAR(100), cpf VARCHAR(20), address VARCHAR(250), phoneNumber VARCHAR(30), phoneNumber1 VARCHAR(30), phoneNumber2 VARCHAR(30), phoneNumber3 VARCHAR(30), phoneNumber4 VARCHAR(30) , maritalStatus VARCHAR(25) )");


    db.close();
};

exports.insert = function(path, name, email, cpf, address, phoneNumber, phoneNumber1, phoneNumber2, phoneNumber3, phoneNumber4, maritalStatus) {

    var db = new sqlite3.Database(path + '/DB');

    var stmt = db.prepare("INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?)");

    stmt.run(name, email, cpf, address, phoneNumber, phoneNumber1, phoneNumber2, phoneNumber3, phoneNumber4, maritalStatus);

    stmt.finalize();

    db.close();
};

exports.update = function(path, name, email, cpf, address, phoneNumber, phoneNumber1, phoneNumber2, phoneNumber3, phoneNumber4, maritalStatus) {

    var db = new sqlite3.Database(path + '/DB');

    db.run("UPDATE users SET name = ?, email = ?, address = ?, phoneNumber = ?, phoneNumber1 = ?, phoneNumber2 = ?, phoneNumber3 = ?, phoneNumber4 = ?, maritalStatus = ? WHERE cpf = ?", name, email, address, phoneNumber, phoneNumber1, phoneNumber2, phoneNumber3, phoneNumber4, maritalStatus,  cpf);

    db.close();    

};


exports.select = function(path) {

    //  get all rows in DB

    var db = new sqlite3.Database(path + '/DB');

    db.serialize(function() {

        db.each("SELECT * from users", function(err, row) {
            console.log(row);
        });
    });

    db.close();

};


exports.getUsers = function(path, callback, cpf) {

    var db = new sqlite3.Database(path + '/DB');

    db.serialize(function() {

        db.all("SELECT * from users WHERE cpf="+cpf, function(err, allRows) {

            if (err != null) {
                console.log(err);
                callback(err);
            }

            callback(allRows);
            db.close();

        });

    });

}


