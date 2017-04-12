/**
 * Created by ktolik on 12.04.2017.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    cllc = require('cllc')(),
    app = express();

var controller = require('./Controllers/controller');

app.use(bodyParser.json());

//Manufacturer
//get /manufacturers/limit/{}/page/{page} -> get list of manufacturers
//app.get('/manufacturers/limit/:limit/page/:page', controller.getListManufacturers);
//post /manufacturers -> add new manufacturer to store
app.post('/manufacturers', controller.addManufacturer);
//post /manufacturers/{id}/images -> add image to manufacturer by manufacturer ID
//app.post('/manufacturers/:id/images', controller.addImageManufacturer);
//put /manufacturers/{id} -> Update manufacturer by ID
//app.put('/manufacturers/:id', updateManufacturerById);
//delete /manufacturers Delete namufacturers
//app.delete('/manufacturers/:id', controller.DelManufacturerById);

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});