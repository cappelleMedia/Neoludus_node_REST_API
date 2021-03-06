/**
 * Created by Jens on 15-Oct-16.
 */
const mongoose = require("mongoose");
const config = require("../../config/index");


//MAIN
let AchievementSchema = new mongoose.Schema({
    imageUrl :{
        type:String,
        required: true
    },
    name :{
        type: String,
        required: true,
        index: true,
        sparse: true,
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
    }
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});
module.exports = mongoose.model('Achievement', AchievementSchema);

module.exports.Schema = AchievementSchema;


