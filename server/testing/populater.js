/**
 * Created by Jens on 17-Oct-16.
 */
var UsersService = require('../users/user/model');
var ImagesService = require('./../util/image/model');
var AvatarsService = require('../users/avatar/model');
var AchievementsService = require('../users/achievement/model');
var UserRolesService = require('../users/userrole/model');
var UserController = require('../users/user/controller');
var userController = new UserController();
var winston = require('winston');
var async = require('async');

function Populater() {
}

Populater.prototype.populate = function () {
    async.waterfall([
        function(next){
            UsersService.remove({}, function(err){
                next(null);
            });
        },
        function (next) {
            ImagesService.findOne().exec(function (err, image) {
                if (!image) populateImages();
                next(null);
            });
        },
        function (next) {
            AvatarsService.findOne().exec(function (err, avatar) {
                if (!avatar) populateAvatars();
                next(null);
            });
        },
        function (next) {
            UserRolesService.findOne().exec(function (err, userRole) {
                if (!userRole) populateUserRoles();
                next(null);
            });
        },
        function (next) {
            AchievementsService.findOne().exec(function (err, achievement) {
                if (!achievement) populateAchievements();
                next(null);
            });
        },
        function (done) {
            UsersService.findOne().exec(function (err, user) {
                if (!user) populateUsers();
                done(null);
            });
        }
    ], function(err){
        if(err){
            winston.error(err);
        }
    })
};

function populateImages() {
    addImages('avatars');
    addImages('achievements');
    winston.info('Images populated');
};

function populateAvatars() {
    let asset = 'avatars';
    let fileI = 0;
    async.waterfall([
            function (callback) {
                ImagesService.findByFileName(asset + fileI, function (err, image) {
                    if (err) {
                        callback(err);
                    } else {
                        var avatar = new AvatarsService({
                            _image: image,
                            tier: 1
                        });
                        avatar.save();
                        fileI++;
                        callback(null);
                    }

                });
            },
            function (callback) {
                ImagesService.findByFileName(asset + fileI, function (err, image) {
                    if (err) {
                        callback(err);
                    } else {
                        var avatar = new AvatarsService({
                            _image: image,
                            tier: 2
                        });
                        avatar.save();
                        fileI++;
                        callback(null);
                    }

                });
            },
            function (callback) {
                ImagesService.findByFileName(asset + fileI, function (err, image) {
                    if (err) {
                        callback(err);
                    } else {
                        var avatar = new AvatarsService({
                            _image: image,
                            tier: 3
                        });
                        avatar.save();
                        fileI++;
                        callback(null);
                    }

                });
            },
            function (callback) {
                ImagesService.findByFileName(asset + fileI, function (err, image) {
                    if (err) {
                        callback(err);
                    } else {
                        var avatar = new AvatarsService({
                            _image: image,
                            tier: 4
                        });
                        fileI++;
                        avatar.save();
                        callback(null, 'done');
                    }

                });
            },
        ],
        function (err, result) {
            if (err) {
                winston.info('avatars not populated');
                winston.error(err);
            } else {
                winston.info('avatars populated');
            }
        });
};

function populateUserRoles() {
    var notConfirmed = new UserRolesService({
        displayName: 'Not Confirmed',
        accessFlag: -999
    });
    notConfirmed.save();
    var lifeBan = new UserRolesService({
        displayName: 'Life Ban',
        accessFlag: -998
    });
    lifeBan.save();
    var bannished = new UserRolesService({
        displayName: 'Banished',
        accessFlag: -1
    });
    bannished.save();
    var noob = new UserRolesService({
        displayName: 'Noob',
        accessFlag: 1
    });
    noob.save();

    var freshman = new UserRolesService({
        displayName: 'Freshman',
        accessFlag: 2,
        minKp: 100
    });
    freshman.save();

    var admin = new UserRolesService({
        displayName: 'Admin',
        accessFlag: 999,
        minKp: 999999,
        minDp: 999999
    });
    admin.save();
    winston.info('userroles populated');
};

function populateAchievements() {
    let asset = 'achievements';
    let fileI = 0;
    async.waterfall([
            function (callback) {
                ImagesService.findByFileName(asset + fileI, function (err, image) {
                    if (err) {
                        callback(err);
                    } else {
                        var achievement = new AchievementsService({
                            _image: image,
                            name: 'achievent' + fileI,
                            description: 'desc',
                            karmaReward: 10,
                            diamondReward: 0
                        });
                        achievement.save();
                        fileI++;
                        callback(null);
                    }
                });
            },
            function (callback) {
                ImagesService.findByFileName(asset + fileI, function (err, image) {
                    if (err) {
                        callback(err);
                    } else {
                        var achievement = new AchievementsService({
                            _image: image,
                            name: 'achievent' + fileI,
                            description: 'desc',
                            karmaReward: 20,
                            diamondReward: 1
                        });
                        achievement.save();
                        fileI++;
                        callback(null);
                    }
                });
            },
            function (callback) {
                ImagesService.findByFileName(asset + fileI, function (err, image) {
                    if (err) {
                        callback(err);
                    } else {
                        var achievement = new AchievementsService({
                            _image: image,
                            name: 'achievent' + fileI,
                            description: 'desc',
                            karmaReward: 50,
                            diamondReward: 2
                        });
                        achievement.save();
                        fileI++;
                        callback(null);
                    }
                });
            },
            function (callback) {
                ImagesService.findByFileName(asset + fileI, function (err, image) {
                    if (err) {
                        callback(err);
                    } else {
                        var achievement = new AchievementsService({
                            _image: image,
                            name: 'achievent' + fileI,
                            description: 'desc',
                            karmaReward: 10,
                            diamondReward: 0
                        });
                        achievement.save();
                        fileI++;
                        callback(null);
                    }
                });
            },
        ],
        function (err) {
            if (err) {
                winston.info('achievements not populated');
                winston.error(err);
            } else {
                winston.info('achievements populated');
            }
        });
};

function populateUsers() {
    try {
        //createAdmin(999, 'jens_admin', 'jens@ips.be', 'DevAdmin001*');
        createUser('jens_regular', 'jens@ips.be');
    } catch (err) {
        if (err) {
            winston.error(err);
        }
    }
}

function createAdmin(name, mail, pwd) {
    async.parallel({
            userrole: function (callback) {
                UserRolesService
                    .findOne({accessFlag: 999})
                    .exec(function (err, userrole) {
                        callback(err, userrole);
                    });
            },
            avatar: function (callback) {
                AvatarsService
                    .findOne()
                    .exec(function (err, avatar) {
                        callback(err, avatar);
                    });
            }
        },
        function (err, results) {
            if (err) {
                winston.info('Admin not added');
                winston.error(err);
            } else {
                try {
                    var admin = new UsersService({
                        username: name,
                        email: mail,
                        password: pwd,
                        dateTimePref: 'dd/mm/yyyy',
                        _userRole: results.userrole,
                        _avatar: results.avatar
                    });
                    admin.save();
                    winston.info('admin added');
                } catch (err) {
                    winston.info('admin not added');
                    winston.error(err);
                }
            }
        });
}

function createUser(name, mail) {
    async.parallel({
            avatar: function (callback) {
                AvatarsService
                    .findOne()
                    .exec(function (err, avatar) {
                        callback(err, avatar);
                    });
            }
        },
        function (err, results) {
            if (err) {
                winston.info(name + ' not added');
                winston.error(err);
            } else {
                try {
                    var user = {
                        "username": name,
                        "email": mail,
                        "dateTimePref": "dd/mm/yyyy",
                        "_avatar": results.avatar._id
                    }
                    userController.addObj(user, function (err, userRes) {
                        if (err) {
                            winston.info(name + ' not added');
                            winston.error(err);
                        } else {
                            winston.info(name + ' added');
                        }
                    })
                } catch (err) {
                    winston.info(name + ' not added at error caught');
                    winston.error(err);
                }
            }
        });
}

function addImages(asset) {
    let fileI = 0;
    let img = new ImagesService({
        filename: asset + fileI,
        extension: 'png',
        assetType: asset,
        alt: 'alt text'
    });
    img.save();
    fileI++;
    let img2 = new ImagesService({
        filename: asset + fileI,
        extension: 'png',
        assetType: asset,
        alt: 'alt text'
    });
    img2.save();
    fileI++;
    let img3 = new ImagesService({
        filename: asset + fileI,
        extension: 'png',
        assetType: asset,
        alt: 'alt text'
    });
    img3.save();
    fileI++;
    let img4 = new ImagesService({
        filename: asset + fileI,
        extension: 'png',
        assetType: asset,
        alt: 'alt text'
    });
    img4.save();
    fileI++;
}


module.exports = Populater;