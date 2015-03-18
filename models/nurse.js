var mongoose = required('mongoose');
var Schema   = mongoose.Schema;

var nurse   = new Schema({
    name: String,
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});