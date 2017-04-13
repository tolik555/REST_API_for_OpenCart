/**
 * Created by ktolik on 12.04.2017.
 */
var model = require('../Models/model');

//Manufacturers
exports.addManufacturer = function (req, res) {

    //req.sanitizeBody('name').escape().trim();
    //req.checkBody('name', 'Поле name не должно быть пустым').notEmpty();
    //req.checkBody('name', 'Длинна имени не должна быть короче 2-х знаков').len(2);
    //req.checkBody('name', 'Длинна имени не должна быть длинее 64-х знаков').len(2,64);
    //
    // var errors = req.validationErrors();
    // if(errors){
    //     console.log(errors);
    //     //res.status(400).send(errors[0].msg);
    //     //return;
    // }

     var validationError = {
         success: false,
         error: {
             name: "Manufacturer Name must be between 2 and 64 characters!"
         }
     };

     var validationSuccess = {
         success: true,
         data: {
             id: ""
         }
     };

     if(req.body.name&&req.body.name.length>=2&&req.body.name.length<=64){
         var oc_manufacturer = {
             name: encodeURI(req.body.name.trim()),
             image: encodeURI(req.body.image.trim()),
             sort_order: req.body.sort_order
         };

         var oc_manufacturer_to_store = {
             manufacturer_id: '',
             store_id: encodeURI(req.body.store_id.trim())
         };

         model.createManufacturer( oc_manufacturer, oc_manufacturer_to_store, function (err, result) {
             if(err){
                 console.log(err);
                 return res.sendStatus(500);
             }
             validationSuccess.data.id = result.insertId;
             res.json(validationSuccess);
             console.log(result);
         })
     } else {
         res.json(validationError);
     }
};