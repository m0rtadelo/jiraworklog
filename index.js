const jira = require('./jira-client');
const config = require("./.config");

async function main() {
    const timestamp = + new Date(config.since);
    const user = await jira.rest.getUser;
    let issue;
    console.log('Listing worklogs for: ' + user.displayName);
    
    const result = await jira.rest.getWorklogs(timestamp).catch(err => console.error(err));
    if(result && result.values){
        const worklogs = result.values.map(value => value.worklogId);
        if(worklogs && worklogs.length > 0) {
            const worklogArray = await jira.rest.getWorklogInfo(worklogs).catch(err => console.error(err));
            worklogArray.forEach(async worklog => {
                if((worklog.timeSpentSeconds) && (worklog.updateAuthor.key === user.key)) {
                    issue = await jira.rest.getIssue(worklog.issueId).catch(err => console.error(err));
                    show(worklog, issue);
                }
            })
        } else {
            console.warn('No worklogs detected!')
        }
    } else {
        console.warn('No worklogs detected!')
    }
}

function show(worklog, issue) {
    if(issue.errors){
        issue.key = 'unknown';
        issue.fields = {issuetype : {name:'unknown'}}
        worklog.self = issue.errorMessages.toString();;
    }
    const str = `#${worklog.id} ${worklog.started.substr(0,10)} ${worklog.timeSpentSeconds/60/60}h [${worklog.updateAuthor.displayName}] ${issue.fields.issuetype.name} ${issue.key} (${worklog.issueId}) - ${worklog.self}`
    console.log(str);
}
// Async start
main();