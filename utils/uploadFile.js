'use strict'

const multer = require('multer');
const fs = require('fs');
const path =  require('path');
const ConfigApi = require('../config/configApi.json');
const File = require('../database/collection/fille');
const Restaurant = require('../database/collection/restaurant');

// congig beasic of mullter::::::::::
const storage = multer.diskStorage({
    destination: "./public/file",
    filename: (req, file, cb)=>{
        var extensionArchivo = path.extname(file.originalname);
        console.log(extensionArchivo);
        console.log("IMG_"+Date.now()+extensionArchivo);
        cb(null, "IMG_"+Date.now()+extensionArchivo);
        
    } 
});

var upload = multer({
    storage:storage
}).single("image");


const uploadFile = (req, res)=>{
    
        upload(req, res,async(err)=>{
            console.log('arrived file api');
            console.log(req.file)
            console.log(req.params.idrestaurant)
            console.log(req.params.file)
            if(err) return res.status(400).send({ error: 'error al guardar el archivo'});

            var ruta = req.file.path.substr(6);
            var restaurant = await Restaurant.restaurant.findById({_id:req.params.idrestaurant});
            console.log(restaurant);
            if(restaurant){

                var newFile = new File.file({
                    idParent:    req.params.idrestaurant,
                    nameParent:  req.params.file,
                    nameFile:    req.file.filename,
                    physicalPath: req.file.path,
                    relativePath: ConfigApi.configApi[0].hostApi,    //  http://localhost:9000/
                    linkFile:    ConfigApi.configApi[0].hostApi + ruta, 
                    size:        req.file.size  
                });

                newFile.save(async(err, data)=>{
                    if(req.params.file==="logo"){
                        var logo =await  data.linkFile;
                        var u=await Restaurant.restaurant.findOneAndUpdate({_id:req.params.idrestaurant},{logo})
                        var newRest = await Restaurant.restaurant.findById({_id:req.params.idrestaurant})
                     //    console.log(u) 
                        res.status(200).send({restaurant:newRest})
                    }
                    if(req.params.file==="fotolugar"){
                        var fotoLugar =await  data.linkFile;
                        var u=await Restaurant.restaurant.findOneAndUpdate({_id:req.params.idrestaurant},{fotoLugar})
                        var newRest = await Restaurant.restaurant.findById({_id:req.params.idrestaurant})
                        //    console.log(u) 
                        res.status(200).send({restaurant:newRest})
                    }
                })
                console.log(newFile)
            }


        })
}





module.exports = {
    uploadFile
}