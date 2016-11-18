/**
 * Created by Jens on 17-Oct-16.
 */
const winston = require('winston');
const async = require('async');

const UserModel = require('../users/user/model');
const AchievementModel = require('../users/achievement/model');
const UserRoleModel = require('../users/userrole/model');
const UserController = require('../users/user/controller');

let userController = new UserController();

function Populater() {
}

Populater.prototype.populate = function (cb) {
    async.waterfall([
        // function (next) {
        //     UsersService.remove({}, function (err) {
        //         next(null);
        //     });
        // },
        function (next) {
            UserRoleModel.findOne().exec(function (err, userRole) {
                if (!userRole) populateUserRoles();
                next(null);
            });
        },
        function (next) {
            AchievementModel.findOne().exec(function (err, achievement) {
                if (!achievement) populateAchievements();
                next(null);
            });
        },
        function (done) {
            UserModel.findOne().exec(function (err, user) {
                if (!user) populateUsers();
                done(null);
            });
        }
    ], function (err) {
        if (err) {
            handleError(err);
        }
        if (cb) {
            cb();
        }
    })
};

function populateUserRoles() {
    let notConfirmed = new UserRoleModel({
        displayName: 'Not Confirmed',
        accessFlag: -999
    });
    notConfirmed.save();
    let lifeBan = new UserRoleModel({
        displayName: 'Life Ban',
        accessFlag: -998
    });
    lifeBan.save();
    let bannished = new UserRoleModel({
        displayName: 'Banished',
        accessFlag: -1
    });
    bannished.save();
    let noob = new UserRoleModel({
        displayName: 'Noob',
        accessFlag: 1
    });
    noob.save();

    let freshman = new UserRoleModel({
        displayName: 'Freshman',
        accessFlag: 2,
        minKp: 100
    });
    freshman.save();

    let admin = new UserRoleModel({
        displayName: 'Admin',
        accessFlag: 999,
        minKp: 999999,
        minDp: 999999
    });
    admin.save();
    winston.info('userroles populated');
};

function populateAchievements() {
    let fileI = 0;
    async.waterfall([
            function (callback) {
                let achievement = new AchievementModel({
                    imageUrl: 'achievements/achievement' + fileI,
                    name: 'achievement' + fileI,
                    description: 'desc',
                    karmaReward: 10,
                    diamondReward: 0
                });
                achievement.save();
                fileI++;
                callback(null);
            },
            function (callback) {
                let achievement = new AchievementModel({
                    imageUrl: 'achievements/achievement' + fileI,
                    name: 'achievement' + fileI,
                    description: 'desc',
                    karmaReward: 20,
                    diamondReward: 1
                });
                achievement.save();
                fileI++;
                callback(null);
            },
            function (callback) {
                let achievement = new AchievementModel({
                    imageUrl: 'achievements/achievement' + fileI,
                    name: 'achievement' + fileI,
                    description: 'desc',
                    karmaReward: 50,
                    diamondReward: 2
                });
                achievement.save();
                fileI++;
                callback(null);
            },
            function (callback) {
                let achievement = new AchievementModel({
                    imageUrl: 'achievements/achievement' + fileI,
                    name: 'achievement' + fileI,
                    description: 'desc',
                    karmaReward: 10,
                    diamondReward: 0
                });
                achievement.save();
                fileI++;
                callback(null);
            }
        ],
        function (err) {
            if (err) {
                winston.info('achievements not populated');
                handleError(err);
            } else {
                winston.info('achievements populated');
            }
        });
};

function populateUsers() {
    try {
        createAdmin('devAdmin', 'jens@itprosolutions.be', 'DevAdmin001*');
        createUser('jens_regular', 'jens@ips.be');
    } catch (err) {
        if (err) {
            handleError(err);
        }
    }
}

function createAdmin(name, mail, pwd) {
    try {
        let admin = new UserModel({
            username: name,
            email: mail,
            password: pwd,
            dateTimePref: 'dd/mm/yyyy',
            accessFlag: 999,
            avatarUrl: 'tier1/avatar1.png'
        });
        admin.save(function(err){
            if(err){
                console.log(err);
            } else {
                winston.info('admin added');
            }
        });
    } catch (err) {
        winston.info('admin not added');
        handleError(err);
    }

}

function createUser(name, mail) {
    try {
        let user = {
            "username": name,
            "email": mail,
            "dateTimePref": "dd/mm/yyyy",
            "avatarUrl": "tier1/avatar1.png"
        }
        userController.registerUser(user, function (err, userRes) {
            if (err) {
                winston.info(name + ' not added');
                handleError(err);
            } else {
                winston.info(name + ' added');
            }
        })
    } catch (err) {
        winston.info(name + ' not added at error caught');
        handleError(err);
    }
}

function handleError(err) {
    winston.error('populater error');
    winston.error(err.message);
    // console.log(err);
}

module.exports = Populater;