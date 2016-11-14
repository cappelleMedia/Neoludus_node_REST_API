/**
 * Created by Jens on 11-Oct-16.
 */
var mongoose = require("mongoose");
var config = require("../../config/index");
var UserHelp = require("./user-utils");
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
        type: Date,
        required: true,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
        required: true,
        default: Date.now()
    },
    activeTime: {
        type: Number,
        min: 0,
        default: 0
    },
    accessFlag: {
        type: Number,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
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
   return UserHelp.prototype.isValidPassword(password);
};

//PRE'S
UserSchema.pre('save', function (done) {
    if (this.isModified('password')) {
        this.password = UserHelp.prototype.encryptPwd(this.password);
    }
    done();
});

UserSchema.pre('update', function(done){
   this.regKey = UserHelp.prototype.generateRegKey(64);
    done();
});

//EXPORTS
module.exports = mongoose.model('User', UserSchema);

module.exports.Schema = UserSchema;