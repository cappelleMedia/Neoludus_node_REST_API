/**
 * Created by Jens on 12-Oct-16.
 */
var base = "/users";
var Controller = require('./controller');

module.exports = function (app) {

    app.post(base, function (req, res) {
        Controller.addUser(req.body, function (response) {
            respond(response, res);
        });
    });

    app.get(base + '/paged/:limit/:skip?', function (req, res) {
        Controller.getUsers(parseInt(req.params.limit), parseInt(req.params.skip), function (response) {
            respond(response, res);
        })
    });

    app.get(base, function (req, res) {
        Controller.getUsers(0, 0, function (response) {
            respond(response, res);
        })
    });

    app.get(base + '/:id', function (req, res) {
        Controller.getUser(req.params.id, function (response) {
            respond(response, res);
        });
    });

    app.get(base + '/username/:username', function (req, res) {
        Controller.getUserByName(req.params.username, function (response) {
            respond(response, res);
        });
    });

    app.get(base + '/email/:email', function (req, res) {
        Controller.getByEmail(req.params.email, function (response) {
            respond(response, res);
        });
    });


    app.put(base + '/:id', function (req, res) {
        Controller.updateUser(req.params.id, req.body, function (response) {
            respond(response, res);
        });
    });

    app.delete(base + '/:id', function (req, res) {
        Controller.deleteUser(req.params.id, function (response) {
            respond(response, res);
        });
    });

};

function respond(response, res) {
    if (response) {
        if (isNaN(response)) {
            res.json(response);
        } else {
            res.status(response).end();
        }
    } else {
        res.status(500).end();
    }
}