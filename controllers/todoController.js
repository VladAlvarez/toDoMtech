var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connecting to database via mongoose
mongoose.connect('mongodb+srv://moronivalvarez:test@todo.arpcwvf.mongodb.net/?retryWrites=true&w=majority')

// schema for data, super simple just the property item and the string (what the user entered)
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick a kid'}];
// middleware for POST function
var urlencodedParser = bodyParser.urlencoded({extended: false});

// all the "controllers are held in this function like retreiving items, adding new items and deleting items."
module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from mongodb and passing it to view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // get data from view and add to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req, res){
        // deleteing requested item form mongodb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

}