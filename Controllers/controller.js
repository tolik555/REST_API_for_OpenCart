/**
 * Created by ktolik on 12.04.2017.
 */
var model = require('../Models/model');

//Manufacturers
exports.addManufacturer = function (req, res) {
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
        var newManufacturer = {
            manufacturer_id: req.body.id,
            name: req.body.name,
            image: req.body.image_path,
            sort_order: req.body.sort_order
        };

        model.createManufacturer( newManufacturer, function (err, result) {
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