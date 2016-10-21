/**
 * Created by Jens on 18-Oct-16.
 */
"use strict"
var BaseController = require('../bases/basecontroller');
var Model = require('./model');

class ImageController extends BaseController {
    constructor(model = Model){
        super(model);
    }

    getImageByFileName(filename, callback){
        this.model
            .findOne({filename: filename})
        .exec(function (err, img) {
            BaseController.getResult(err, img, callback);
        });
    }
}
module.exports = ImageController;
