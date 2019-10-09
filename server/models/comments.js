var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    userName: {type: String, index: true},
    storyId: String,
    content: [String]
});

CommentsSchema.index({ userName: 1, storyId: 1 }, { unique: true});

module.exports = mongoose.model("Comments", CommentsSchema);