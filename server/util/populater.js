/**
 * Created by Jens on 17-Oct-16.
 */
var UsersService = require('../users/user/model');
var ImagesService = require('./image/model');
var AvatarsService = require('../users/avatar/model');
var UserRolesService = require('../users/userrole/model');
var winston = require('winston');

var pathhelper = require('./pathHelper');

function Populater() {

}

Populater.prototype.populate = function () {
    ImagesService.findOne().exec(function (err, image) {
        if (!image) {
            populateImages();
        }
    });
    AvatarsService.findOne().exec(function (err, avatar) {
        if (!avatar) {
            populateAvatars();
        }
    });
    UserRolesService.findOne().exec(function(err, userRole){
       if(!userRole){
           populateUserRoles();
       }
    });
};

function populateImages() {
    var img = new ImagesService({
        filename: 'filename1',
        extension: 'png',
        assetType: 'avatars',
        alt: 'alt text'
    });
    img.save();
    var img2 = new ImagesService({
        filename: 'filename2',
        extension: 'png',
        assetType: 'avatars',
        alt: 'alt text'
    });
    img2.save();
    var img3 = new ImagesService({
        filename: 'filename3',
        extension: 'png',
        assetType: 'avatars',
        alt: 'alt text'
    });
    img3.save();
    var img4 = new ImagesService({
        filename: 'filename4',
        extension: 'png',
        assetType: 'avatars',
        alt: 'alt text'
    });
    img4.save();
    winston.info('Images populated');
};

function populateAvatars() {
    ImagesService.findByFileName('filename1', function (err, image) {
        if (err) {
            return winston.error(err);
        } else {
            var avatar = new AvatarsService({
                tier: 1,
                image: image
            });
            avatar.save();
        }

    });
    ImagesService.findByFileName('filename2', function (err, image) {
        if (err) {
            return winston.error(err);
        } else {
            var avatar = new AvatarsService({
                tier: 2,
                image: image
            });
            avatar.save();
        }

    });
    ImagesService.findByFileName('filename3', function (err, image) {
        if (err) {
            return winston.error(err);
        } else {
            var avatar = new AvatarsService({
                tier: 3,
                image: image
            });
            avatar.save();
        }

    });
    ImagesService.findByFileName('filename4', function (err, image) {
        if (err) {
            return winston.error(err);
        } else {
            var avatar = new AvatarsService({
                tier: 4,
                image: image
            });
            avatar.save();
        }

    });
    winston.info('avatars populated');
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

    console.log('achievements populated');
};

module.exports = Populater;