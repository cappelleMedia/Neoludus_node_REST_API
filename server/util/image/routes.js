/**
 * Created by Jens on 18-Oct-16.
 */
var ControllerClass = require('./controller');
var helper = require('../routerHelper');

module.exports = function (app, base) {
    var Controller = new ControllerClass();
    require('../bases/baserouter')(app, base, Controller);
    app.get(base + '/filename/:filename', function (req, res) {
        Controller.getImageByFileName(req.params.filename, function (err, response) {
            helper.respond(err, response, res);
        });
    });
};