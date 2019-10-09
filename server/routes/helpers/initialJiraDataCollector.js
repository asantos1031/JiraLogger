var request = require('request');

const makeInitialRequest = (req,res,next) => {
    var options = {
        method: 'GET',
        url: `https://team-tbd.atlassian.net//rest/api/3/search?jql=assignee=${req.body.assignee}`,
        auth: { username: 'adrian_santos@ultimatesoftware.com', password: 'lDLHEtSanPJNQbsXjEndE186' },
        headers: {
            'Accept': 'application/json'
        }
    }
    return request(options, function (error, response, body) {
        if(error) throw Error
        res.json(JSON.parse(body));
    });
};

module.exports = {
    makeInitialRequest
};