'use strict'

const mongoose = require('mongoose');


try{                                                                 
    mongoose.connect('mongodb://192.168.99.100:27017/reastaurantDB',{useNewUrlParser:true, useFindAndModify:false, useUnifiedTopology: true})
    console.log('connect mongoDB succesfull')
}
catch(err){
    console.log("error en la conexion a mongoDB")
    console.log(err)
}




module.exports = mongoose;