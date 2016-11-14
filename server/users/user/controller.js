/**
 * Created by Jens on 12-Oct-16.
 */
"use strict"
var BaseController = require('../../util/bases/basecontroller');
var Model = require('./model');
var Mailer = require('../../util/mailing/mailer');
var async = require('async');
var config = require('../../config/index');

class UserController extends BaseController {
    constructor(model = Model) {
        super(model);
        this.mailer = new Mailer();
    }

    addObj(data, callback) {
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
                let activationUrl = config.basepaths.siteUrl + '/pre-activation/' + user._id + '/' + user.regKey;
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
            if (err) {
                Model.findByIdAndRemove(user._id).exec(function (err) {
                });
            }
            callback(err, user);
        });
    }

    activate(data, callback) {
        //check regkey, valid pw etc
        //change userrole
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

}

module.exports = UserController;