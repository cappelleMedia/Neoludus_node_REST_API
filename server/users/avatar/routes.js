/**
 * Created by Jens on 19-Oct-16.
 */
var ControllerClass = require('./controller');
var winston = require('winston');
var helper = require('../../util/routerHelper');

module.exports = function (app, base) {
    var Controller = new ControllerClass();
    app.get(base + '/max-tier/:tier', function (req, res) {
        if (!req.params.tier || isNaN(req.params.tier)) {
            helper.respond(null, 400, res, 'tier was missing or is not a number');
        } else {
            Controller.getAvatarsMaxTier(parseInt(req.params.tier), function (err, response) {
                helper.respond(err, response, res);
            });
        }
    });
    app.get(base + '/tier/:tier', function (req, res) {
        if (!req.params.tier || isNaN(req.params.tier)) {
            helper.respond(null, 400, res, 'tier was missing or is not a number');
        } else {
            Controller.getAvatarsStrictTier(parseInt(req.params.tier), function (err, response) {
                helper.respond(err, response, res);
            });
        }
    });
    require('../../util/bases/baserouter')(app, base, Controller);
};
