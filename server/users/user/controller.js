/**
 * Created by Jens on 12-Oct-16.
 */
"use strict"
var BaseController = require('../../util/bases/basecontroller');
var UserRoleService = require('../userrole/model');
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
                UserRoleService.findOne({accessFlag: -999})
                    .exec(function (err, role) {
                        next(err, role);
                    });
            },
            function (userrole, next) {
                var newUser = null;
                data._userRole = userrole._id;
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
                callback(err, user);
            } else {
                me.populateUser(err, user, callback);
            }
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

    getAll(limit, skip, callback) {
        let me = this;
        super.getAll(limit, skip, function (err, users) {
            me.populateUser(err, users, callback);
        });
    }

    getOne(id, callback) {
        let me = this;
        super.getOne(id, function (err, user) {
            me.populateUser(err, user, callback);
        });
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

    populateUser(err, user, callback) {
        if (!err && isNaN(user)) {
            Model
                .populate(user, [
                    {
                        path: '_avatar',
                        model: 'Avatar',
                        populate: {
                            path: '_image',
                            model: 'Image'
                        }
                    },
                    {
                        path: '_userRole',
                        model: 'UserRole'
                    }
                ], function (err2, userPop) {
                    callback(err2, userPop);
                })
        } else {
            callback(err, user);
        }
    }

}

module.exports = UserController;