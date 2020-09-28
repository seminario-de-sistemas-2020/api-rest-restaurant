'use strict'

const Restaurant = require('../../../database/collection/restaurant');
const UplaoFile = require('../../../utils/uploadFile'); 


const createRstaurant = async (req, res)=>{
        // console.log(req.body)
        var newRestaurant = new Restaurant.restaurant({
            nombre: req.body.nombre,
            nit: req.body.nit,
            propietario: req.body.propietario,
            calle: req.body.calle,
            telefono: req.body.telefono,
            log: 0,
            lat: 0,
            logo: '',
            fotoLugar: ''
        
        })

        console.log(newRestaurant)
         
       const nombre = await Restaurant.restaurant.find({nombre:req.body.nombre});
       const nit = await Restaurant.restaurant.find({nit:req.body.nit});
       if(nombre.length>0){
           console.log('nombre existente')
            return res.status(400).send({message:'nombre existente'})
            
       }
       if(nit.length>0){
            console.log('nit registrado');
             return res.status(400).send({message:'nit existente'})
       }

       newRestaurant.save((err, data)=>{
           err?
           res.status(400).send({err:'no se guardaron los datos'})
           :
           res.status(200).send({
               data
            })
       })
    
}

// recibe logo, y fotolugar u otros 
const uploadLogo = (req, res)=>{
    // recibe el file atraves del req. y la fucoin upload se encarga de guardar el logo y el fotolugar
    UplaoFile.uploadFile(req, res)
}


const uploadLocation =  (req, res) =>{
    var lat = req.body.lat;
    var log = req.body.log;
    if(!lat) return res.status(400).send({error:'latitud requerido'});
    if(!log) return res.status(300).send({error: 'Longitud es requerido'});

    Restaurant.restaurant.findById({_id:req.params.idrestaurant}, async (error,data)=>{
        if(error) return res.status(400).send({error: 'ID restaurant no valido'});
        if(data){

            var result = await  Restaurant.restaurant.findByIdAndUpdate({_id:req.params.idrestaurant},{lat, log});
            var newResult = await Restaurant.restaurant.findById({_id:req.params.idrestaurant});
            res.status(200).send({restaurant: newResult});
        }else{
            res.status(400).send({error: 'ID restaurant no encontrado'})
        }
    })
}

const listarRestaurants = async (req, res)=>{
    
    var restaurants = await Restaurant.restaurant.find({}).sort({fechaDeRegistro:1})
    return res.status(200).send({results:restaurants.length,restaurants});
}


const deleteRestaurant =(req, res)=>{

    Restaurant.restaurant.findByIdAndDelete({_id:req.params.idrestaurant},(err, data)=>{
        if(err)return res.status(400).send({error:'error al eliminar'});
        if(data)return res.status(200).send({deleted:'restaurante eliminado',data})
    })

}


const updateDataRestaurant = async (req, res) => {
    
    var result = await Restaurant.restaurant.findById({_id:req.params.idrestaurant});
    if(!result) return res.status(400).send({error: 'ID restaurante no valido'});
    if(result){

        console.log(result)
        console.log(req.body)
       var nombre      = req.body.nombre!=undefined && req.body.nombre!= ''?req.body.nombre:result.nombre;
       var nit         = req.body.nit!=undefined && req.body.nit!=''?req.body.nit:result.nit;
       var propietario = req.body.propietario!=undefined && req.body.propietario!=''?req.body.propietario:result.propietario;
       var calle       = req.body.calle!=undefined && req.body.calle!=''?req.body.calle:result.calle;
       var telefono    = req.body.telefono!=undefined && req.body.telefono!=''?req.body.telefono:result.telefono;

       Restaurant.restaurant.findByIdAndUpdate({_id:req.params.idrestaurant},{nombre,nit, propietario, calle, telefono},async (error, data)=>{
           if(error) return res.status(400).send({error:'Error en la actualizacion de los datos'});
           if(!data) return res.status(400).send({error: 'idrestaurant no valido'});
           if(data){
               var  newResul = await Restaurant.restaurant.findById({_id:req.params.idrestaurant});
               console.log(newResul)
               res.status(200).send({message:'datos actualizados',restaurant:newResul});
           }
       })
    }
}



module.exports = {
    createRstaurant,
    uploadLogo,
    uploadLocation,
    listarRestaurants,
    deleteRestaurant,
    updateDataRestaurant
}