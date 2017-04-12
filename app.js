/**
 * Created by ktolik on 12.04.2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cllc = require('cllc')();

var app = express();

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});