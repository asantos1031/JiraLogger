const story = require('../../models/story');
const initialCollector = require('./initialJiraDataCollector');
var request = require('request');

module.exports = (app) => {


    app.get("/api/story", async(req,res,next) => {
        var options = {
            method: 'GET',
            url: `https://team-tbd.atlassian.net//rest/api/3/search?jql=assignee=${req.body.assignee}`,
            auth: { username: 'adrian_santos@ultimatesoftware.com', password: 'lDLHEtSanPJNQbsXjEndE186' },
            headers: {
                'Accept': 'application/json'
            }
        }
        request(options, function (error, response, body) {
            if(error) throw Error
            res.body = body;
        }).then()
    })

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