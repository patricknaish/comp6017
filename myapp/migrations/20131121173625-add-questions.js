var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('question', {
        id: { 
        	type: 'int', 
        	primaryKey: true, 
        	autoIncrement: true 
        },
        question: 'string'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('question', callback);
};
