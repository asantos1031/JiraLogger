const comment = require('../../models/comments');
const authenticate = require('../middlewares/authenticate');

module.exports = (app) => {
  app.post("/api/comment", authenticate, async (req, res, next) => {
    comment.findOne({ userName: req.body.userName, storyId: req.body.storyId }).exec()
      .then(() => res.status(409).json("Comments already exist for this user and story"))
      .catch(() => {
        const comment = new comment(req.body);
        comment.save()
          .then(doc => {
            res.status(201).json(doc)
          })
          .catch(err => next(err))
      });
  });

  app.put("/api/comment/:userName/:storyId", authenticate, async (req, res, next) => {
    comment.findOneAndUpdate(
      { userName: req.params.userName },
      { storyId: req.params.storyId },
      { $push: { content: req.body.content }},
      { new: true })
      .exec()
      .then(doc => res.status(200).json(doc.content))
      .catch(err => next(err));
  });

  app.get("/api/comment/:userName/:storyId", authenticate, async (req, res, next) => {
    comment.findOne(
      { userName: req.params.userName },
      { storyId: req.params.storyId })
      .exec()
      .then(comment => res.status(200).json(comment))
      .catch(err => next(err))
  });
};