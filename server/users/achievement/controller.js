/**
 * Created by Jens on 26-Oct-16.
 */
"use strict";
var BaseController = require('../../util/bases/basecontroller');
var Model = require('./model');

class AchievementController extends BaseController {

    constructor(model = Model) {
        super(model);
    }

    addObj(data, callback) {
        //FIXME add 'save image' first here?
        //IF an avatar with this image already exists -> tell it already is present
        var me = this;
        super.addObj(data, function (err, avatar) {
            me.populateAchievement(err, avatar, callback);
        });
    }

    getAll(limit, skip, callback) {
        var me = this;
        super.getAll(limit, skip, function (err, avatars) {
            me.populateAchievement(err, avatars, callback);
        });
    }

    getOne(id, callback) {
        var me = this;
        super.getOne(id, function (err, avatar) {
            me.populateAchievement(err, avatar, callback);
        });
    }

    updateObj(id, updated, callback) {
        var me = this;
        super.updateObj(id, updated, function (err, avatar) {
            me.populateAchievement(err, avatar, callback);
        });
    }

    populateAchievement(err, achievement, callback) {
        if (!err && isNaN(achievement)) {
            Model.populate(achievement, {path: '_image'}, function (err2, achiePop) {
                callback(err2, achiePop);
            });
        } else {
            callback(err, achievement);
        }
    }
}

module.exports = AchievementController;