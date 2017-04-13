/**
 * Created by ktolik on 12.04.2017.
 */
var mysqldb = require('./mydqldb');

exports.createManufacturer = function (oc_manufacturer, oc_manufacturer_to_store, cb) {
    mysqldb.pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO `oc_manufacturer` SET ?', oc_manufacturer, function (error,result) {
            console.log(result);
            oc_manufacturer_to_store.manufacturer_id = result.insertId;
            connection.query('INSERT INTO `oc_manufacturer_to_store` SET ?', oc_manufacturer_to_store, function (error,result) {
                result.insertId = oc_manufacturer_to_store.manufacturer_id;
                cb(error,result);
            });
            connection.release();
            if(err) console.log('Connection Error:'+err);
        });
    });
};