'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const Token = require('./token/token')

const auth = async(req, res, next)=>{
    console.log(req.headers.autorization)

    if(!req.headers.autorization){
        return res.status(404).send({err:'acceso denegado, require token de authntication'})
    }

    if(req.headers.autorization){

        // Token.createToken({_id:'22222'})

        var tk = req.headers.autorization.split(' ')[1];
        var autorization = Token.verifyToken(tk);
        if(autorization){
            
            next();
        }else{
            res.status(200).send({message: 'acceso denegado, token no valido'})
        }
    }
    
}

module.exports = auth;