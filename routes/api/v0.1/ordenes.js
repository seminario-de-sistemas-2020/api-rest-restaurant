'use strict'

const { Router } = require('express');
const Order = require('../../../database/collection/orden');
const User = require('../../../database/collection/user');


const newOrder = async (req, res) => {

    var idcliente = await req.params.idcliente != undefined && req.params.idcliente!=''? req.params.idcliente : '';
    try {
        var resultUser = await User.user.findById({_id:idcliente});
        if(!resultUser) return res.status(400).send({error:'idcliente no existente'});
        if(
            req.body.idmenu !=undefined && req.body.idmenu!='' &&
            req.body.idRestaurant !=undefined && req.body.idRestaurant!='' &&
            req.body.cantidad !=undefined && req.body.cantidad!='' &&
            req.body.precio !=undefined && req.body.precio!='' &&
            req.body.pagoTotal !=undefined && req.body.pagoTotal!='' &&
            req.body.lat !=undefined && req.body.lat!='' &&
            req.body.long !=undefined && req.body.long!=''


        ){
            var newOrder =new Order.orden({
                idCliente: idcliente,
                idRestaurant: req.body.idRestaurant,
                idmenu: req.body.idmenu,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                pagoTotal: req.body.pagoTotal,
                lugarEnvio: {
                    lat:req.body.lat,
                    long: req.body.long
                },
            });
            newOrder.save((err, resulOrder)=>{
                if(err) return res.status(400).send({error:'Error no se proceso el pedido'});
                if(resulOrder) return res.status(200).send({ok:'Orden precesada exitosamente',newOrder});
            })
            
        }else{
            res.status(400).send({error:'complete los datos requeridos'})
        }

        // res.send(resultUser)
    } catch (error) {
        res.status(400).send({error:'error al realizar la orden'})
    }

}

const modiforder = (req, res) =>{


}

const listOrderForIdCliente = async (req, res) =>{
    var listMenu =  await Order.orden.find({idCliente:req.params.idcliente});
    if(listMenu.length==0) return res.status(200).send({ok:'no tenes ninguna orden',results:listMenu.length,orders:listMenu});
    if(listMenu.length>0){
        var sum=0;
        var precioTotal = await listMenu.map((d,i)=>{
            sum=sum+(d.precio*d.cantidad);
        })
        return res.status(200).send({ok:'lista de la orden',results:listMenu.length,orders:listMenu, saldoTotal: sum})
    }
}





const listAllOders = async (req, res) =>{

    var listOrder = await Order.orden.find({});
    if(!listOrder && listOrder.length>0) return res.status(400).send({error:'error'})
    return res.status(200).send({message:'ok',results: listOrder.length, listMenus:listOrder})
}






module.exports = {
    newOrder,
    listAllOders,
    listOrderForIdCliente
}