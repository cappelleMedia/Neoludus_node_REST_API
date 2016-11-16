/**
 * Created by Jens on 15-Oct-16.
 */
var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');
var winston = require('winston');
var bodyParser = require('body-parser');
var Populater = require('./testing/populater');
var Mail = require('./util/mailing/mailer');
var path = require('path');
var cors = require('cors');
var db;
var app;
var mail;

run();
function connect() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongo.uri, config.mongo.options);
    db = mongoose.connection;
    db.on('error', function () {
        winston.error('connection to mongodb failed');
    });
    db.once('open', function () {
        winston.info('Connected to mongodb!');
    });
    if (process.env.NODE_ENV !== 'production') {
        devSetup();
    }
}

function run() {
    mail = new Mail();
    app = express();
    app.set('view engine', 'ejs');
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.use(cors({
        exposedHeaders: config.cors.exposedHeaders, origin: config.cors.origins.map(function (origin) {
            return new RegExp(origin);
        })
    }));

    app.use(express.static(path.join(__dirname, '../client')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    require('./routes')(app);
    var server = app.listen(3001, function () {
        winston.info('Server running at http://localhost:3001');
    });


    connect();
    Populater.prototype.populate();

    // testing();
}

function devSetup() {
    var mailListener = require('./testing/mail/mailTesting')();
}

function testing() {
    var mailOptions = {
        from: 'info@neoludus.com',
        to: 'jens@itprosolutions.com',
        subject: 'testing',
        text: 'This is a test'
    }
    mail.verifyConnection();
    mail.sendEmail(mailOptions, function (err) {
        if (err) {
            winston.error(err);
        }
    });
}