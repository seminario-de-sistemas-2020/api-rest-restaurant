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
                2:'upload file -> logo',
                endpoint: "/restaurant",
                host: 'localhost:9000/api/v0.1/restaurant/upload/file=[name_file_parent]/idrestaurant=[id_resataurant]',
                method: 'POST',
                Example: 'localhost:9000/api/v0.1/restaurant/upload/file=logo/idrestaurant=5f6ff02f093d4b05e6037243'
            },{
                3:'upload file -> fotolugar',
                endpoint:'/restaurant',
                host: 'localhost:9000/api/v0.1/restaurant/upload/file=[name_file_parent]/idrestaurant=[id_restaurant]',
                method: 'POST',
                Example: 'localhost:9000/api/v0.1/restaurant/upload/file=fotolugar/idrestaurant=5f70ededc84dc3010e7dea24'
            },{
                4: 'upload location -> lat, log',
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
            }
        ]
    )
}



module.exports = ApiInfo;