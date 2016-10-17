/**
 * Created by Jens on 15-Oct-16.
 */
var mongoose = require("mongoose");
var config = require("../config/index");

//MAIN
var ImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        lowercase: true,
    },
    path: {
        type: String,
        required: true,
        lowercase: true
    },
    extension: {
        type: String,
        enum: ['jpg', 'jpeg', 'png', 'gif'],
        required: true,
        lowercase: true
    },
    alt: {
        type: String,
        required: true
    }
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});

//STATICS
ImageSchema.statics.getByFileName = function(path, filename, extension, callback){

};

//METHODS
ImageSchema.methods.getFullPath = function(callback){
    var path = this.path + '/' + this.filename + '.' + this.extension ;
    callback(path);
};

//EXPORTS
module.exports = mongoose.model('Image', ImageSchema);