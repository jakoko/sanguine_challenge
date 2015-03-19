var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var scheduleSchema   = new Schema({
    beginTime: { type: Number, required: true },
    endTime:   { type: Number, required: true },
    date:      { type: Date, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);