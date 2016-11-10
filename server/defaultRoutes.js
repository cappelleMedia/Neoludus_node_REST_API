/**
 * Created by Jens on 04-Nov-16.
 */
module.exports = function (app) {
    app.get('/api', function (req, res) {
        //suply documentation with json
        res.json({
            "info": "The root for the neoludus api"
        });
    });
    app.get('/assets', function(req, res){
        //suply documentation with json
        res.json({
            "info": "The root for neoludus assets"
        });
    })
    app.get('*', function (req, res) {
        res.redirect('/api');
    });
}