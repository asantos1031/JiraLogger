const jwt = require('jsonwebtoken');
const httpErrors = require('httperrors');

module.exports = (req, res, next) => {
    jwt.verify(req.headers['x-access-token'],
    req.app.get('key'), (err) => {
        if (err) {
            const error = httpErrors(401);
            next(error);
        } else {
            next();
        }
    })

}