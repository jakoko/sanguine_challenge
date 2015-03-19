var express = require('express');
var app     = express();

var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/nursedatabase');

var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// Schemas
var Nurse       = require('./models/nurse.js');
var Schedule    = require('./models/schedule.js');

// Load Seed data
var seedNurse   = require('./models/seedNurse.js');
seedNurse();

// Access to files in html
app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

// Important code that I'm not quite sure how they work
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.json());


app.get('/', function(request, response) {
    response.sendFile(__dirname + "/views/home.html")
});

// API Related
app.get("/api/nurses", function(request, response){

    Nurse.findOne({ username: request.query.username }, function(err, data) {
        if(err) {
            response.send(err);
        }
        response.json(data);
    });
});

app.put('/api/nurses', function(request, response) {

    // Find user
    Nurse.findOne({ username: request.body.username }, function(err, data) {
        if(err) {
            response.send(err);
        }
  
        var nurse = data;

        // Add schedule
        nurse.schedules.push(request.body.schedule);

        nurse.save(function(err) {
            if (err) throw err;

            var newSchedule = nurse.schedules[nurse.schedules.length - 1];
            response.json({ id: newSchedule._id })
        });

    })
}); // End of app.put

app.delete('/api/nurses/schedule', function(request, response) {

    Nurse.findOne({ username: request.query.username }, function(err, data) {
        var nurse = data;

        nurse.schedules.id(request.query.scheduleID).remove();

        nurse.save(function(err) {
            if(err) throw err;

            response.json({ message: "Success"});
        })
    });

}); // End of app.delete

app.listen(8080);