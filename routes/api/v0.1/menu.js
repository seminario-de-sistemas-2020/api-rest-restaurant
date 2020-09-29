'use strict'
const Menu = require('../../../database/collection/menu');
const Restaurant  = require('../../../database/collection/restaurant');
const File = require('../../../utils/uploadFile');

const createMenu = async (req, res)=>{

    try {
        var restaurant = await Restaurant.restaurant.findById({_id:req.params.idrestaurant});
        if(!restaurant) return res.status(400).sednd({error:'idrestaurant no valido'});

        if(restaurant){
            var newMenu = new Menu.menu({
                idRestaurant : req.params.idrestaurant!=undefined && req.params.idRestaurant !=''?req.params.idrestaurant:'',
                nombre       : req.body.nombre!=undefined && req.body.nombre !=''?req.body.nombre:'',
                precio       : req.body.precio!=undefined && req.body.precio !=''?req.body.precio:0,
                descripcion  : req.body.descripcion!=undefined && req.body.descripcion !=''?req.body.descripcion:'',
                fotoProducto : req.body.fotoProducto!=undefined && req.body.fotoProducto !=''?req.body.fotoProducto:'',
            })

        }
        newMenu.save((error, data)=>{
            if(error) return res.status(400).send({error:'error al guardar el menu'});
            if(!data) return res.status(400).send({error:'restaurant no encontrado'});
            if(data){
                res.status(200).send({message:'ok',menuCreated:data})
            } 
        })
        
    } catch (error) {
        res.status(400).send({error:`idrestaurant no valido ${req.params.idrestaurant?req.params.idrestaurant:''}`})
    }

}


const uploatFotoProducto = (req, res) =>{

    File.uploadFileFotoProducto(req, res)
}



const updateDataMenu = async (req, res)=>{
    

    var result = await Menu.menu.findById({_id:req.params.idmenu});
    if(!result) return res.status(400).send({error:'idmenu no encontrado'});
    if(result){

        var   idRestaurant = req.params.idrestaurant!=undefined && req.params.idRestaurant !=''?req.params.idrestaurant: result.idRestaurant;
        var   nombre       = req.body.nombre!=undefined && req.body.nombre !=''?req.body.nombre: result.nombre;
        var   precio       = req.body.precio!=undefined && req.body.precio !=''?req.body.precio: result.precio;
        var   descripcion  = req.body.descripcion!=undefined && req.body.descripcion !=''?req.body.descripcion: result.descripcion;

        Menu.menu.findByIdAndUpdate({_id:req.params.idmenu},{idRestaurant, nombre, precio, descripcion},async (error, newData)=>{
            if(error) return res.status(400).send({error: `error en la actualizaion del menu : ${result.nombre} `});
            if(newData){
               var menuUpdated = await Menu.menu.findById({_id:req.params.idmenu});
               res.status(200).send({message: 'ok',menu:menuUpdated});
            }
        })
        
    }
    
}



module.exports = { 
    createMenu,
    uploatFotoProducto,
    updateDataMenu
}