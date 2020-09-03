var users = require('../models/m_users')
var profiles = require('../models/m_profileUsers')

/*function pruebas(req, res){
    res.status(200).send({
        menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
    });
}*/

function findUser(uName){
    return users.getUserById(uName)
}

async function findUserData(uId){
    var userProfile = await profiles.getUserDataById(uId)
    //console.log(JSON.stringify(userProfile[0].birthdate) - Date())
    var birthDate = userProfile[0].birthdate
    var birthDate = birthDate.substr(0, 4)+"-"+birthDate.substr(8, 2)+"-"+birthDate.substr(5, 2)
    var mydate = new Date(birthDate);
    var today = new Date();
    if(today.getFullYear() - mydate.getFullYear()<=10)
        return userProfile
    else
        return undefined
}


module.exports = {
    findUser,
    findUserData
};
    