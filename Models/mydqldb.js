/**
 * Created by ktolik on 12.04.2017.
 */
var mysql = require('mysql');

// exports.connection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "",
//     database: "opencart",
//     multipleStatements: true,
//     debag: false
// });

exports.pool      =    mysql.createPool({
    connectionLimit : 100, //important
    queueLimit: 100,
    waitForConnections: true,
    acquireTimeout: 10000,

    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'opencart',
    multipleStatements: true,
    debug    :  false
});