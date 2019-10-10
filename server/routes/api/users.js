const user = require("../../models/user");
const authenticate = require("../middlewares/authenticate");
const bcrypt = require("bcrypt");
const { makeInitialRequest, createJiraTickets } = require('../helpers/initialJiraDataCollector');
const story = require('../../models/story');

module.exports = app => {
  app.post("/api/user", async (req, res, next) => {
    user
      .findOne({ userName: req.body.userName })
      .exec()
      .then(() => res.status(409).json("User already exists"))
      .catch(async () => {
        var encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        var usr = new user(req.body);
        usr.password = encryptedPassword;
        var initial = await makeInitialRequest(req.body.userName);
        createJiraTickets(initial).forEach( async element => {
            await element.save();
        });

        usr
          .save()
          .then(doc => {
            const { password, ...rest } = doc._doc;
            res.status(201).json(rest);
          })
          .catch(err => next(err));
      });
  });

  app.get("/api/user/refresh/:userName", authenticate, async (req, res, next) => {
    user
      .findOne({ userName: req.params.userName })
      .exec()
      .then(async () => {
        var initial = await makeInitialRequest(req.params.userName);
        createJiraTickets(initial).forEach( async element => {
            const {_id, ...rest} = element;
            const doc = rest._doc;
            delete doc._id;
            await story.findOneAndUpdate({jiraID: element.jiraID}, doc, { upsert: true}).exec()
        });
        res.status(200).json();
      })
      .catch( err => next(err));
  });

  app.put("/api/user/:userName", authenticate, (req, res, next) => {
    user
      .findOneAndUpdate(
        { userName: req.params.userName },
        { $push: { notes: req.body.notes } },
        { new: true }
      )
      .exec()
      .then(doc => res.status(200).json(doc.notes))
      .catch(err => next(err));
  });

  app.get("/api/user/:userName", authenticate, (req, res, next) => {
    user
      .findOne({ userName: req.params.userName })
      .exec()
      .then(usr => {
        const { password, ...rest } = usr._doc;
        res.status(200).json(rest);
      })
      .catch(err => next(err));
  });
};
