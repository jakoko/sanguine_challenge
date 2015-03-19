var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var scheduleSchema   = new Schema({
    beginTime: { type: String, required: true },
    endTime:   { type: String, required: true },
    date:      { type: Date, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);