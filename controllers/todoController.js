var bodyParser = require('body-parser');

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick a kid'}];
// middleware for POST function
var urlencodedParser = bodyParser.urlencoded({extended: false});

// all the "controllers are held in this function like retreiving items, adding new items and deleting items."
module.exports = function(app){

    app.get('/todo', function(req, res){
        res.render('todo', {todos : data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo', function(req, res){

    });

}