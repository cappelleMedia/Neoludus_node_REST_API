/**
 * Created by Jens on 27-Oct-16.
 */
"use strict";
const emailTemplates = require('email-templates');
const NodeMailer = require('nodemailer');
const winston = require('winston');
const path = require('path');

const config = require('../../config/index');
const templatesBaseDir = path.join(__dirname, 'templates');
// const defaultFrom = 'info@neoludus.com';

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
        let emailTemplate = emailTemplates.EmailTemplate;
        let self = this;
        let templateDir = this.getTemplateDir(type, mailOpt);
        if (templateDir) {
            let template = new emailTemplate(templateDir);
            template.render(mailOpt, function (err, results) {
                if (err) {
                    callback(err);
                } else {
                    mailOpt.html = results.html;
                    mailOpt.text = results.text;
                    self.transporter.sendMail(mailOpt, function (err, responseStatus) {
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
                }
                return false;
            default:
                return 'template not found';
        }
    }

    checkRequiredFields(type, options) {
        switch (type) {
            case 'activation':
                return !!options.activationUrl;
            default:
                return false;
        }
    }

}

module.exports = Mailer;