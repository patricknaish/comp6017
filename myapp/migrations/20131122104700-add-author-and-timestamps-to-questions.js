/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true, indent: 4, es5: true*/
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
    var createOwners = function (err) {
        if (err) { callback(err); return; }
        db.runSql("CREATE TABLE question ( id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, question TEXT, author_id INTEGER, FOREIGN KEY (author_id) REFERENCES user(id) );", callback);
    };

    db.dropTable('question', {ifExists: true}, createOwners);
};

exports.down = function (db, callback) {
    db.dropTable('question', callback);
};
