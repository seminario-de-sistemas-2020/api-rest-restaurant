'use strict'


const ApiInfo =(req, res)=>{

    res.send(
        [
            {
                1:"create restaurant",
                endpoint: "/restaurant",
                host: 'localhost:9000/api/v0.1/restaurant',
                method: 'POST'
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
                4:'list all restaurants exist in DB',
                endpoint:'/restauesnt',
                mehtod:'GET',
                host:'http://localhost:9000/api/v0.1/restaurant/list/all'

            }
        ]
    )
}



module.exports = ApiInfo;