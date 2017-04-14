/**
 * Created by ktolik on 12.04.2017.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    //expressValidator = require('express-validator'),
    log = require('cllc')(),
    app = express();

var controller = require('./Controllers/controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator());
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    next();
    return err;
});

//Manufacturer
//get /manufacturers/limit/{}/page/{page} -> get list of manufacturers
app.get('/manufacturers/limit/:limit/page/:page', controller.getListManufacturers);

//post /manufacturers -> add new manufacturer to store
// Format body raw json(application/json)(Manufacturer object)
// header X-Oc-Restadmin-Id 123(Api Secret key)
// {
//     "name":"name",
//      "image":"path",
//     "sort_order":"0",
//     "store_id":"0"
// }
app.post('/manufacturers', controller.addManufacturer);

//post /manufacturers/{id}/images -> add image to manufacturer by manufacturer ID
app.post('/manufacturers/{id}/images', addImageToManufacturer);

//app.post('/manufacturers/:id/images', controller.addImageManufacturer);
//put /manufacturers/{id} -> Update manufacturer by ID
//app.put('/manufacturers/:id', updateManufacturerById);

//delete /manufacturers Delete namufacturers
//example {"manufacturers":[8,9]}
app.delete('/manufacturers', controller.DelManufacturerById);

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});