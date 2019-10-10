const authenticate = require('../middlewares/authenticate');

module.exports = (app) => {

    function getTotal(stories) {
        return stories.length;
    }
    app.get("/api/performance/:userName", authenticate, async (req, res, next) => {
        var stories = story.find( {'assignees': req.params.userName})
        .exec().then( doc => doc)

  });

};