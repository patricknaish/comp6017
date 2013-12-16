/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true, indent: 4, es5: true*/
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {

    var createOwners = function (err) {
        if (err) { callback(err); return; }
        db.runSql("CREATE TABLE answer_comment ( id INTEGER PRIMARY KEY AUTOINCREMENT, created DATETIME DEFAULT CURRENT_TIMESTAMP, updated DATETIME, comment TEXT NOT NULL, author_id INTEGER NOT NULL, answer_id INTEGER NOT NULL, FOREIGN KEY (author_id) REFERENCES user(id), FOREIGN KEY (answer_id) REFERENCES answer(id) ON DELETE CASCADE);", callback);
    };

    db.dropTable('answer_comment', {ifExists: true}, createOwners);
};

exports.down = function (db, callback) {
    db.dropTable('answer_comment', callback);
};
