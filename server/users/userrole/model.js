/**
 * Created by Jens on 17-Oct-16.
 */
var mongoose = require("mongoose");
var config = require("../../config/index");

//MAIN
var UserRoleSchema = new mongoose.Schema({
    displayName: {
        type: String,
        require: true,
        unique: true,
        index: true,
        lowercase: true
    },
    accessFlag: {
        type: Number,
        required: true
    },
    minKp: {
        type: Number,
        default: 0
    },
    minDp: {
        type: Number,
        default: 0
    }

}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});

//STATICS
//FIXME move to Controller
UserRoleSchema.statics.findByFlag = function(flag, callback){
    return this.findOne({accessFlag: flag}, callback);
};

//EXPORTS
module.exports = mongoose.model('UserRole', UserRoleSchema);