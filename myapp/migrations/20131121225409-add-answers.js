/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true, indent: 4, es5: true*/
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
    db.createTable('answer', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true
        },
        answer: 'string'
    }, callback);
};

exports.down = function (db, callback) {
    db.dropTable('answer', callback);
};