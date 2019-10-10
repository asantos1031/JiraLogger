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
            endDate: getEndDate(element),
            name: element.fields.summary,
            description: getDescription(element)
        })
    });
    return jiraStoryList;
}

function getDescription(issue) {
    var desc = null;
    if(!issue.fields.description || !issue.fields.description.content) return desc;
    issue.fields.description.content.forEach( item => {
        if(item.type === "paragraph") {
            if(!item.content) return desc;
            item.content.forEach( text => {
                if(text.type === "text"){
                    if(!desc && text.text) desc = text.text;
                    else if(text.text) desc += `\n${text.text}`; 
                }
            })
        }
    });
    
    return desc;
}

function getStartDate(issue){
    var startDate;
    issue.changelog.histories.forEach( history => {
        history.items.forEach( item => {
            if(item.field === "status"){
                if(item.toString.toUpperCase() === "IN PROGRESS"){
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
                if(item.toString.toUpperCase() === "DONE"){
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