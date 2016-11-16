/**
 * Created by Jens on 12-Oct-16.
 */
"use strict"
var BaseController = require('../../util/bases/basecontroller');
var Model = require('./model');
var Mailer = require('../../util/mailing/mailer');
var async = require('async');
var config = require('../../config/index');
var jwt = require('jsonwebtoken');

class UserController extends BaseController {
    constructor(model = Model) {
        super(model);
        this.mailer = new Mailer();
    }

    registerUser(data, callback) {
        let me = this;
        async.waterfall([
            function (next) {
                var newUser = null;
                data.accessFlag = -999;
                newUser = new Model(data);
                newUser.save(function (err) {
                    if (err) {
                        next(err, 400);
                    } else {
                        next(null, newUser);
                    }
                });
            },
            function (user, done) {
                let activationUrl = config.basepaths.clientUrl + '/pre-activation/' + user._id + '/' + user.regKey;
                let mailOpts = {
                    from: 'info@neoludus.com',
                    to: 'jens@itprosolutions.com',
                    subject: 'Neoludus activation',
                    activationUrl: activationUrl
                };
                me.mailer.sendFromTemplate('activation', mailOpts, function (err) {
                    done(err, user);
                });
            }

        ], function (err, user) {
            let errors = null;
            if (err) {
                if (err.name === "ValidationError") {
                    errors = me.handleValidationErrors(err);
                }
                Model.findByIdAndRemove(user._id).exec(function (err) {
                });
            }
            callback(err, user, errors);
        });
    }

    activate(data, callback) {
        let me = this;
        let errors = {};
        let status = 500;
        async.waterfall([
            function (next) {
                if (!data._id || !data.regKey || !data.password || !data.passwordRepeat) {
                    errors['dev'] = 'Request was missing important information';
                    status = 400;
                    next(status, status);
                } else {
                    me.getOne(data._id, function (err, val) {
                        next(err, val);
                    });
                }
            },
            function (user, next) {
                if(user.accessFlag > 0){
                    //Already activated
                    status = 401;
                    errors = null
                    next(status);
                }
                if ((user.regKey !== data.regKey)) {
                    //hide the error here
                    status = 401;
                    errors = null;
                    next(status, status);
                }
                if (data.password !== data.passwordRepeat) {
                    status = 400;
                    errors['dev'] = 'Password and password repeat did not match';
                    next(status, status);
                }
                user.accessFlag = 1;
                user.password = data.password;
                next(null, user);
            },
            function (updatedUser, done) {
                me.updateObj(updatedUser._id, updatedUser, function (err, user, validationErrors) {
                    errors = validationErrors;
                    status = user;
                    done(err)
                });
            }

        ], function (err) {
            callback(err, status, errors);
        });
    }

    authenticate(identifier, pwd, callback) {
        //TODO IMPLEMENT
        return callback(null, 501);
    }


    getUserByName(username, callback) {
        this.model
            .findOne({username: new RegExp('^' + username + '$', 'i')})
            .exec(function (err, user) {
                BaseController.getResult(err, user, callback);
            });
    }

    getUserByEmail(email, callback) {
        this.model
            .findOne({email: new RegExp('^' + email + '$', 'i')})
            .exec(function (err, user) {
                BaseController.getResult(err, user, callback);
            });
    }

    handleValidationErrors(err) {
        let errorsAll = {};
        if (err.errors.password) {
            errorsAll['password'] = err.errors.password.message;
        }
        if (err.errors.username) {
            errorsAll['username'] = err.errors.username.message;
        }
        if (err.errors.email) {
            errorsAll['email'] = err.errors.email.message;
        }
        if (err.errors.dateTimePref) {
            errorsAll['dateTimePref'] = err.errors.dateTimePref.message;
        }

        return errorsAll;
    }

}

module.exports = UserController;