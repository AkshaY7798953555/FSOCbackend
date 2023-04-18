const mysql = require('../handler')

exports.handler = async function (event) {
    let data = await JSON.parse(event.body)
    const result = await mysql.query("select count(*) as count from user where user_id = " + data.user_id)
    console.log("result : ", result[0].count)
    if (result[0].count == 1) {
        mysql.query("insert into user_address(user_id, latitude, longitude,current_location) values ? ", [[[data.user_id, data.latitude, data.longitude, data.current_location]]])
        return {
            statusCode: 200,
            body: JSON.stringify({
                status:true,message: "successfully inserted records for user :" + data.user_id
            })
        }
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify({
               status:true, message: "No user record found for user : " + data.user_id
            })
        }
    }

}


