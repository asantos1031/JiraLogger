const user = require('../../models/user');
const authenticate = require('../middlewares/authenticate');
const httpErrors = require('httperrors');
const bcrypt = require('bcrypt');
module.exports = (app) => {

    app.post("/api/user", async (req,res,next) => {
        user.findOne({userName: req.body.userName}).exec()
        .then(doc => res.status(409).json("User already exists"))
        .catch(() => {
            var encryptedPassword = bcrypt.hashSync(req.body.password, 10);
            var usr = new user(req.body);
            usr.password = encryptedPassword;
    
            usr.save()
            .then(doc => res.status(201).json(doc))
            .catch(err => next(err));
        });
        })

    app.put("/api/user/:userName", authenticate, (req,res,next) => {
        user.findOneAndUpdate(
            {userName: req.params.userName},
            {$push: {notes: req.body.notes}}, 
            {new: true}
            )
        .exec()
        .then( doc => res.status(200).json(doc.notes))
        .catch(err => next(err));
    });

    app.get("/api/user/:userName", authenticate,(req,res,next) => {
        user.findOne({'userName': req.params.userName})
        .exec()
        .then(usr =>{
                var usrInfo = {
                    name: usr.name,
                    id: usr.id,
                    notes: usr.notes
                }
                res.status(200).json(usrInfo)
            })
        .catch(err => next(err))
    })
}