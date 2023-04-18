const mysql = require('../handler')

exports.handler = async function (event) {
    let data = await JSON.parse(event.body)
    const result = await mysql.query("select count(*) as count from user_address where user_id = " + data.user_id)
    console.log("result : ", result[0].count)
    if (result[0].count == 1) {
        mysql.query("insert into centres(user_id, latitude, longitude,center_name,id) values ? ", [[[data.user_id, data.latitude, data.longitude, data.center_name, data.id]]])
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "successfully inserted records for centers : " + data.user_id
            })
        }
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "No user record found for user : " + data.user_id
            })
        }
    }

}


