const httpErrors = require('httperrors');

module.exports = (schema) => {
    schema.post('findOne', function(res, next) {
      if (!res) {
        const error = httpErrors.NotFound('Value was not found');
        return next(error);
      }
      return next();
    });
  }