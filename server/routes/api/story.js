const story = require('../../models/story');

module.exports = (app) => {

    app.post("/api/story/",(req,res,next) => {
        story.findOneAndUpdate(
            {'jiraID': req.body.jiraID},
            {...req.body},
            {new: true, upsert: true}
        )
        .exec()
        .then(document => res.json(document))
    })

    app.get("/api/story/:id",(req,res) => {
        story.find( {'assignees': req.params.id})
        .exec()
        .then(document => {
            if(document.length == 0)res.status(404).json("Document was not found");
            else res.json(document)
        })
        .catch(err => {
            res.status(404).json("not found");
            next(err)
        })
    })
}