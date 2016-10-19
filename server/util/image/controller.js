/**
 * Created by Jens on 18-Oct-16.
 */
var winston = require('winston');
var _ = require('lodash');
var Model = require('./model');
var Controller = this;

module.exports.fill = function(callback) {
    Model.findOne().exec(function(err, image){
        if(!image){
            callback();
        }
    });
};

module.exports.addImage = function (data, callback) {
    var newImg = null;
    try {
        newImg = new Model(data);
    } catch (err) {
        winston.error(err);
        //return bad request
        return callback(400);
    }
    var result = 500;
    newImg.save(function (err) {
        if (err) {
            winston.error(err);
        } else {
            result = newImg;
        }
        callback(result);
    });
};

module.exports.getImages = function (limit, skip, callback) {
    var result = '';
    Model
        .find()
        .skip(skip)
        .limit(limit)
        .exec(function (err, images) {
            if (err) {
                winston.error(err);
            } else {
                if (!images || !images.length) {
                    result = 404;
                } else {
                    result = images;
                }
            }
            callback(result);
        });
};

module.exports.getImage = function (id, callback) {
    Model
        .findById(id)
        .exec(function (err, image) {
            getResult(err, image, callback);
        });
};

module.exports.getImageByFileName = function (filename, callback) {
    Model
        .findOne({filename: filename})
        .exec(function (err, img) {
            getResult(err, img, callback);
        });
};

module.exports.updateImage = function (id, updated, callback) {
    Controller
        .getImage(id)
        .exec(function (found) {
            if (!isNaN(found)) {
                callback(found);
            } else {
                var updImg = found;
                Object.assign(updImg, updated);
                Controller.addImage(updImg, function (result) {
                    callback(result);
                });
            }
        });
};

module.exports.deleteImage = function (id, callback) {
    var result = '';
    Model
        .findByIdAndRemove(id)
        .exec(function (err) {
            if (err) {
                winston.error(err);
            } else {
                result = id;
            }
            callback(result);
        });
};

function getResult(err, value, callback) {
    var result = '';
    if (err) {
        winston.error(err);
    } else {
        if (!value) {
            result = 404;
        } else {
            result = value;
        }
    }
    callback(result);
};