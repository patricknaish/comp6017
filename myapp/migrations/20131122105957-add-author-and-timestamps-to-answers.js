var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.dropTable('answer', {ifExists: true}, createOwners);

	function createOwners(err) {
		if (err) { callback(err); return; }
		db.runSql("CREATE TABLE answer ( id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, answer TEXT, author_id INTEGER, question_id INTEGER, FOREIGN KEY (author_id) REFERENCES user(id), FOREIGN KEY (question_id) REFERENCES question(id) );", callback);
	}
};

exports.down = function(db, callback) {
	db.dropTable('answer', callback);
};
