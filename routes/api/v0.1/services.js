'use strict'

const express = require('express');
const route = express.Router();
const connect = require('../../../database/collection/connect');
const auth = require('../../../middlewares/auth')
const Restaurant = require('./restaurant');
const ApiInfo = require('./apiInfo');
const Menu = require('./menu');


route.get('/', (req, res, next)=>{
    res.status(200).send({message:' welcome api-rest restaurant'})
})


// :::::Mehtod POST, DELETE, UPDATE ...

route.post('/token',auth,(req, res)=>{
    res.status(200).send({message: 'acceso permitido, token valido'})
})



// CREATE RESTAURANTS
route.post('/restaurant', Restaurant.createRstaurant);
// file puede ser el logo o fotolugar
route.post('/restaurant/upload/file=:file/idrestaurant=:idrestaurant', Restaurant.uploadLogo);

route.patch('/restaurant/upload/localtion/idrestaurant=:idrestaurant', Restaurant.uploadLocation)

route.get('/restaurant/list/all',Restaurant.listarRestaurants);

route.delete('/restaurant/delete/idrestaurant=:idrestaurant', Restaurant.deleteRestaurant)

route.patch('/restaurant/update/data/idrestaurant=:idrestaurant',Restaurant.updateDataRestaurant)



// ::::::::MENU:::::::::::
route.post('/menu/create/idrestaurant=:idrestaurant',Menu.createMenu);
   // file=fotoproducto
route.patch('/menu/upload/fotoproduct/file=:file/idmenu=:idmenu', Menu.uploatFotoProducto);

route.put('/menu/update/data/idmenu=:idmenu', Menu.updateDataMenu);

route.get('/menu/show/list/all/idrestaurant=:idrestaurant&order=:order', Menu.showListAllMenuOfResturant);


// api-info
route.get('/info', ApiInfo);



module.exports = route;