/**
 * Created by ktolik on 12.04.2017.
 */
var mysql = require('mysql');

exports.connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "opencart",
    multipleStatements: true,
    debag: false
});