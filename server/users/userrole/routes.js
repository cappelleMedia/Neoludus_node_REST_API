/**
 * Created by Jens on 27-Oct-16.
 */
var ControllerClass = require('./controller');
var helper = require('../../util/routerHelper');

module.exports = function (app, base) {
    var controller = new ControllerClass();
    require('../../util/bases/baserouter')(app, base, controller);
    app.get(base + '/accessFlag/:flag', function (req, res) {
        controller.getByFlag(req.params.flag, function (err, response) {
            helper.respond(err, response, res);
        });
    });
}