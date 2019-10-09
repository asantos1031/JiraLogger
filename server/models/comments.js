var UUID = require('uuid/v1')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    userID: {type: String, index: true},
    storyID: String,
    content: [String]
});

module.exports = mongoose.model("Comments",CommentsSchema);