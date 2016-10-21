/**
 * Created by Jens on 12-Oct-16.
 */
"use strict"
var BaseController = require('../../util/bases/basecontroller');
var Model = require('./model');

class UserController extends BaseController {
    constructor(model = Model) {
        super(model);
    }

    registerUser(data, callback) {
        //do register stuff first
        super.addObj(data, callback);
    }

    authenticate(identifier, pwd) {
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