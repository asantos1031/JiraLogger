const comment = require('../../models/comments');
const authenticate = require('../middlewares/authenticate');

module.exports = (app) => {
  app.post("/api/comment/:userName/:storyId", authenticate, async (req, res, next) => {
    if(!req.body.content) throw Error;
    comment.findOneAndUpdate(
      { userName: req.params.userName,
       storyId: req.params.storyId },
      { $push: { content: req.body.content }},
      { new: true, upsert:true })
      .exec()
      .then(doc => res.status(200).json(doc.content))
      .catch(err => next(err));
  });

  app.get("/api/comment/:userName/:storyId", authenticate, async (req, res, next) => {
    comment.findOne(
      { userName: req.params.userName ,
       storyId: req.params.storyId })
      .exec()
      .then(comment => res.status(200).json(comment.content))
      .catch(err => next(err))
  });
};