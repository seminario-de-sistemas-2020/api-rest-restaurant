'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const app = express();
const PORT = process.env.PORT | 9000;


const services = require('./routes/api/v0.1/services');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())




app.use('/api/v0.1/', services);

app.use(express.static(__dirname+'/public'))



app.listen(PORT, ()=>{
    console.log(`Api-rest restaurant run on localhost:${PORT} `)
})



