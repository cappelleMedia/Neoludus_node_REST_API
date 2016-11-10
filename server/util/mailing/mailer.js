/**
 * Created by Jens on 27-Oct-16.
 */
"use strict";
var NodeMailer = require('nodemailer');
var config = require('../../config/index');
var winston = require('winston');
var EmailTemplate = require('email-templates');
var path = require('path');

var templatesBaseDir = path.join(__dirname, 'templates');
var defaultFrom = 'info@neoludus.com';

class Mailer {
    constructor() {
        this.nodemailer = NodeMailer;
        this.smtpConfig = config.smtpConfig;
        this.transporter = this.nodemailer.createTransport(this.smtpConfig);
    }


    verifyConnection() {
        this.transporter.verify(function (error, success) {
            if (error || !success) {
                winston.error('Nodemailer not ready: ' + error)
            }
            else {
                winston.info('Nodemailer ready for messages');
            }
        });
    }

    sendEmail(mailOpt, callback) {
        this.transporter.sendMail(mailOpt, function (err, inf) {
            callback(err);
        });
    }

    sendFromTemplate(type, mailOpt, callback) {
        let emailTemplate = EmailTemplate.EmailTemplate;
        let me = this;
        var templateDir = this.getTemplateDir(type, mailOpt);
        if (templateDir) {
            let template = new emailTemplate(templateDir);
            template.render(mailOpt, function (err, results) {
                if (err) {
                    callback(err);
                } else {
                    mailOpt.html = results.html;
                    mailOpt.text = results.text;
                    me.transporter.sendMail(mailOpt, function (err, responseStatus) {
                        if (err) {
                            callback(err);
                        } else {
                            winston.info(responseStatus);
                            callback(null);
                        }
                    });
                }
            });
        } else {
            callback(new Error('no Template dir found'));
        }
    }

    getTemplateDir(type, options) {
        switch (type) {
            case 'activation':
                if (this.checkRequiredFields(type, options)) {
                    return templatesBaseDir + '/activation';
                } else {
                    return false;
                }
            default:
                return 'template not found';
        }
    }

    checkRequiredFields(type, options) {
        switch (type) {
            case 'activation':
                return options.activationUrl ? true : false;
            default:
                return false;
        }
    }

}

module.exports = Mailer;