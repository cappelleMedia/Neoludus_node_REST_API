/**
 * Created by Jens on 18-Oct-16.
 */
var base = "/images";
var Controller = require('./controller');

module.exports = function (app) {

    app.post(base, function (req, res) {
       Controller.addImage(req.body, function(response) {
           respond(response, res);
       });
    });

    app.get(base, function(req, res) {
       Controller.getImages(0,0,function(response) {
           respond(response, res);
       });
    });

    app.get(base + '/:id', function(req, res) {
       Controller.getImage(req.params.id, function(response) {
            respond(response, res);
       });
    });

    app.get(base + '/filename/:filename', function(req, res) {
       Controller.getImageByFileName(req.params.filename, function(response) {
          respond(response, res);
       });
    });

    app.put(base + '/:id', function(req, res) {
       Controller.updateImage(req.params.id, req.body, function(response) {
           respond(response, res);
       });
    });

    app.delete(base + ':/id', function(req, res) {
       Controller.deleteImage(req.params.id, function(response) {
           respond(response, res);
       });
    });
};

function respond(response, res) {
    if (response) {
        if (isNaN(response)) {
            res.json(response);
        } else {
            res.status(response).end();
        }
    } else {
        res.status(500).end();
    }
}