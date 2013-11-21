var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('answer_comment', {
        id: { 
        	type: 'int', 
        	primaryKey: true, 
        	autoIncrement: true 
        },
        comment: 'string'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('answer_comment', callback);
};