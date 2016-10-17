/**
 * Created by Jens on 11-Oct-16.
 */
var envFile = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

var config = require('./config.'+envFile+'.json');

module.exports = config;