/**
 * Created by Jens on 27-Oct-16.
 */
const Controller = require('./controller');
const Helper = require('../../util/routerHelper');

module.exports = function (app, base) {
    var controller = new Controller();
    app.get(base + '/accessFlag/:flag', function (req, res) {
        controller.getByFlag(req.params.flag, function (err, response) {
            Helper.respond(err, response, res);
        });
    });
    require('../../util/bases/baserouter')(app, base, controller);
}