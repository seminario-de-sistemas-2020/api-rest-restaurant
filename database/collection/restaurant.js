'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Restaurant = new Schema({
    nombre:String,
    nit: String,
    propietario: String,
    calle: String,
    telefono: Number,
    log:Number, 
    lat: Number, 
    logo: String,
    fechaDeRegistro: {type: Date, default: Date.now},
    fotoLugar:String
})




var restaurant = mongoose.model('restaurant',Restaurant);

module.exports = {
    restaurant
}