'use strict'

const multer = require('multer');
const fs = require('fs');
const path =  require('path');
const ConfigApi = require('../config/configApi.json');
const File = require('../database/collection/fille');
const Restaurant = require('../database/collection/restaurant');
const Menu  = require('../database/collection/menu');
const User = require('../database/collection/user');




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
            
            if(!req.file)return res.status(400).send({error:'file is requered, restaurant'})
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




const uploadFileFotoProducto = (req, res)=>{
    
    upload(req, res,async(err)=>{
        console.log('arrived file api uploadFileFotoProducto');
        console.log(req.file)
        if(!req.file)return res.status(400).send({error:'file is requered for fotoproducto'})
        console.log(req.params.idmenu)
        console.log(req.params.file)
        if(err) return res.status(400).send({ error: 'error al guardar el archivo'});

        var ruta = req.file.path.substr(6);
        var restaurant = await Menu.menu.findById({_id:req.params.idmenu});
        console.log(restaurant);
        if(restaurant){

            var newFile = new File.file({
                idParent:    req.params.idmenu,
                nameParent:  req.params.file,
                nameFile:    req.file.filename,
                physicalPath: req.file.path,
                relativePath: ConfigApi.configApi[0].hostApi,    //  http://localhost:9000/
                linkFile:    ConfigApi.configApi[0].hostApi + ruta, 
                size:        req.file.size  
            });

            newFile.save(async(err, data)=>{
                if(req.params.file==="fotoproducto"){
                    var fotoProducto =await  data.linkFile;
                    var u=await Menu.menu.findOneAndUpdate({_id:req.params.idmenu},{fotoProducto})
                    var newRest = await Menu.menu.findById({_id:req.params.idmenu})
                 //    console.log(u) 
                    res.status(200).send({message:"ok",menu:newRest})
                }
                // if(req.params.file==="fotolugar"){
                //     var fotoLugar =await  data.linkFile;
                //     var u=await Restaurant.restaurant.findOneAndUpdate({_id:req.params.idrestaurant},{fotoLugar})
                //     var newRest = await Restaurant.restaurant.findById({_id:req.params.idrestaurant})
                //     //    console.log(u) 
                //     res.status(200).send({restaurant:newRest})
                // }
            })
            console.log(newFile)
        }
    })
}



const uploadPhotoAvatar = (req, res)=>{
    
    upload(req, res,async(err)=>{
        console.log('arrived photo avatar');

        console.log(req.file)
        //console.log(req);
        if(!req.file)return res.status(400).send({error:'file is requered for fotoproducto'})
        console.log(req.params.iduser)
        console.log(req.params.file)
        if(err) return res.status(400).send({ error: 'error al guardar el archivo'});

        var ruta = req.file.path.substr(6);
        var existUser = await User.user.findById({_id:req.params.iduser});
        if(!existUser) res.status(400).send({error: 'Id de usuario no existente'});
        console.log(existUser);
        if(existUser){

            var newFile = new File.file({
                idParent:    req.params.iduser,
                nameParent:  req.params.file,
                nameFile:    req.file.filename,
                physicalPath: req.file.path,
                relativePath: ConfigApi.configApi[0].hostApi,    //  http://localhost:9000/
                linkFile:    ConfigApi.configApi[0].hostApi + ruta, 
                size:        req.file.size  
            });

            newFile.save(async(err, data)=>{
                if(req.params.file==="avatar"){
                    var fotoAvatar =await  data.linkFile;
                    var u=await User.user.findOneAndUpdate({_id:req.params.iduser},{fotoAvatar})
                    var newRest = await User.user.findById({_id:req.params.iduser})
                 //    console.log(u) 
                    res.status(200).send({message:"ok",updateFotoAvatar:true,user:newRest})
                }
            })
            console.log(newFile)
        }
    })
}



module.exports = {
    uploadFile,
    uploadFileFotoProducto,
    uploadPhotoAvatar
}