/**
 * Created by Jens on 17-Nov-16.
 */
const jasmine = require('jasmine');
const async = require('async');

const rootDir = '../../../../server/users/user/';
const UserModel = require(rootDir + 'model');
const config = require('../../../../server/config');
const ConnectionHandler = require('../../../../server/connections');
const Populater = require('../../../../server/dev/populater');


let connHandler = new ConnectionHandler();
let populater = new Populater();
let usernameAccepted = "Jens22";
let emailAccepted = "jens22@gmail.com";
let dateTimePrefAccepted = "dd/mm/yyyy";
let avatarUrlAccepted = "tier1/avatar1.png";
let validUserData = {
    "username": usernameAccepted,
    "email": emailAccepted,
    "dateTimePref": dateTimePrefAccepted,
    "avatarUrl": avatarUrlAccepted
}
let savedIds = [];

beforeAll(function (done) {
    connHandler.mongoSetup();
    connHandler.mailSetup();
    populater.populate(done);
});

describe("UserCreation", function () {
    it("Should create a User and have a fields generated", function () {
        let userData = {
            "username": usernameAccepted,
            "email": emailAccepted,
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted,
        };
        let user = new UserModel(userData);
        let now = Date.now();

        expect(user).toBeDefined();
        expect(user).not.toBeNull();
        expect(user.regKey).toBeDefined();
        expect(user.regKey).toBeNonEmptyString();
        expect(user.regKey.length).toBe(64);
        expect(user.password).toBeDefined();
        expect(user.password).toBeNonEmptyString();
        expect(user.creation).toBeDate();
        expect(user.creation.getTime()).toBeLessThanOrEqualTo(now);
        expect(user.creation.getTime()).toBeGreaterThanOrEqualTo(now - (60000));
        expect(user.lastLogin).toBeDate();
        expect(user.lastLogin.getTime()).toBeLessThanOrEqualTo(now);
        expect(user.lastLogin.getTime()).toBeGreaterThanOrEqualTo(now - (60000));
        expect(user.accessFlag).toBe(-999);
    });
});

describe("UserSave", function () {
    let userData = {};
    it("Should throw error if username is missing", function (done) {
        userData = {
            "email": emailAccepted,
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        let userNoName = new UserModel(userData);
        userNoName.save(function (err) {
            if (!err) {
                fail('User saved without username');
                savedIds.push(userNoName._id);
            }
            done();
        });
    });

    it("Should throw error if username is too short", function (done) {
        userData = {
            "username": "ts",
            "email": emailAccepted,
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        let userUserNameTooShort = new UserModel(userData);
        userUserNameTooShort.save(function (err) {
            if (!err) {
                fail('User saved with username too short');
                savedIds.push(userUserNameTooShort._id);
            }
            done();
        });
    });

    it("Should throw error if username is too long", function (done) {
        userData = {
            "username": "ThisUsernameIsWayToLongForTheUsernameFieldWeCanNotAcceptThatSoThrowAnError",
            "email": emailAccepted,
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        let userUsernameTooLong = new UserModel(userData);
        userUsernameTooLong.save(function (err) {
            if (!err) {
                fail('User saved with username too long');
                savedIds.push(userUsernameTooLong._id);
            }
            done();
        });
    });

    it("Should throw error if username is already in use", function (done) {
        let userData = {
            "username": "duplicateName",
            "email": emailAccepted,
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        let userDupName1 = new UserModel(userData);
        userDupName1.save(function (err) {
            if (err) {
                console.log(err);
                done.fail('Could not save first user');
            } else {
                savedIds.push(userDupName1._id);
                userData["email"] = "theJeanz222@email.com";
                let userDupName2 = new UserModel(userData);
                userDupName2.save(function (err) {
                    if (!err) {
                        fail('User saved with username already in use');
                        savedIds.push(userDupName2._id);
                    }
                    done();
                })
            }
        });
    });

    it("Should throw error if username is reserved", function (done) {
        userData = {
            "username": config.validationConfig.reservedUsernames[0],
            "email": emailAccepted,
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        let userUsernameReserved = new UserModel(userData);
        userUsernameReserved.save(function (err) {
            if (!err) {
                fail('User saved with reserved username');
                savedIds.push(userUsernameReserved._id);
            }
            done();
        });
    });

    it("Should throw error if email is missing", function (done) {
        userData = {
            "username": usernameAccepted,
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        let userNoName = new UserModel(userData);
        userNoName.save(function (err) {
            if (!err) {
                fail('User saved without email');
                savedIds.push(userNoName._id);
            }
            done();
        });
    });

    it("Should throw error if email is already in use", function (done) {
        let userData = {
            "username": usernameAccepted,
            "email": "duplicateEmail@mail.com",
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        let userDupMail1 = new UserModel(userData);
        userDupMail1.save(function (err) {
            if (err) {
                done.fail('Could not save first user');
            } else {
                savedIds.push(userDupMail1._id);
                userData["username"] = usernameAccepted + "2";
                let userDupMail2 = new UserModel(userData);
                userDupMail2.save(function (err) {
                    if (!err) {
                        fail('User saved with email already in use');
                        savedIds.push(userDupMail2._id);
                    }
                    done();
                })
            }
        });
    });

    it("Should throw error if email is not a valid email", function (done) {
        let invalidMailUsers = [];
        userData = {
            "username": usernameAccepted,
            "email": "",
            "dateTimePref": dateTimePrefAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        userData["email"] = "wrongMail";
        let userInvalidMail1 = new UserModel(userData);
        invalidMailUsers.push(userInvalidMail1);

        userData["email"] = "wrongMail@";
        let userInvalidMail2 = new UserModel(userData);
        invalidMailUsers.push(userInvalidMail2);

        userData["email"] = "wrongMail@something";
        let userInvalidMail3 = new UserModel(userData);
        invalidMailUsers.push(userInvalidMail3);

        userData["email"] = "wrongMail.something";
        let userInvalidMail4 = new UserModel(userData);
        invalidMailUsers.push(userInvalidMail4);

        userData["email"] = "wrongMail.something@";
        let userInvalidMail5 = new UserModel(userData);
        invalidMailUsers.push(userInvalidMail5);

        userData["email"] = "wrongMail.something@somethingElse";
        let userInvalidMail6 = new UserModel(userData);
        invalidMailUsers.push(userInvalidMail6);

        async.each(invalidMailUsers, function (invalidMailUser, cb) {
            invalidMailUser.save(function (err) {
                if (!err) {
                    savedIds.push(invalidMailUser._id);
                    cb('User saved with invalid email: ' + invalidMailUser.email);
                } else {
                    if (err.name !== "ValidationError") {
                        cb(err);
                    } else {
                        cb();
                    }
                }
            });
        }, function (err) {
            if (err) {
                done.fail(err);
            } else {
                done();
            }
        });
    });

    it("Should throw error if dateTimePref is missing", function (done) {
        userData = {
            "username": usernameAccepted,
            "email": emailAccepted,
            "avatarUrl": avatarUrlAccepted
        };
        let userNoName = new UserModel(userData);
        userNoName.save(function (err) {
            if (!err) {
                fail('User saved without dateTimePref');
                savedIds.push(userNoName._id);
            }
            done();
        });
    });

    it("Should throw error if dateTimePref is invalid option", function (done) {
        userData = {
            "username": usernameAccepted,
            "email": emailAccepted,
            "dateTimePref": "notValidDTPref",
            "avatarUrl": avatarUrlAccepted
        };
        let userNoName = new UserModel(userData);
        userNoName.save(function (err) {
            if (!err) {
                fail('User saved with invalid dateTimePref');
                savedIds.push(userNoName._id);
            }
            done();
        });
    });

    it('Should save user if all parameters are valid', function (done) {
        let validUser = new UserModel(validUserData);
        validUser.save(function (err) {
            if (err) {
                done.fail(err);
            }
            savedIds.push(validUser._id);
            UserModel
                .findById(validUser._id)
                .select('+regKey +password')
                .exec(function (err, userResult) {
                    expect(userResult).not.toBeNull();
                    expect(userResult).toBeDefined();
                    expect(userResult.username).toEqual(validUser.username);
                    expect(userResult.password).toEqual(validUser.password);
                    expect(userResult.email).toEqual(validUser.email);
                    expect(userResult.regKey).toEqual(validUser.regKey);
                    expect(userResult.dateTimePref).toEqual(validUser.dateTimePref);
                    expect(userResult.creation).toEqual(validUser.creation);
                    expect(userResult.accessFlag).toEqual(validUser.accessFlag);
                    expect(userResult.avatarUrl).toEqual(validUser.avatarUrl);
                    done();
                })
        });
    });

    afterEach(function (done) {
        clean(done);
    });
});

describe("UserUpdate", function () {
    //should error if name exists and other id
    //should error if mail exists and other id
    //should error if invalid name, mail, pwd,
});

function clean(done) {
    if (savedIds.length) {
        for (let i = 0; i < savedIds.length; i++) {
            console.log('deleting ' + savedIds[i]);
            UserModel.findByIdAndRemove(savedIds[i], function (err) {
                done();
            });
        }
    } else {
        done();
    }
    savedIds = [];
}