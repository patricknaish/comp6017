/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true*/
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
    db.createTable('user', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true
        },
        name: 'string'
    }, callback);
};

exports.down = function (db, callback) {
    db.dropTable('user', callback);
};