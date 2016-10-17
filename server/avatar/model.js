/**
 * Created by Jens on 17-Oct-16.
 */
var mongoose = require("mongoose");
var config = require("../config/index");

var AvatarSchema = new mongoose.Schema({
    tier: {
        type: Number,
        min: 0,
        required: true
    } ,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    }
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});

module.exports = mongoose.model('Avatar', AvatarSchema);