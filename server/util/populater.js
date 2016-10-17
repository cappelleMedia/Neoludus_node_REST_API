/**
 * Created by Jens on 17-Oct-16.
 */
var UsersService = require('../user/model');
var ImagesService = require('../util/image');
var AvatarService = require('../avatar/model');
var winston = require('winston');
function Populater() {

}

Populater.prototype.populate = function() {
    ImagesService.findOne().exec(function(err, image){
       if(!image) {
           populateImages();
       }
    });
    AvatarService.findOne().exec(function(err, avatar){
        if(!avatar){
            populateAvatars();
        }
    });
};
function populateImages(){
    var img = new ImagesService({
        filename: 'filename',
        extension: 'png',
        alt: 'alt text'
    });
    img.save();
    var img2 = new ImagesService({
        filename: 'filename2',
        extension: 'png',
        alt: 'alt text'
    });
    img.save();
    var img3 = new ImagesService({
        filename: 'filename3',
        extension: 'png',
        alt: 'alt text'
    });
    img.save();
    var img4 = new ImagesService({
        filename: 'filename4',
        extension: 'png',
        alt: 'alt text'
    });
    img.save();
    winston.info('Images populated');
};
function populateAvatars(){
    var avatar1 = new AvatarService({

    });
    console.log('avatars populated');
};
function populateUserRoles(){
    console.log('populating userroles');
};
function populateAchievements(){
    console.log('populating achievements');
};

module.exports = Populater;