/**
 * Created by Jens on 27-Oct-16.
 */
var BaseController = require('../../util/bases/basecontroller');
var Model = require('./model');

class UserRoleController extends BaseController {

    constructor(model = Model) {
        super(model);
    }

    getByFlag(flag, callback) {
        this.model
            .findOne({accessFlag: flag})
            .exec(function (err, userrole) {
                BaseController.getResult(err, userrole, callback);
            });
    }

    // handleValidationErrors() {
    //
    // }
}

module.exports = UserRoleController;