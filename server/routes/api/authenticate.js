const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpErrors = require('httperrors');
const user = require('../../models/user');

module.exports = (app) => {
    app.post('/api/authenticate', (req, res, next) => {
        user.findOne({userName: req.body.userName}).exec().then(usr => {
            if (bcrypt.compareSync(req.body.password, usr.password) && req.body.userName === usr.userName ) {
                const token = jwt.sign({id: "superDuperSecret12345"}, req.app.get('key'), {expiresIn: '6h'});
                res.json({token});
            } else {
                const err = httpErrors(401);
                next(err);
            }
        })
        .catch( err => next(err))
    });
}