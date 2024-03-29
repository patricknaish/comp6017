/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true*/
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
    var createOwners = function (err) {
        if (err) { callback(err); return; }
        db.runSql("CREATE TABLE question_comment ( id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, comment TEXT, author_id INTEGER, question_id INTEGER, FOREIGN KEY (author_id) REFERENCES user(id), FOREIGN KEY (question_id) REFERENCES question(id) );", callback);
    };

    db.dropTable('question_comment', {ifExists: true}, createOwners);
};

exports.down = function (db, callback) {
    db.dropTable('question_comment', callback);
};
