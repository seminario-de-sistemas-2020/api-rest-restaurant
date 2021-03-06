'use strict'

const Order = require('../../../database/collection/orden');
const OrderTemporal = require('../../../database/collection/ordenTeporal');
const User = require('../../../database/collection/user');
const Restaurnte = require('../../../database/collection/restaurant');
const { Router } = require('express');

// add orden temporal
const addOrderTemporal = async (req, res) =>{

    console.log(req.body);
    
    var idClient  = req.params.idClient;
    var results = await OrderTemporal.orderTemporal.find({idClient:idClient});
    if(results.length === 0){
        
        let newOrder = new OrderTemporal.orderTemporal({

            idMenu         : req.body.idMenu,      
            idClient       : req.params.idClient,       
            idRestaurant   : req.body.idRestaurant,
            nameMenu       : req.body.nameMenu,
            precioUnitario : req.body.precioUnitario,
            fotoProducto   : req.body.urlFotoProducto,
            cantidad       : 1, 
            precio_cantidad_tocal : req.body.precioUnitario * 1
            
        })

        newOrder.save(( err , result )=>{
            if(err) return res.status(400).send({error:'Error al agregar el pedido, orden no valida'});
            if(result){
                res.status(200).send({message:'agregado ok', result })
            }
        })
    };


    if( results.length > 0 ){
        
        var searchMenu = await OrderTemporal.orderTemporal.find({idMenu: req.body.idMenu});

           if(searchMenu.length > 0) return res.status(200).send({message:"El menu ya fue añadido"});

            if(searchMenu.length === 0){

                let newOrder2 = new OrderTemporal.orderTemporal({
                    idMenu         : req.body.idMenu,      
                    idClient       : req.params.idClient,       
                    idRestaurant   : req.body.idRestaurant,
                    nameMenu       : req.body.nameMenu,
                    precioUnitario : req.body.precioUnitario,
                    fotoProducto   : req.body.urlFotoProducto,
                    cantidad       : 1, 
                    precio_cantidad_tocal : req.body.precioUnitario * 1
                    
                })

                newOrder2.save(( err2 , result2 )=>{
                    if(err2) return res.status(400).send({error:'Error al agregar el pedido, orden no valida'});
                    if(result2){
                       return res.status(200).send({message:'agregado ok', result2 })
                    
                    }
                })
            }
        
    }
    

} 

const cancelarOrdenTemporal =async (req, res) => {

    //recibe "rejected"
 
 var stateOrdenClient = "rejected"

  var result = await  OrderTemporal.orderTemporal.findById({_id:req.params.idOrden});
console.log(result)
  if(result){
    OrderTemporal.orderTemporal.findByIdAndUpdate({_id:req.params.idOrden},{stateOrdenClient},(error, succes)=>{
        console.log(succes);
        if(error) return res.status(400).send({error:"error al cancelar la orden"});
        if(succes){
            res.status(200).send({message:"ok",stateOrden:"Se conselo la orden",succes});
        }
    });
  }
}

// muestra todas las oirdenes temporles
const showAllMenusforUser = async (req , res) =>{

    var IDCLIENT = req.params.idClient

    try {
        var results = await OrderTemporal.orderTemporal.find({idClient: req.params.idClient,stateOrdenClient:"aggregated"}).sort({dateOrderTempora:-1});
        if(results.length > 0) {
            res.status(200).send({message:'ok',idClient: IDCLIENT, results:results.length,litsOrdenes:results})
        }
    } catch (error) {
        res.status(400).send({error: "error en la consulta de las orddenes"});
    }
}

// actuliza los precios de los productos

const updateCantidadProducto = async (req, res) =>{
    
    var result = await OrderTemporal.orderTemporal.findById({_id : req.params.idOrdenTemporal});
    console.log(result);
    if(result){
        

        var updateCantidad =await { cantidad : req.body.cantidad };

        var precioCantidadTotal = await { precio_cantidad_tocal : result.precioUnitario * req.body.cantidad };

        console.log("resultados");
        console.log(updateCantidad.cantidad, precioCantidadTotal.precio_cantidad_tocal);

        OrderTemporal.orderTemporal.findByIdAndUpdate({_id : req.params.idOrdenTemporal},updateCantidad,(error,restulUpdate)=>{
            if(error) return res.status(400).send({error:"error al actualizar la cantidad de  la orden"});
            OrderTemporal.orderTemporal.findByIdAndUpdate({_id : req.params.idOrdenTemporal},precioCantidadTotal,(error2,restulUpdate2)=>{
                if(error2) return res.status({error:"error al actualizar el precio total de un prodcuto temporal"})
                OrderTemporal.orderTemporal.findById({_id : req.params.idOrdenTemporal},(error3, result3)=>{
        
                    res.status(200).send({message:"ok",precioOrdenTemporalActuzliado:result3})
                });
                
            });
        });
      
    }
}

const calcularCostoTotalOrdenTemporal = async (req, res) => {
    var IDCLIENT = req.params.idClient

    try {
        var results = await OrderTemporal.orderTemporal.find({idClient: req.params.idClient,stateOrdenClient:"aggregated"}).sort({dateOrderTempora:-1});
        if(results.length > 0) {
            var sum=0;
            for (let i = 0; i < results.length; i++) {

                sum = await sum + results[i].precio_cantidad_tocal;
                
            }

            res.status(200).send({message:'ok',idClient: IDCLIENT, prcioTotalCantidad:sum})
        }
    } catch (error) {
        res.status(400).send({error: "error en la consulta de las orddenes"});
    }

}


// confirmar pedido  y agegar a nueva order
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

// muestra lalista de ordenes por idcliente 
const listOrderForIdCliente = async (req, res) =>{
    var listMenu =  await Order.orden.find({idCliente:req.params.idcliente});
    if(listMenu.length==0) return res.status(200).send({ok:'no tenes ninguna orden',results:listMenu.length,orders:listMenu});
    if(listMenu.length>0){
        var sum=0;
        var precioTotal = await listMenu.map((d,i)=>{
            // if(d.stateSaldo==='sincancelar'){

                sum=sum+(d.precio*d.cantidad);
            // }
        })
        return res.status(200).send({ok:'lista de la orden',results:listMenu.length,orders:listMenu, saldoTotal: sum})
    }
    
}


const listOrderForIderestaurant = async (req, res) =>{

    var IDRESTAURANT = req.params.idrestaurante;
    try{
        var resulLits = await Order.orden.find({idRestaurant: IDRESTAURANT});
        if(resulLits.length===0) return res.status(200).send({ok: 'El resturante no tiene ninguna orden', results: resulLits.length});
        if(resulLits.length>0){
            var restaurante = await Restaurnte.restaurant.findById({_id:IDRESTAURANT})
            res.status(200).send({
                ok:'Peticcion ejecutada exitomente',
                results:resulLits.length,
                idRestaurant: IDRESTAURANT,
                nameRestaurat: restaurante.nombre,
                restaurant:resulLits
            })
        }
    }
    catch(err){

    }
}





const listAllOders = async (req, res) =>{

    var listOrder = await Order.orden.find({});
    if(!listOrder && listOrder.length>0) return res.status(400).send({error:'error'})
    return res.status(200).send({message:'ok',results: listOrder.length, listMenus:listOrder})
}






module.exports = {
    addOrderTemporal,
    cancelarOrdenTemporal,
    showAllMenusforUser,
    updateCantidadProducto,
    calcularCostoTotalOrdenTemporal,
    newOrder,
    listAllOders,
    listOrderForIdCliente,
    listOrderForIderestaurant
}