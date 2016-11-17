/**
 * Created by Jens on 27-Oct-16.
 */
var MailDev = require('maildev');
var mailDev = new MailDev();
module.exports = function () {
    mailDev.listen();
}