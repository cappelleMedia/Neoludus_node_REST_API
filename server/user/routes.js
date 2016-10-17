/**
 * Created by Jens on 12-Oct-16.
 */
var _ = require('lodash');
var base = "/user";
var service = require('./controller');

module.exports = function (app) {

    app.post(base, function (req, res) {
        service.addUser(req.body, function (response) {
            res.json(response);
        });
    });

    app.get(base + '/paged/:limit/:skip?', function (req, res) {
        service.getUsers(parseInt(req.params.limit), parseInt(req.params.skip), function (response) {
            res.json(response);
        })
    });

    app.get(base, function (req, res) {
        service.getUsers(0, 0, function (response) {
            res.json(response);
        })
    });

    app.get(base + '/:id', function (req, res) {
        service.getUser(req.params.id, function (response) {
            res.json(response);
        });
    });

    app.get(base + '/:type/:value', function (req, res) {
        service.findBy(req.params.type, req.params.value, function (response) {
            res.json(response);
        });
    });

    app.put(base + '/:id', function (req, res) {
        service.updateUser(req.params.id, req.body, function (response) {
            res.json(response);
        })
    });

    app.delete(base + '/:id', function (req, res) {
        service.deleteUser(req.params.id, function (response) {
            res.json(response);
        })
    })

}