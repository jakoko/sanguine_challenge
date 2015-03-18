var mongoose = required('mongoose');
var Schema   = mongoose.Schema;

var nurseSchema   = new Schema({
    name: String,
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
});

mongoose.model('nurse', nurseSchema);