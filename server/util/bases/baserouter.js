/**
 * Created by Jens on 19-Oct-16.
 */
var helper = require('../routerHelper');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function (app, base, Controller) {
    app.post(base, function (req, res) {
        Controller.addObj(req.body, function (err, response) {
            helper.respond(err, response, res);
        });
    });

    app.get(base, function (req, res) {
        Controller.getAll(0, 0, function (err, response) {
            helper.respond(err, response, res);
        });
    });

    app.get(base + '/paged/:limit/:skip?', function (req, res) {
        Controller.getAll(parseInt(req.params.limit), parseInt(req.params.skip), function (err, response) {
            helper.respond(err, response, res);
        })
    });

    app.get(base + '/:id', function (req, res) {
        if (!req.params.id || !isValidObjId(req.params.id)) {
            //TO HELP DEVELOPERS DEBUG
            helper.respond(null, 400, res, '/' + req.params.id + '/' + ' is not a valid id');
        } else {
            Controller.getOne(req.params.id, function (err, response) {
                helper.respond(err, response, res);
            });
        }
    });

    app.put(base + '/:id', function (req, res) {
        if (!req.params.id || !isValidObjId(req.params.id)) {
            //TO HELP DEVELOPERS DEBUG
            helper.respond(null, 400, res, '/' + req.params.id + '/' + ' is not a valid id');
        } else {
            Controller.updateObj(req.params.id, req.body, function (err, response) {
                helper.respond(err, response, res);
            });
        }
    });

    app.delete(base + '/:id', function (req, res) {
        if (!req.params.id || !isValidObjId(req.params.id)) {
            //TO HELP DEVELOPERS DEBUG
            helper.respond(null, 400, res, '/' + req.params.id + '/' + ' is not a valid id');
        } else {
            Controller.deleteObj(req.params.id, function (err, response) {
                helper.respond(err, response, res);
            });
        }
    });
};

function isValidObjId(id) {
    try {
        var validId = new ObjectId(id);
        if (id === validId.toString()) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}


