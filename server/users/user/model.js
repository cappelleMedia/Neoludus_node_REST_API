/**
 * Created by Jens on 11-Oct-16.
 */
var mongoose = require('mongoose');
var config = require('../../config/index');
var UserHelpClass = require('./userhelper');
var UserHelp = new UserHelpClass();
var Achievement = require('../achievement/model');
var uniqueValidation = require('mongoose-beautiful-unique-validation');
//MAIN
var UserSchema = new mongoose.Schema({
    __v: {
        type: Number
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: 'This username is already taken',
        validate: UserHelp.getUsernameValidators()
    },
    email: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
        unique: 'This email is already in use',
        validate: UserHelp.getEmailValidators()
    },
    password: {
        type: String,
        required: true,
        select: false,
        default: UserHelp.generateRegKey(64),
        validate: UserHelp.getPasswordValidators()
    },
    regKey: {
        type: String,
        required: true,
        min: 64,
        max: 64,
        default: UserHelp.generateRegKey(64)
    },
    dateTimePref: {
        type: String,
        required: true,
        validate: UserHelp.getDateTimeValidators()
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
    achievements: [Achievement.Schema],
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

UserSchema.plugin(uniqueValidation);

//METHODS

// PRE'S
UserSchema.post('validate', function () {
    if (this.isModified('password')) {
        this.password = UserHelp.encryptPwd(this.password);
    }
    this.regKey = UserHelp.generateRegKey(64);
});

//EXPORTS
module.exports = mongoose.model('User', UserSchema);

module.exports.Schema = UserSchema;