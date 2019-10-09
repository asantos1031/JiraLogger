var UUID = require('uuid/v1')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    jiraId: {type: String, index: true},
    link: String,
    assignees: [String],
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model("Story",StorySchema);