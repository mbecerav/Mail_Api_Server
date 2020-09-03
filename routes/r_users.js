var express = require('express');
var UserController = require('../controllers/c_users');
var api = express.Router();
var reqHandler = require('../controllers/c_requests');
 
//api.get('/pruebas', UserController.pruebas);
api.get('/findUser', function(req, res){
        UserController.findUser(req.query.id)
        res.status(200).send({
            //menssage: 'Entro a Find User'
        });
    }
);

api.post('/findUser', async function(req, res){
    var uId = await UserController.findUser(req.body.userid)

    if(uId==undefined){
        res.send(500,'The user is not registered!') 
        return false
    }

    var userData = await UserController.findUserData(uId)

    if(userData==undefined){
        res.send(500,'The user is not under 10 years old!') 
        return false
    }

    reqHandler.addRequest(req.body.userid, userData[0].address, req.body.wish)

    res.status(200).send({
        menssage: 'Dear ' + req.body.userid + ', the request has been received!'
    });
}
);

module.exports = api;
