/**
 * Created by Jens on 31-Oct-16.
 */
var pathHelper = require('path');
var winston = require('winston');
var baseDir = pathHelper.join(__dirname, '/assets/');
var base = '/assets/'
module.exports = function (app) {
    app.get(base + 'images/:name', function (req, res) {
        let baseExtend = baseDir + 'images/design/';
        let options = {
            root: baseExtend,
            headers: {
                'x-timestamp': Date.now(),
                'x-sent':true
            }
        };
        let filename = req.params.name;
        res.sendFile(filename, options, function(err){
            if(err){
                winston.error(err);
                res.sendStatus(404);
            } else {
                winston.info(filename + ' send successfully');
            }
        });
    });
};
