/**
 * Created by Jens on 11-Oct-16.
 */
var pwdChecker = require('zxcvbn');
var bcrypt = require('bcrypt-nodejs');
var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var crypto = require('crypto');
var validator = require('validator');
//FIXME MOVE HIGHER UP
var validationConfig = {
    'usernameMinLength': 4,
    'usernameMaxLength': 20,
    'reservedUsernames': [
        'admin',
        'super',
        'boss',
        'jens',
        'souf'
    ],
    'dateTimePrefs': [
        'dd/mm/yyyy',
        'mm/dd/yyyy',
        'yyyy/mm/dd'
    ]

}

class UserHelper {

    constructor() {
    }

    getPasswordValidators() {
        let validators = [
            {
                validator: this.isValidPassword,
                msg: 'Password is not strong enough'
            }
        ];
        return validators;
    }

    getUsernameValidators() {
        let validators = [
            {
                validator: this.usernameLengthValidator,
                msg: 'Username length should be between ' + validationConfig.usernameMinLength + ' and ' + validationConfig.usernameMaxLength
            },
            {
                validator: this.isUsernameAllowed,
                msg: 'This username is reserved'
            }
        ];
        return validators;
    }

    getEmailValidators(){
        let validators = [
            {
                validator: this.isEmailValidator,
                msg: 'This is not a valid email address'
            }
        ];
        return validators;
    }

    getDateTimeValidators(){
        let validators = [
            {
                validator : this.isValidDateFormat,
                msg: 'This is not a valid date format'
            }
        ];
        return validators;
    }

    //PASSWORD VALIDATION RULES
    isValidPassword(password) {
        return (pwdChecker(password).score >= 3);
    }

    //USERNAME VALIDATION RULES
    usernameLengthValidator(username) {
        return validator.isLength(username, {min: validationConfig.usernameMinLength, max: validationConfig.usernameMaxLength});
    }

    isUsernameAllowed(username) {
        return !validator.isIn(username, validationConfig.reservedUsernames);
    }

    //EMAIL VALIDATORS
    isEmailValidator(email){
        return validator.isEmail(email);
    }

    //DATE VALIDATORS
    isValidDateFormat(dateFormat){
        return validator.isIn(dateFormat, validationConfig.dateTimePrefs);
    }

    encryptPwd(password) {
        console.log('encrypting');
        var pwdEnc = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return pwdEnc;
    }

    generateRegKey(length) {
        let bytes = crypto.randomBytes(length);
        let result = new Array(length);
        for (var i = 0, j = length; i < j; i++)
            result[i] = chars[bytes[i] % chars.length];
        return result.join('');
    }

}
module.exports = UserHelper;