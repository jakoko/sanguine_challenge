var express = require('express');
var app     = express();

var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/nursedatabase');

// Schemas
var Nurse       = require('./models/nurse.js');
var Schedule    = require('./models/schedule.js');

// Access to files in html
app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));


// Routes
app.get('/', function(request, response) {
    response.sendFile(__dirname + "/views/home.html")
});


// API Related
app.get("/api/nurses", function(request, response){
    Nurse.findOne({ username: request.params.username }, function(err, data) {
        if(err) {
            response.send(err);
        }

        response.json(data);
    });
});



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