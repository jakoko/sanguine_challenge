var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var scheduleSchema   = new Schema({
    beginTime: { type: Number, required: true },
    endTime:   { type: Number, required: true },
    date:      { type: Date
        // , required: true 
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);var convertTimeToMilitary = function(time, hour, minute) {
    var militaryTime = "";

    // Convert minute
    if(minute === 0) {
        militaryTime = militaryTime + "00";
    }


};
