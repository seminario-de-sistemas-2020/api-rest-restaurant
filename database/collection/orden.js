'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Orden  = new Schema({
    idmenu       : [],
    idRestaurant : [],
    cantidad     : [],
    idCliente    : String,
    lugarEnvio   : Object,
    pagoTotal    : Number,
    
});


var orden = mongoose.model('order', Orden);
 


module.exports={
    orden
}