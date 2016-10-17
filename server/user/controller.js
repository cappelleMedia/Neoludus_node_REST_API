/**
 * Created by Jens on 12-Oct-16.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var User = require('./model');
var controller = this;

module.exports.addUser = function (data, callback) {
    var newUser = new User(data);
    var json = "";
    newUser
        .save()
        .exec(function (err) {
            if (err) {
                json = {
                    "has-error": true,
                    "error-type": "2",
                    "error": err
                };
            } else {
                json = {
                    "has-error": false,
                    "data": newUser
                };
            }
            callback(json);
        });
};


module.exports.getUsers = function (limit, skip, callback) {
    var json = "";
    User
        .find()
        .skip(skip)
        .limit(limit)
        .exec(function (err, users) {
            if (err) {
                json = {
                    "has-error": true,
                    "error-type": "2",
                    "error": err
                };
            } else {
                if (users && users.length) {
                    json = {
                        "has-error": false,
                        "data": users
                    };
                } else {
                    json = {
                        "has-error": true,
                        "error-type": 0,
                        "error": "No user found!"
                    }
                }

            }
            callback(json);
        });
};

module.exports.getUser = function (id, callback) {
    var json = "";
    User
        .findById(id)
        .exec(function (err, user) {
            if (err) {
                json = {
                    "has-error": true,
                    "error-type": "2",
                    "error": err
                };
            } else if (!user) {
                json = {
                    "has-error": true,
                    "error-type": "0",
                    "error": "User not found"
                };
            }
            else {
                json = {
                    "has-error": false,
                    "data": user
                };
            }
            callback(json);
        });
};

module.exports.updateUser = function (id, updated, callback) {
    var json = "just testing";
    controller.getUser(id, function (found) {
        if (found['has-error']) {
            callback(found);
        } else {
            var updUser = found.data;
            _.merge(updUser, updated);
            controller.addUser(updUser, function (result) {
                callback(result);
            });
        }
    });
};

module.exports.deleteUser = function (id, callback) {
    var json = "";
    User.findByIdAndRemove(id, function (err) {
        if (err) {
            json = {
                "has-error": true,
                "error-type": "2",
                "error": err
            };
        } else {
            json = {
                "has-error": false,
                "data": id
            };
        }
        callback(json);
    });
}

module.exports.findBy = function (type, value, callback) {
    //FIXME check if values is filled in?
    switch (type) {
        case 'username':
            findByUsername(value, callback);
            return;
        case 'email':
            findByEmail(value, callback);
            return;
        default:
            var errorMsg = "Type " + type + " not found";
            var json = {
                "has-error": true,
                "error-type": "1",
                "error": errorMsg
            };
            callback('default');
            return;
    }
}


function findByUsername(username, callback) {
    var json = "";
    User.findByUsername(username, function (err, user) {
        console.log(user);
        if (err) {
            json = {
                "has-error": true,
                "error-type": "2",
                "error": err
            }
        } else {
            if (user) {
                json = {
                    "has-error": false,
                    "data": user
                };
            } else {
                json = {
                    "has-error": true,
                    "error-type": "0",
                    "error": "Username not found"
                };
            }
        }
        callback(json);
    });
}

function findByEmail(email, callback) {
    var json = "";
    User.findByEmail(email, function (err, user) {
        console.log(user);
        if (err) {
            json = {
                "has-error": true,
                "error-type": "2",
                "error": err
            }
        } else {
            if (user) {
                json = {
                    "has-error": false,
                    "data": user
                };
            } else {
                json = {
                    "has-error": true,
                    "error-type": "0",
                    "error": "Email not found"
                };
            }
        }
        callback(json);
    });
}
