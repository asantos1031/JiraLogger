var request = require('request-promise');
const story = require('../../models/story');

const makeInitialRequest = (assignee) => {
    var options = {
        method: 'GET',
        url: `https://team-tbd.atlassian.net//rest/api/3/search?jql=assignee=${assignee}&expand=changelog`,
        auth: { username: 'adrian_santos@ultimatesoftware.com', password: 'lDLHEtSanPJNQbsXjEndE186' },
        headers: {
            'Accept': 'application/json'
        }
    }
    return request(options)
        .then(body => JSON.parse(body));
};

function createJiraTickets(body) {
    var jiraStoryList = [];

    body.issues.forEach( (element, i) => {
        jiraStoryList[i] = new story({
            jiraID: element.key,
            link: `https://team-tbd.atlassian.net/jira/software/projects/JIL/boards/1?selectedIssue=${element.key}`,
            assignees: getAssignees(element, element.fields.assignee.key),
            startDate: getStartDate(element),
            endDate: getEndDate(element)
        })
    });
    return jiraStoryList;
}

function getStartDate(issue){
    var startDate;
    issue.changelog.histories.forEach( history => {
        history.items.forEach( item => {
            if(item.field === "status"){
                if(item.toString === "In Progress"){
                    if(startDate){
                        if(Date.parse(startDate) < Date.parse(history.created)){
                            startDate = history.created;
                        }
                    }
                    else startDate = history.created;
                }
            }
        })
    })
    return startDate || null;
}

function getEndDate(issue){
    var endDate;
    issue.changelog.histories.forEach( history => {
        history.items.forEach( item => {
            if(item.field === "status"){
                if(item.toString === "Done"){
                    if(endDate){
                        if(Date.parse(endDate) < Date.parse(history.created)){
                            endDate = history.created;
                        }
                    }
                    else endDate = history.created;
                }
            }
        } )
    })
    return endDate || null;
}

function getAssignees(issue, myself){
    var assignee = [myself];
    issue.changelog.histories.forEach( history => {
        history.items.forEach( item => {
            if(item.field === "assignee"){
                if(item.to && item.to != myself){
                    if(!assignee.includes(item.to)) assignee.push(item.to)
                }
            }
        } )
    })
    return assignee;
}

module.exports = {
    makeInitialRequest,
    createJiraTickets
};