var request = require('request');

module.exports = (app) => {

    function initialByAssigneeOption(assignee) {
        return {
            method: 'GET',
            url: `https://team-tbd.atlassian.net//rest/api/3/search?jql=assignee=${assignee}`,
            auth: { username: 'adrian_santos@ultimatesoftware.com', password: 'lDLHEtSanPJNQbsXjEndE186' },
            headers: {
                'Accept': 'application/json'
            }
        }
    };

    function makeInitialRequest(assignee){
        
        return request(initialByAssigneeOption(assignee), function (error, response, body) {
        if (error) throw new Error(error);
            console.log(response)
        });
    }
}