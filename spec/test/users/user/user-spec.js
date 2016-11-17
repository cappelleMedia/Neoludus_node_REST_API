/**
 * Created by Jens on 17-Nov-16.
 */
var rootDir = '../../../../server/users/user/';
var UserModel = require(rootDir + 'model');
var UserController = require(rootDir + 'controller');

var userData = {
    "username": "Jens22",
    "email": "jens22@email.com",
    "dateTimePref": "dd/mm/yyyy",
    "avatarUrl": "tier1/avatar1.png"
};
describe("UserCreation", function () {
    it("User should be created and have a fields generated", function () {

        var user = new UserModel(userData);
        expect(user).toBeDefined();
        expect(user).not.toBeNull();
        expect(user.regKey).toBeDefined();
        expect(user.regKey).toBeNonEmptyString();
        expect(user.password).toBeDefined();
        expect(user.password).toBeNonEmptyString();
        expect(user.creation).toBeDate();
        expect(user.creation.getTime()).toBeLessThanOrEqualTo(Date.now());
        expect(user.creation.getTime()).toBeGreaterThanOrEqualTo(Date.now() - (60000));
        expect(user.lastLogin).toBeDate();
        expect(user.lastLogin.getTime()).toBeLessThanOrEqualTo(Date.now());
        expect(user.lastLogin.getTime()).toBeGreaterThanOrEqualTo(Date.now() - (60000));

    });
});

// describe("")