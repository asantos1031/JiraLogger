var UUID = require('uuid/v1')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    jiraID: {type: UUID, index: true},
    link: String,
    assignees: [UUID],
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model("Story",StorySchema);