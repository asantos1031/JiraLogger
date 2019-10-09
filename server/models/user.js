var UUID = require('uuid/v1')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    id: {type: UUID, index: true},
    notes: [String]
});

module.exports = mongoose.model("User",UserSchema);