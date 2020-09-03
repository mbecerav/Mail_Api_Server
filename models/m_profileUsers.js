var request = require('request');
var url = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';
var _ = require("underscore");
var usersData;


function getAllUsersData() {
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

  async function getUserDataById(uId){
    await getAllUsersData()
    var filtered = _.where(usersData, {userUid: uId})
    return filtered
}

module.exports = {
  getUserDataById
}