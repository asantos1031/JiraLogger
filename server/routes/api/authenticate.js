const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpErrors = require('httperrors');

module.exports = (app) => {
    app.post('/api/authenticate', (req, res, next) => {
        if (bcrypt.compareSync(req.body.password, "$2b$10$6NmaXJA8y/xoE8NbKdQHbu4dB19gdtc6ULCSimqJzphtBBICLgZvO") && req.body.userName === "admin") {
            const token = jwt.sign({id: "superDuperSecret12345"}, req.app.get('key'), {expiresIn: '6h'});
            res.json({token});
        } else {
            const err = httpErrors(401);
            next(err);
        }
    });
}