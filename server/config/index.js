/**
 * Created by Jens on 11-Oct-16.
 */
const envFile = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const config = require('./config.' + envFile + '.json');

module.exports = config;