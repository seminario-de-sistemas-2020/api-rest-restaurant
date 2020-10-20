'use strict'

const express = require('express');
const route = express.Router();
const connect = require('../../../database/collection/connect');
const auth = require('../../../middlewares/auth')
const Restaurant = require('./restaurant');
const ApiInfo = require('./apiInfo');
const Menu = require('./menu');
const User = require('./users');
const Order = require('./ordenes');


route.get('/', (req, res, next)=>{
    res.status(200).send({message:' welcome api-rest restaurant'})
})


// :::::Mehtod POST, DELETE, UPDATE ...

route.post('/token',auth,(req, res)=>{
    res.status(200).send({message: 'acceso permitido, token valido'})
})

// :::USERS::::

route.post('/user/new', User.addUser);

route.patch('/user/upload/avatar/file=:file/iduser=:iduser', User.uploadPhotoAvatar)

route.post('/user/login', User.LogIn);


// CREATE RESTAURANTS
route.post('/restaurant', Restaurant.createRstaurant);
// file puede ser el logo o fotolugar
route.post('/restaurant/upload/file=:file/idrestaurant=:idrestaurant', Restaurant.uploadLogo);

route.patch('/restaurant/upload/localtion/idrestaurant=:idrestaurant', Restaurant.uploadLocation)

route.get('/restaurant/list/all',Restaurant.listarRestaurants);

route.get('/restaurant/list/for/idowner=:idowner', Restaurant.listartRestaurntesForId);

route.delete('/restaurant/delete/idrestaurant=:idrestaurant', Restaurant.deleteRestaurant)

route.patch('/restaurant/update/data/idrestaurant=:idrestaurant',Restaurant.updateDataRestaurant)



// ::::::::MENU:::::::::::
route.post('/menu/create/idrestaurant=:idrestaurant',Menu.createMenu);
   // file=fotoproducto
route.patch('/menu/upload/fotoproduct/file=:file/idmenu=:idmenu', Menu.uploatFotoProducto);

route.put('/menu/update/data/idmenu=:idmenu', Menu.updateDataMenu);

route.get('/menu/show/list/all/idrestaurant=:idrestaurant&order=:order', Menu.showListAllMenuOfResturant);

route.get('/menu/show/idmenu=:idmenu', Menu.ShowOneMenu);



// ::::ORDENES :::::
// route.get('')
route.post('/order/add/idcliente=:idcliente', Order.newOrder)

route.get('/order/list/all',Order.listAllOders)
route.get('/order/list/idcliente=:idcliente', Order.listOrderForIdCliente )

// mostrar todos las ordenes ded cada restaurante
route.get('/order/list/idrestaurante=:idrestaurante', Order.listOrderForIderestaurant)


// api-info
route.get('/info', ApiInfo);



module.exports = route;