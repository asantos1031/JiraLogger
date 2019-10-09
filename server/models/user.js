var UUID = require('uuid/v1')
var mongoose = require('mongoose');
const httpErrors = require('httperrors');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {type: String, index: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    notes: [String]
});

UserSchema.post('findOneAndUpdate', function(res, next) {
    if (!res) {
      const error = httpErrors.NotFound('A user was not found with the information provided');
      return next(error);
    }
    return next();
  });

UserSchema.post('findOne', function(res, next) {
    if (!res) {
      const error = httpErrors.NotFound('A user was not found with the information provided');
      return next(error);
    }
    return next();
  });

module.exports = mongoose.model("User",UserSchema);