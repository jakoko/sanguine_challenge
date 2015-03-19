var Nurse       = require('./nurse.js');
var Schedule    = require('./schedule.js');

// Create two Nurse collections
var seedNurse = function() {
    Nurse.find({}, function(err, collection) {
        if(collection.length === 0) {

            var peterNurse = Nurse({
                name: 'Peter Quill',
                username: 'starlord'
            });
            var peterSchedule = Schedule({
                beginTime: 1200,
                endTime: 1330,
                date: new Date(2015, 1, 1)
            });
            peterNurse.schedules.push(peterSchedule);
            peterNurse.save(function(err) {
              if (err) throw err;
            });

            var joyNurse = Nurse({
                name: 'Nurse Joy',
                username: 'pinky'
            });
            var joySchedule1 = Schedule({
                beginTime: 900,
                endTime: 1000,
                date: new Date(2015, 5, 9)
            });
            var joySchedule2 = Schedule({
                beginTime: 1415,
                endTime: 1630,
                date: new Date(2015, 4, 11)
            });

            joyNurse.schedules.push(joySchedule1);
            joyNurse.schedules.push(joySchedule2);

            joyNurse.save(function(err) {
              if (err) throw err;
            });

        }
    });
}

module.exports = seedNurse;