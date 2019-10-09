var request = require('request');

function makeInitialRequest(assignee) {
    var options = {
        method: 'GET',
        url: `https://team-tbd.atlassian.net//rest/api/3/search?jql=assignee=${assignee}`,
        auth: { username: 'adrian_santos@ultimatesoftware.com', password: 'lDLHEtSanPJNQbsXjEndE186' },
        headers: {
            'Accept': 'application/json'
        }
    }
    return request(initialByAssigneeOption(assignee), function (error, response, body) {
    if (error) throw new Error(error);
    console.log("response: " + response);
    console.log("body: " + body);
    });
}

module.exports = (app) => {

}