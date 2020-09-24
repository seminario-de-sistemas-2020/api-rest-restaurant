'use strict'

const express = require('express');
const route = express.Router();


route.get('/', (req, res, next)=>{
    res.status(200).send({message:' welcome api-rest restaurant'})
})






module.exports = route;