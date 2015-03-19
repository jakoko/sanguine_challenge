var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Schedule is subdocument of Nurse
var Schedule    = require('./schedule.js');

var nurseSchema   = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    schedules: [Schedule.schema]
});

module.exports = mongoose.model('Nurse', nurseSchema);