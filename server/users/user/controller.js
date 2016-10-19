/**
 * Created by Jens on 12-Oct-16.
 */
var winston = require('winston');
var Model = require('./model');
var Controller = this;

module.exports.registerUser = function (data, callback) {
    var newUser = new Model(data);
    var result = '';
    newUser
        .save()
        .exec(function (err) {
            if (err) {
                winston.error(err);
            } else {
                //FIXME JWT HERE
                result = newUser;
            }
            callback(result);
        });
};

module.exports.authenticate = function (identifier, pwd) {
    //FIXME IMPLEMENT
};

module.exports.getUsers = function (limit, skip, callback) {
    var result = '';
    Model
        .find()
        .skip(skip)
        .limit(limit)
        .exec(function (err, users) {
            if (err) {
                winston.error(err);
            } else {
                if (!users || !users.length) {
                    result = 404;
                } else {
                    result = users;
                }
            }
            callback(result);
        });
};

module.exports.getUser = function (id, callback) {
    Model
        .findById(id)
        .exec(function (err, user) {
            getResult(err, user, callback);
        });
};

module.exports.getUserByName = function (username, callback) {
    Model
        .findOne({username: new RegExp('^' + username + '$', 'i')})
        .exec(function (err, user) {
            getResult(err, user, callback);
        });
};

module.exports.getUserByEmail = function (email, callback) {
    var result = '';
    Model
        .findOne({email: new RegExp('^' + email + '$', 'i')})
        .exec(function (err, user) {
            getResult(err, user, callback);
        });
};


module.exports.updateUser = function (id, updated, callback) {
    Controller
        .getUser(id)
        .exec(function (found) {
            if (!isNaN(found)) {
                callback(found);
            } else {
                var updUser = found;
                Object.assign(updUser, updated);
                Controller.registerUser(updUser, function (result) {
                    callback(result);
                });
            }
        });
};

module.exports.deleteUser = function (id, callback) {
    var result = '';
    Model
        .findByIdAndRemove(id)
        .exec(function (err) {
            if (err) {
                winston.error(err);
            } else {
                result = id;
            }
            callback(result);
        });
};

function getResult(err, value, callback) {
    var result = '';
    if (err) {
        winston.error(err);
    } else {
        if (!value) {
            result = 404;
        } else {
            //FIXME JWT HERE
            result = value;
        }
    }
    callback(result);
};