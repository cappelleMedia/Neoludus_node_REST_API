/**
 * Created by Jens on 12-Oct-16.
 */
var winston = require('winston');
var ControllerClass = require('./controller');
var helper = require('../../util/routerHelper');

module.exports = function (app, base) {
    var controller = new ControllerClass();
    require('../../util/bases/baserouter')(app, base, controller);
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
};