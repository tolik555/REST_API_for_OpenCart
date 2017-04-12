/**
 * Created by ktolik on 12.04.2017.
 */
var mysqldb = require('./mydqldb');

exports.createManufacturer = function (newManufacturer, cb) {
    mysqldb.pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO `oc_manufacturer` SET ?', newManufacturer, function (error,result,fields) {
            cb(error, result,fields);
            connection.release();
            if(err) console.log('Connection Error:'+err);
        });
    });
};