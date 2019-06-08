# JiraWorklog

Jira REST API POC to list time worklogs for current user since defined date. 

> Uses basic authentication (works only over https protocol)

## Install

```npm install```

## Configure

Create a `.config.js` file in root folder with the next format/content:
```javascript
exports.username = 'JiraUsername';
exports.password = 'JiraPassword';
exports.api = 'https://jira.yourcompany.com/rest/api/2/'; 
exports.since = '2019-06-01';
```

## Usage

```npm start```

> Results in console