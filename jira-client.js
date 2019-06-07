const request = require("request");
const config = require("./config.hidden");

async function get(url) {
  return new Promise(function(resolve, reject) {
    request.get(url, (err, res, body) => {
        if(err)
            reject(err);
        resolve(JSON.parse(body));
      }).auth(config.username, config.password, true);
  });
}

async function post(url, data) {
  return new Promise(function(resolve, reject) {
    request.post({
      headers: {'content-type' : 'application/json'},
      url:     url,
      body:    data}, (err, res, body) => {
        if(err)
            reject(err);
        resolve(JSON.parse(body));
      }).auth(config.username, config.password, true);
  });
}

exports.rest = {
  getUser: get(config.api + 'myself'),
  getWorklogs: function(since) {
    return get(config.api + 'worklog/updated?since='+since)
  },
  getWorklogInfo: function(worklogIds) {
    return post(config.api + 'worklog/list', '{"ids":[' + worklogIds.toString()+']}');
  },
  getIssue: function(issueId) {
    return get(config.api + 'issue/'+ issueId);
  }
};
