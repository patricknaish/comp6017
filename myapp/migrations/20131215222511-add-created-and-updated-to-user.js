/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true*/
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {

    var createUsers = function (err) {
        if (err) { callback(err); return; }
        db.runSql("CREATE TABLE user ( id INTEGER PRIMARY KEY AUTOINCREMENT, created DATETIME DEFAULT CURRENT_TIMESTAMP, updated DATETIME, name TEXT NOT NULL );", callback);
    };

    db.dropTable('user', {ifExists: true}, createUsers);
};

exports.down = function (db, callback) {
    db.dropTable('user', callback);
};

