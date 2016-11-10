/**
 * Created by Jens on 26-Oct-16.
 */
module.exports = function (app) {
    //api routes
    let base = '/api/';
    require('./util/image/routes')(app, base + 'images');
    require('./users/user/routes')(app, base + 'users');
    require('./users/avatar/routes')(app, base + 'avatars');
    require('./users/achievement/routes')(app, base + 'achievements');
    require('./users/userrole/routes')(app, base + 'userroles');

    //asset routes
    require('./assetRoutes')(app);

    //default routes
    require('./defaultRoutes')(app);
};