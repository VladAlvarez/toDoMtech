var express = require('express');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'))

// listen to port
app.listen(300);
console.log('You are listening on port 3000');