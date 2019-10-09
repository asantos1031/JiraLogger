var request = require('request-promise');
const story = require('../../models/story');

const makeInitialRequest = (req,res,next) => {
    var options = {
        method: 'GET',
        url: `https://team-tbd.atlassian.net//rest/api/3/search?jql=assignee=${req.body.assignee}?expand=changelog`,
        auth: { username: 'adrian_santos@ultimatesoftware.com', password: 'lDLHEtSanPJNQbsXjEndE186' },
        headers: {
            'Accept': 'application/json'
        }
    }
    return request(options)
        .then(body => JSON.parse(body));
};

// function createJiraTickets(body) {
//     var jiraStoryList = [];

//     body.issues.forEach( (element, i) => {
//         jiraStoryList[i] = new story({
//             jiraId: element.key,
//             link: 'testLink.com',
//             assignees: element.fields.assignee.key,
//             startDate:
//         })
//     });

// }


module.exports = {
    makeInitialRequest
};