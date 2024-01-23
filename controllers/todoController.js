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

    app.get('/todo', async (req, res) => {
        // get data from mongodb and passing it to view
        try {
        const data = await Todo.find({});
            res.render('todo', {todos: data});
        } catch (err){
            console.log(err)
        } 
    });

    app.post('/todo', urlencodedParser, async(req, res) => {
        // get data from view and add to mongodb
        try {
        var newTodo = Todo(req.body).save();
        res.json(newTodo);
        } catch (err){
            console.log(err)
        } 
    });

    app.delete('/todo/:item', async(req, res) => {
        // deleteing requested item form mongodb
        try {
        const data = await Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne();
        res.json(data);
        } catch (err){
            console.log(err);
        }
    });

}