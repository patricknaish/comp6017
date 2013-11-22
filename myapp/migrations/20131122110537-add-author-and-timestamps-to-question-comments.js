var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.dropTable('question_comment', {ifExists: true}, createOwners);

	function createOwners(err) {
		if (err) { callback(err); return; }
		db.runSql("CREATE TABLE question_comment ( id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, comment TEXT, author INTEGER, question INTEGER, FOREIGN KEY (author) REFERENCES user(id), FOREIGN KEY (question) REFERENCES question(id) );", callback);
	}
};

exports.down = function(db, callback) {
	db.dropTable('question_comment', callback);
};
