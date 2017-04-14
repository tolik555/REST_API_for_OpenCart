/**
 * Created by ktolik on 12.04.2017.
 */
var mysqldb = require('./mydqldb');

exports.getListManufacturers = function (limit, page, cb) {
    var prepare = "SELECT * FROM `oc_manufacturer` LIMIT "+page+","+limit+";";
    mysqldb.pool.getConnection(function (err,connection) {
        connection.query(prepare, function (error, result) {
            cb(error,result);
        });
        connection.release();
        if(err) console.log('Connection Error:'+err);
    });
};

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

exports.updateManufacturer = function (id, oc_manufacturer, oc_manufacturer_to_store, cb) {
    var prepare = "UPDATE `oc_manufacturer` SET `name`=?, `image`=?, `sort_order`=? WHERE `manufacturer_id`=?;" +
                  "UPDATE `oc_manufacturer_to_store` SET `store_id`=? WHERE `manufacturer_id`=?;";
    var insertParams = [oc_manufacturer.name, oc_manufacturer.image, oc_manufacturer.sort_order, id, oc_manufacturer_to_store.store_id, id];
    mysqldb.pool.getConnection(function (err,connection) {
        connection.query(prepare, insertParams,function (error, result) {
            cb(error, result);
        });
    });
};

exports.delManufacturer = function (delId, cb) {
    var prepare = "DELETE FROM `oc_manufacturer` WHERE `manufacturer_id` IN ("+delId.join()+");" +
        "DELETE FROM `oc_manufacturer_to_store` WHERE `manufacturer_id` IN ("+delId.join()+");";
    mysqldb.pool.getConnection(function (err, connection) {
        connection.query(prepare, function (error, result) {
            cb(error, result);
        });
        connection.release();
        if(err) console.log('Connection Error:'+err);
    });
};