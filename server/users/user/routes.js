/**
 * Created by Jens on 12-Oct-16.
 */
var winston = require('winston');
var ControllerClass = require('./controller');
var helper = require('../../util/routerHelper');

module.exports = function (app, base) {
    var controller = new ControllerClass();

    //BASE ROUTE OVERWRITES AND ADDONS
    app.post(base, function (req, res) {
        controller.registerUser(req.body, function (err, response, validationResult) {
            helper.respond(err, response, res, validationResult);
        })
    });
    app.get(base + '/username/:username', function (req, res) {
        controller.getUserByName(req.params.username, function (err, response) {
            helper.respond(err, response, res);
        });
    });
    app.get(base + '/email/:email', function (req, res) {
        controller.getUserByEmail(req.params.email, function (err, response) {
            helper.respond(err, response, res);
        });
    });
    app.put(base + '/activate', function (req, res) {
        controller.activate(req.body, function (err, response, errors) {
            helper.respond(err, response, res, errors);
        })
    });
    app.post(base + '/authenticate', function (req, res) {
        controller.authenticate(req.identifier, req.pwd, function (err, response) {
            helper.respond(err, response, res);
        });
    });

    //TODO passwordUpdate (check regkey + new passwords)
    //TODO passwordReset (mail)

    //BASE ROUTES
    require('../../util/bases/baserouter')(app, base, controller);
};
