/**
 * Created by Jens on 26-Oct-16.
 */
module.exports = function (app) {
    require('./users/user/routes')(app, '/users');
    require('./util/image/routes')(app, '/images');
    require('./users/avatar/routes')(app, '/avatars');
    require('./users/achievement/routes')(app, '/achievements');
};