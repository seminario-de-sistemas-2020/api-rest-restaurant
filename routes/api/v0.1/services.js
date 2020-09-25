'use strict'

const express = require('express');
const route = express.Router();
const connect = require('../../../database/collection/connect');
const auth = require('../../../middlewares/auth')


route.get('/', (req, res, next)=>{
    res.status(200).send({message:' welcome api-rest restaurant'})
})


// :::::Mehtod POST, DELETE, UPDATE ...

route.post('/token',auth,(req, res)=>{
    res.status(200).send({message: 'acceso permitido, token valido'})
})






module.exports = route;