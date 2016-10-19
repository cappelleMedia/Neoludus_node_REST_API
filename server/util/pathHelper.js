/**
 * Created by Jens on 17-Oct-16.
 */
var config = require('../config');

function PathHelper() {

}

PathHelper.prototype.getPath = function (type, appendix) {
    if (config.basepaths[type]) {
        return config.basepaths[type] + '/' + appendix;
    }else {
        return new Error('type ' + type + ' does not exist!');
    }
};

module.exports = PathHelper;