var request = require('request');
var url = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';
var _ = require("underscore");
var usersData;

function getAllUsers() {
  return new Promise(function(resolve, reject) {
    request({url, json: true}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        usersData = body
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

  async function getUserById(userName){
    await getAllUsers()
    //var filtered = _.where(usersData, {uid: "730b06a6-72c7-11e9-a923-1681be663d3e"})
    var filtered = _.where(usersData, {username: userName})
    if(filtered.length>0){
      var userId = filtered[0].uid
      return userId
    }
    else{
      return undefined
    }
}

module.exports = {
  getAllUsers,
  getUserById
}