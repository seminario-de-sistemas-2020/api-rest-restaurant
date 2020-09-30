'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewUser = {
    name       : String,
    lastName  : String,
    email      : String,
    phoneNumber: Number,
    password   : String,
    fotoAvatar : String, 
    role: {
        type:String,
        enum: ['admin','client','owner', 'delivery'],
        default: 'client'
    },
    DateCreatedAcount: {type:Date, default: Date.now}
}

var user = mongoose.model('users', NewUser);


module.exports = {
    user
}