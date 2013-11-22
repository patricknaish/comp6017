var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.dropTable('answer_comment', {ifExists: true}, createOwners);

	function createOwners(err) {
		if (err) { callback(err); return; }
		db.runSql("CREATE TABLE answer_comment ( id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, comment TEXT, author INTEGER, answer INTEGER, FOREIGN KEY (author) REFERENCES user(id), FOREIGN KEY (answer) REFERENCES answer(id) );", callback);
	}
};

exports.down = function(db, callback) {
	db.dropTable('answer_comment', callback);
};
