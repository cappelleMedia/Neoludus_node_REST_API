/**
 * Created by Jens on 26-Oct-16.
 */

var ControllerClass = require('./controller');
var winston = require('winston');
var helper = require('../../util/routerHelper');

module.exports = function (app, base) {
    var Controller = new ControllerClass();
    require('../../util/bases/baserouter')(app, base, Controller);
}