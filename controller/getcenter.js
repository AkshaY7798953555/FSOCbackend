const mysql = require('../handler')
exports.handler = async function (event) {
    let data = event.multiValueQueryStringParameters;
    console.log("data ",data)
    const result = await mysql.query("select count(*) as count from user where user_id = " + data.user_id)
    console.log("result : ", result[0].count)
    if (result[0].count == 1) {
   let result = await mysql.query("select latitude, longitude, center_name from centres  where user_id="+data.user_id)
       
   return {
            statusCode: 200,
            body: JSON.stringify({
                message: "user information : " + data.user_id,
                data : result
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



