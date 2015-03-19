var express = require('express');
var app     = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/nursedatabase');

app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.json());

// Schemas
var Nurse       = require('./app/models/nurse.js');
var Schedule    = require('./app/models/schedule.js');

// Load Seed data
var seedNurse   = require('./app/models/seedNurse.js');
seedNurse();

// Access to files in html
app.use("/public/javascripts", express.static(__dirname + '/public/javascripts'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));


/******************
* Routes
*******************/
// Serve up home.html at root
app.get('/', function(request, response) {
    response.sendFile(__dirname + "/public/views/home.html")
});

/******************
* Routes - API
*******************/
// Gather user through username
app.get("/api/nurses", function(request, response){
    Nurse.findOne({ username: request.query.username }, function(err, data) {
        if(err) { throw err; }
        else { response.json(data); }
    });
}); // End of app.get

// Add to user's schedules
app.put('/api/nurses', function(request, response) {
    Nurse.findOne({ username: request.body.username }, function(err, data) {
        if(err) throw err;
  
        var nurse = data;
        nurse.schedules.push(request.body.schedule);

        nurse.save(function(err) {
            if (err) {
                throw err;
            }
            else {
                // Return id to front-end
                var newSchedule = nurse.schedules[nurse.schedules.length - 1];
                response.json({ id: newSchedule._id })
            }
        });

    })
}); // End of app.put

// Delete a schedule
app.delete('/api/nurses', function(request, response) {
    Nurse.findOne({ username: request.query.username }, function(err, data) {
        var nurse = data;

        nurse.schedules.id(request.query.scheduleID).remove();

        nurse.save(function(err) {
            if(err) {
                throw err;
            }
            else {
                response.json({ message: "Success"});
            }
        })
    });

}); // End of app.delete

app.listen(8080);