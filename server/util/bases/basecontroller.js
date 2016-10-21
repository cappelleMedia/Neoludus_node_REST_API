/**
 * Created by Jens on 19-Oct-16.
 */
"user strict"
class BaseController {
    constructor(model) {
        this.model = model;
    }

    addObj(data, callback) {
        var newObj = null;
        newObj = new this.model(data);
        newObj.save(function (err) {
            if (err) {
                return callback(err, 400);
            }
            callback(err, newObj);
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
        var me = this;
        this.getOne(id, function (err, found) {
            if (!isNaN(found)) {
                callback(err, found);
            } else {
                Object.assign(found, updated);
                me.addObj(found, function (err, result) {
                    callback(err, result);
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

    static getResult(err, value, callback) {
        if (!value) {
            callback(err, 404);
        } else {
            callback(err, value);
        }
    }
}

module.exports = BaseController;