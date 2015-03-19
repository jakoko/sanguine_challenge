var express = require('express');
var app     = express();

var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/nursedatabase');

var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');


// Schemas
var Nurse       = require('./models/nurse.js');
var Schedule    = require('./models/schedule.js');

// Access to files in html
app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.json());

// Routes
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

            console.log('Schedule updated!');
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
            console.log("the sub doc was removed");
        })
    });

    response.json({ message: "Success"});
}); // End of app.delete



app.listen(8080);






    // var newNurse = Nurse({
    //   name: 'Peter Quill',
    //   username: 'starlord55',
    //   password: 'password'
    // });

    // // save the user
    // newNurse.save(function(err) {
    //   if (err) throw err;

    //   console.log('User created!');
    // });

    // var newSchedule = Schedule({
    //     beginTime: 1200,
    //     endTime: 1330
    // });


    // var exisitingNurse;
    // Nurse.findOne({name: "Peter Quill"}, function(err, data) {

    //     exisitingNurse = data;
    //     exisitingNurse.schedules.push(newSchedule);
        
    //     console.log(exisitingNurse);

    //     exisitingNurse.save(function(err) {
    //       if (err) throw err;

    //       console.log('User created!');
    //     });
    // });