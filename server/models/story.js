var UUID = require('uuid/v1')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    jiraID: {type: String, index: true},
    link: String,
    assignees: [String],
    startDate: String,
    endDate: String
});

module.exports = mongoose.model("Story",StorySchema);