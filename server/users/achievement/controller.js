/**
 * Created by Jens on 26-Oct-16.
 */
"use strict";
const BaseController = require('../../util/bases/basecontroller');
const Model = require('./model');

class AchievementController extends BaseController {

    constructor(model = Model) {
        super(model);
    }

    // handleValidationErrors(){
    // }
}

module.exports = AchievementController;