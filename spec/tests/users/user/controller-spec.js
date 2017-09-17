/**
 * Created by Jens on 21-Nov-16.
 */
const jasmine = require('jasmine');
const async = require('async');

const rootDir = '../../../../server/users/user/';
const UserModel = require(rootDir + 'model');
const UserController = require(rootDir + 'controller');
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

describe("UserCreate", function(){

});
describe("UserRead", function(){

});
describe("UserUpdate", function(){

});
describe("UserDelete", function(){

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