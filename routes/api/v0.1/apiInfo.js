'use strict'


const ApiInfo =(req, res)=>{

    res.send(
        [
            {
                1:"create restaurant",
                endpoint: "/restaurant",
                host: 'localhost:9000/api/v0.1/restaurant',
                method: 'POST',
                receives_in_body: 'nombre,nit, propietario, calle, telefono'
            },{
                2:'upload file and update -> logo',
                endpoint: "/restaurant",
                host: 'localhost:9000/api/v0.1/restaurant/upload/file=[name_file_parent]/idrestaurant=[id_resataurant]',
                method: 'POST',
                Example: 'localhost:9000/api/v0.1/restaurant/upload/file=logo/idrestaurant=5f6ff02f093d4b05e6037243'
            },{
                3:'upload file and update -> fotolugar',
                endpoint:'/restaurant',
                host: 'localhost:9000/api/v0.1/restaurant/upload/file=[name_file_parent]/idrestaurant=[id_restaurant]',
                method: 'POST',
                Example: 'localhost:9000/api/v0.1/restaurant/upload/file=fotolugar/idrestaurant=5f70ededc84dc3010e7dea24'
            },{
                4: 'upload location and update -> lat, log',
                endpoint: '/restaurnat',
                host: 'localhost:9000/api/v0.1/restaurant/upload/localtion/idrestaurant=:idrestaurant',
                method: 'PATCH',
                example: 'localhost:9000/api/v0.1/restaurant/upload/localtion/idrestaurant=5f70ededc84dc3010e7dea24'
            },
            {
                5:'list all restaurants exist in DB',
                endpoint:'/restauesnt',
                mehtod:'GET',
                host:'http://localhost:9000/api/v0.1/restaurant/list/all'

            },{
                6:'delete one restaurabt for idrestaurnat',
                endpoint:'/restaurnat',
                host : 'localhost:9000/api/v0.1/restaurant/delete/idrestaurant=:idrestaurant',
                method: 'DELETE',
                example: 'localhost:9000/api/v0.1/restaurant/delete/idrestaurant=5f6fee2c4e260705ca96f2b6'
            },
            {
                7:'actualizar datos o editar los datos de un restaurante',
                endpoint: '/restaurant',
                host:'/restaurant/update/data/idrestaurant=:idrestauran',
                method:'PATCH' ,
                example: 'localhost:9000/api/v0.1/restaurant/update/data/idrestaurant=5f70ededc84dc3010e7dea24'
            },
            {
                MENU:':::::::::::'
            },{
                1: 'crete new menu ',
                endpoint:'/menu',
                host:'/menu/create/idrestaurant=:idrestaurant',
                method: 'POST',
                example: 'localhost:9000/api/v0.1/menu/create/idrestaurant=5f70ededc84dc3010e7dea24',
                body:'nombre, precio, descripcion'
            },{
                2: 'upoad or update file fotoproduto',
                enpoint: '/menu',
                host:'/menu/upload/fotoproduct/file=:file/idmenu=:idmenu',
                method: 'PUTCH',
                example: 'localhost:9000/api/v0.1/menu/upload/fotoproduct/file=fotoproducto/idmenu=5f725b47097c3a0326f7d83c',
                body: 'type file: image ---> form-data'
            },
            {
                3: 'muestra toda lista de menus pertenecientes a un restaurante',
                enpoint:'/menu',
                host: '/menu/show/list/all/idrestaurant=:idrestaurant&order=:order',
                Method: 'GET',
                example : 'localhost:9000/api/v0.1/menu/show/list/all/idrestaurant=5f70ededc84dc3010e7dea24&order=desc',
                nota: 'params.order: desc 0´ asc'
            },
            {
                4: 'Muestra los datos de un menu (idmenu)',
                enpoint: '/menu',
                host: '/menu/show/idmenu=:idmenu',
                Method: 'GET',
                example: 'localhost:9000/api/v0.1/menu/show/idmenu=5f725b47097c3a0326f7d83c'


            },
            {
                USER: ':::::::::::::::::::'
            },{
                1: 'create new user',
                endpoint: '/user',
                Method: 'POST',
                host: '/user/new',
                example: 'localhost:9000/api/v0.1/user/new',
                body: 'name, lastName, email, password, phoneNumber'

            },{
                2: 'upload foto de avatar',
                enpoint: '/user',
                Method: 'PATCH',
                host: '/user/upload/avatar/file=:file/iduser=:iduser',
                example: 'localhost:9000/api/v0.1/user/upload/avatar/file=avatar/iduser=5f75082d6417ad04462dc056',
                paramas: 'file=avatar, iduer=iduser',
                body:'form-data --> key: image'
            }
        ]
    )
}



module.exports = ApiInfo;