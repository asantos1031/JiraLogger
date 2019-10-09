const story = require('../../models/story');
var request = require('request');
const { makeInitialRequest } = require('../helpers/initialJiraDataCollector');

module.exports = (app) => {

    app.post("/api/story", makeInitialRequest);

    app.get("/api/story/:userName",(req,res) => {
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