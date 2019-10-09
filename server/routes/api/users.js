const user = require('../../models/user');

module.exports = (app) => {
    
    app.post("/api/user",(req,res,next) => {
        const newUser = new user({
            ...req.body
        });

        newUser.save()
        .then(document => res.status(201).json(document))
        .catch(err => next(err));
    })

    app.get("/api/user/:id",(req,res,next) => {
        
        user.findById(req.params.id).then(document =>
            res.json(document))
    })
}