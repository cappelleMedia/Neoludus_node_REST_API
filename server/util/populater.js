/**
 * Created by Jens on 17-Oct-16.
 */
var UsersService = require('../users/user/model');
var ImagesService = require('./image/model');
var AvatarsService = require('../users/avatar/model');
var AchievementsService = require('../users/achievement/model');
var UserRolesService = require('../users/userrole/model');
var pathhelper = require('./pathHelper');

var winston = require('winston');
var async = require('async');

function Populater() {

}

Populater.prototype.populate = function () {
    ImagesService.findOne().exec(function (err, image) {
        if (!image) populateImages();
    });
    AvatarsService.findOne().exec(function (err, avatar) {
        if (!avatar) populateAvatars();
    });
    UserRolesService.findOne().exec(function (err, userRole) {
        if (!userRole) populateUserRoles();
    });
    AchievementsService.findOne().exec(function (err, achievement) {
        if (!achievement) populateAchievements();
    });
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