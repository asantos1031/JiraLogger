const authenticate = require('../middlewares/authenticate');
const story = require('../../models/story');

module.exports = (app) => {

    function getTotal(stories) {
        return stories.length;
    }

    function getAverageCycleTime(stories) {
        var diff = 0.0;
        stories.forEach(story => {
            if(story.startDate && story.endDate) {
                diff += Date.parse(story.endDate) - Date.parse(story.startDate);
            }
        });
        diff /= getTotal(stories);
        return diff / (3600000 * 24);
    }

    app.get("/api/performance/:userName", authenticate, async (req, res, next) => {
        story.find( {'assignees': req.params.userName})
        .exec().then( stories => {
            res.status(200).json({total:getTotal(stories), avgCycle:getAverageCycleTime(stories)})
        })

  });

};