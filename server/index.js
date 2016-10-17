/**
 * Created by Jens on 15-Oct-16.
 */
var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');
var winston = require('winston');
var bodyParser = require('body-parser');
var Populater = require('./util/populater');

var db;
var app;

run();

function connect() {
    winston.log('connecting to mongodb');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongo.uri, config.mongo.options);
    db = mongoose.connection;
    db.on('error', function () {
        winston.error('connection to mongodb failed');
    });
    db.once('open', function () {
        winston.info('Connected to mongodb!');
    });
}

function run(){
    app = express();

    var UserController = require('./user/routes')(app);

    var server = app.listen(3001, function () {
        winston.info('Server running at http://localhost:3001');
    });


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    connect();
    Populater.prototype.populate();
}
