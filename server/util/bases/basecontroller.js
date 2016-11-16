/**
 * Created by Jens on 19-Oct-16.
 */
"user strict"
class BaseController {
    constructor(model) {
        this.model = model;
    }

    addObj(data, callback) {
        let me = this;
        let validationErrors = "";
        let newObj = null;
        newObj = new this.model(data);
        newObj.save(function (err) {
            if (err) {
                if(err.name === 'ValidationError'){
                    validationErrors = me.handleValidationErrors(err);
                }
                return callback(err, 400, validationErrors);
            }
            callback(err, newObj, null);
        });
    }

    getAll(limit, skip, callback) {
        this.model
            .find()
            .skip(skip)
            .limit(limit)
            .exec(function (err, objects) {
                if (err) {
                    callback(err, 500);
                } else {
                    if (!objects || !objects.length) {
                        callback(err, 404);
                    } else {
                        callback(err, objects);
                    }
                }
            });
    }

    getOne(id, callback) {
        this.model
            .findById(id)
            .exec(function (err, obj) {
                BaseController.getResult(err, obj, callback);
            });
    }

    updateObj(id, updated, callback) {
        let me = this;
        this.getOne(id, function (err, found) {
            if (!isNaN(found)) {
                callback(err, found);
            } else {
                Object.assign(found, updated);
                me.addObj(found, function (err, result) {
                    let errors = null;
                    if (err) {
                        if (err.name === "ValidationError") {
                            errors = me.handleValidationErrors(err);
                        }
                    }
                    callback(err, result, errors);
                });
            }
        });
    }

    deleteObj(id, callback) {
        this.model
            .findByIdAndRemove(id)
            .exec(function (err) {
                callback(err, id);
            });
    }

    handleValidationErrors(err){
        //should be overwritten by all subs
        throw TypeError('not implemented, should be implemented by subclass');
    }

    static getResult(err, value, callback) {
        if (!value) {
            callback(err, 404);
        } else {
            callback(err, value);
        }
    }
}

module.exports = BaseController;