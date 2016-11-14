/**
 * Created by Jens on 18-Oct-16.
 */
var ControllerClass = require('./controller');
var helper = require('../routerHelper');

module.exports = function (app, base) {
    var controller = new ControllerClass();
    require('../bases/baserouter')(app, base, controller);
    app.get(base + '/filename/:filename', function (req, res) {
        controller.getImageByFileName(req.params.filename, function (err, response) {
            helper.respond(err, response, res);
        });
    });
};