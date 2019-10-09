const story = require('../../models/story');
var request = require('request');
const { makeInitialRequest, createJiraTickets } = require('../helpers/initialJiraDataCollector');
const authenticate = require("../middlewares/authenticate");

module.exports = (app) => {

    app.get("/api/story/:userName", authenticate, (req,res) => {
        story.find( {'assignees': req.params.userName})
        .exec()
        .then(doc => {
            if(doc.length == 0) res.status(200).json("No stories for this user");
            else res.json(doc)
        })
        .catch(err => {
            res.status(404).json("Document was not found");
            next(err)
        })
    })
}