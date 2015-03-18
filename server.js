var express = require('express');
var app     = express();

var mongoose  = require('mongoose');

// Access to files in html
app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + "/views/home.html")
});



app.listen(8080);