'ues strict'
const User = require('../../../database/collection/user');
const UploadFile = require('../../../utils/uploadFile');


const addUser = async (req, res) =>{
    
    console.log(req.body)
    if(
        req.body.name == undefined || req.body.name == '' ||
        req.body.lastName  == undefined || req.body.lastName == '' ||
        req.body.email == undefined || req.body.email == '' ||
        req.body.phoneNumber == undefined || req.body.phoneNumber == '' ||
        req.body.password == undefined || req.body.password == ''
    ){
        return res.status(400).send({error:'Complente los campos requeridos'})
    }
        
    var emailP = await req.body.email;
    var passwordP = await req.body.password;
    
    User.user.find({email:emailP},(error, data)=>{
        if(error) return res.status(400).send({error:'error en la busqueda'});
        if(data.length>0) return res.status(400).send({error:'correo electronico en uso'});
        var newUser = new User.user({
            name      : req.body.name,
            lastName  : req.body.lastName,
            email     : req.body.email,
            phoneNumbe: req.body.phoneNumbe,
            password  : req.body.password,
            fotoAvatar: ''
        })

        newUser.save((err,d)=>{
            if(err) return res.status(400).send({error:'error al al guaradr los datos'});
            console.log(d);
            if(d) return res.status(200).send({message:'ok', userAdd: d})
        })
    })

    

}


const uploadPhotoAvatar = (req, res) =>{
    
        UploadFile.uploadPhotoAvatar(req, res);    
}



const LogIn= async (req, res)=> {

    console.log(req.body)

    if(req.body.email != undefined && req.body.email != '' && req.body.password != undefined && req.body.password != ''){
        var USER = await User.user.findOne({email:req.body.email})
        console.log(USER);

        if( USER!=null && USER.email === req.body.email && USER.password === req.body.password){

            console.log({
                message:"ok",
                userData:USER
            });

            res.status(200).send({
                message:"ok",
                userData:USER
            })
        }else{
            console.log({error:"email o password incorrectos"});
            res.status(400).send({error:'email o password incorrectos'});

        }
    }
}



module.exports = {
    addUser,
    uploadPhotoAvatar,
    LogIn
}