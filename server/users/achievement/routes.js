/**
 * Created by Jens on 26-Oct-16.
 */

const Controller = require('./controller');
const winston = require('winston');
const helper = require('../../util/routerHelper');

module.exports = function (app, base) {
    let controller = new Controller();
    require('../../util/bases/baserouter')(app, base, controller);
}