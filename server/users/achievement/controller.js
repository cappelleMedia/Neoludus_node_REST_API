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
}

module.exports = AchievementController;