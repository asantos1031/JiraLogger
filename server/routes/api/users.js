const user = require('../../models/user');

module.exports = (app) => {
    
    app.post("/api/user",(req,res,next) => {
        user.findOneAndUpdate({'id':req.body.id}, {...req.body}, {new: true, upsert: true})
        .exec()
        .then(document => res.status(201).json(document))
        .catch(err => next(err));
    })

    app.get("/api/user/:id",(req,res,next) => {
        user.findOne({'id': req.params.id}).exec().then(document =>
            res.json(document))
    })
}