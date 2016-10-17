/**
 * Created by Jens on 11-Oct-16.
 */
var mongoose = require("mongoose");
var config = require("../config/index");
var UserHelp = require("./user-utils");
var UserRole = require('../userrole/model');
var Achievement = require('../achievement/model');

//MAIN
var UserSchema = new mongoose.Schema({
    __v: {
        type: Number,
        select: false
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        default: 'not_assigned'
    },
    regKey: {
        type: String,
        required: true,
        min: 64,
        max: 64,
        select: false,
        default: UserHelp.prototype.generateRegKey(64)
    },
    dateTimePref: {
        type: String,
        required: true
    },
    creation: {
        type:Date,
        required: true
    },
    lastLogin: {
        type: Date,
        required: true
    },
    activeTime: {
        type: Number,
        min: 0,
        default: 0
    },
    userRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRole',
        required: true,
        default: UserRole.findByFlag(1)
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar',
        required: true,
    },
    achievements: {
        type: [Achievement.Schema]
    },
    donated: {
        type: Number,
        min: 0,
        default: 0
    },
    kp: {
        type: Number,
        min: 0,
        default: 0
    },
    dp: {
        type: Number,
        min: 0,
        default: 0
    },
    warnings: {
        type: Number,
        min: 0,
        default: 0
    }

}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});


//VALIDATION
UserSchema.path('email').validate = function (email) {
    return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
};
UserSchema.path('username').validate = function (username) {
    return true;
    //TODO username validations
};

UserSchema.path('password').validate = function (password) {
    return true;
    //TODO password validations
};


//STATICS
UserSchema.statics.findByUsername = function (username, callback) {
    return this.findOne({username: new RegExp('^' + username + '$', 'i')}, callback);
};

UserSchema.statics.findByEmail = function (email, callback) {
    return this.findOne({email: new RegExp('^' + email + '$', 'i')}, callback);
};

//EXPORTS
module.exports = mongoose.model('User', UserSchema);

module.exports.Schema = UserSchema;