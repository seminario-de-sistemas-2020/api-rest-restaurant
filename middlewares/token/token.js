'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');


const createToken=async(user)=>{

    var payload = {
         id:user._id,
         init:  moment().unix(),
         exp: moment().add(30,'days').unix()
        }

    var secret = 'secret';
    
    var token = await  jwt.encode(payload, secret);
    // console.log(token);
    return token;

}


const verifyToken =(token)=>{
    var secret = 'secret';
    var data = jwt.decode(token, secret);
    if(data.exp-data.init >0){
        console.log('token vigente, acceso permitido');
        console.log(data.exp-data.init);
        return true;
    }
    if(data.exp-data.init < 0){
        console.log('acceso denegado, el token ha expirado');
        console.log(data.exp-data.init);
        return false
    }
    console.log(data)
}


module.exports = {
    createToken,
    verifyToken
};