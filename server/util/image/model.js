/**
 * Created by Jens on 15-Oct-16.
 */
var mongoose = require("mongoose");
var config = require("../../config/index");

//MAIN
var ImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    assetType: {
        type: String,
        enum: ['achievements', 'avatars', 'design', 'newsfeed', 'reviews'],
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

ImageSchema.set('toObject', {virtuals: true});
ImageSchema.set('toJSON', {virtuals: true});

//VALIDATION
//FIXME COMBINATION FILENAME + PATH + EXTENSION SHOULD BE UNIQUE

//STATICS
ImageSchema.statics.findByFileName = function (filename, callback) {
    return this.findOne({filename: filename}, callback);
};

//METHODS
ImageSchema.methods.getFullPath = function (callback) {
    var base = '';
    var path = base + '/' + this.filename + '.' + this.extension;
    callback(path);
};

ImageSchema.virtual('path').get(function () {
    return config.basepaths[this.assetType] + '/' + this.filename + '.' + this.extension;
});

//EXPORTS
module.exports = mongoose.model('Image', ImageSchema);