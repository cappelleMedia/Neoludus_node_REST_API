/**
 * Created by Jens on 19-Oct-16.
 */
"use strict";
var BaseController = require('../../util/bases/basecontroller');
// var ImageController = require('../../util/image/controller');
var Model = require('./model');

class AvatarController extends BaseController {
    constructor(model = Model) {
        super(model);
    }

    addObj(data, callback) {
        //IF an avatar with this image already exists -> tell it already is present
        let me = this;
        super.addObj(data, function (err, avatar) {
            me.populateAvatar(err, avatar, callback);
        });
    }

    getAll(limit, skip, callback) {
        let me = this;
        super.getAll(limit, skip, function (err, avatars) {
            me.populateAvatar(err, avatars, callback);
        });
    }

    getOne(id, callback) {
        let me = this;
        super.getOne(id, function (err, avatar) {
            me.populateAvatar(err, avatar, callback);
        });
    }

    updateObj(id, updated, callback) {
        let me = this;
        super.updateObj(id, updated, function (err, avatar) {
            me.populateAvatar(err, avatar, callback);
        });
    }

    getAvatarsMaxTier(maxTier, callback) {
        this.model
            .find()
            .populate('_image')
            .where('tier').lte(maxTier)
            .sort('+tier')
            .exec(function (err, avatars) {
                if (err) {
                    callback(err, 500);
                } else {
                    if (!avatars || !avatars.length) {
                        callback(err, 404);
                    } else {
                        callback(err, avatars);
                    }
                }
            });
    }

    getAvatarsStrictTier(tier, callback) {
        this.model
            .find()
            .populate('_image')
            .where('tier').equals(tier)
            .exec(function (err, avatars) {
                if (err) {
                    callback(err, 500);
                } else {
                    if (!avatars || !avatars.length) {
                        callback(err, 404);
                    } else {
                        callback(err, avatars);
                    }
                }
            });
    }

    populateAvatar(err, avatar, callback) {
        if (!err && isNaN(avatar)) {
            Model.populate(avatar, {path: '_image'}, function (err2, avatarPop) {
                callback(err2, avatarPop);
            });
        } else {
            callback(err, avatar);
        }
    }
}

module.exports = AvatarController;