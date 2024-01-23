var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connecting to database via mongoose
mongoose.connect('mongodb+srv://moronivalvarez:test@todo.arpcwvf.mongodb.net/?retryWrites=true&w=majority')

// schema for data, super simple just the property item and the string (what the user entered)
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'get flowers'}).save()

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

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });

}