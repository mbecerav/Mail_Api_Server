var request = require('request');
var UsersRequests = [{}];

function addRequest(userId, userData, wish){
    var data = {
        userId: userId,
        userAdd: userData,
        userWish: wish
    };
    UsersRequests.push(data)
    //console.log(UsersRequests)
}

function checkAndSendPendings(){
    if(UsersRequests.length == 0)
        console.log("There's not requests")
    else{
        console.log("There's " + UsersRequests.length + " pending requests")

        UsersRequests.forEach((element,index) => {
            if(element.userId == undefined || element.userAdd == undefined || element.userWish == undefined){
                UsersRequests.splice(index, 1)
            }else{
                handleEMail(element.userId, element.userAdd, element.userWish)
                UsersRequests.splice(index, 1)
                console.log('Request sended!')
            }
        });
    }
}

function handleEMail(userId, userData, wish){
    request.post(
        'http://localhost:3000/api/email',
        { json: { cName: userId,
                  cAdress: userData,
                  cWish: wish } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
}

module.exports = {
    addRequest,
    checkAndSendPendings
}