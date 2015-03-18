var mongoose = required('mongoose');
var Schema   = mongoose.Schema;

var scheduleSchema   = new Schema({
    beginTime: { type: Number, required: true },
    endTime:   { type: Number, required: true },
    date:      { type: Date, required: true }
});

mongoose.model('schedule', scheduleSchema);