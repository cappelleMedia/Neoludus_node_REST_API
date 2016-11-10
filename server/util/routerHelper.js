/**
 * Created by Jens on 19-Oct-16.
 */
var winston = require('winston');
module.exports.respond = function respond(err, response, res, errMsg) {
    if (err) {
        winston.error(err);
    }
    if (response) {
        if (isNaN(response)) {
            res.json(response);
        } else {
            res.status(response).json({errMsg});
        }
    } else {
        res.sendStatus(500);
    }
}
