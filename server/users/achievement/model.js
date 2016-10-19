/**
 * Created by Jens on 15-Oct-16.
 */
var mongoose = require("mongoose");
var config = require("../../config/index");


//MAIN
var AchievementSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        index: true,
        unique: true
    },
    description : {
        type: String,
        required: true
    },
    karmaReward: {
        type: Number,
        min:0,
        default: 0
    },
    diamondReward: {
        type: Number,
        min:0,
        default: 0
    },
    image :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    }
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});

module.exports = mongoose.model('Achievement', AchievementSchema);

module.exports.Schema = AchievementSchema;


