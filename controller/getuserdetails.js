const mysql = require('../handler')
exports.handler = async function (event) {
    let data = event.multiValueQueryStringParameters;
    console.log("data ",data)
    const result = await mysql.query("select count(*) as count from user where user_id = " + data.user_id)
    console.log("result : ", result[0].count)
    if (result[0].count == 1) {
   let result = await mysql.query("select a.user_id, a.first_name, a.last_name, a.email_id, b.latitude, b.longitude, b.current_location from user a, user_address b where a.user_id=b.user_id and a.user_id="+data.user_id)
       
   return {
            statusCode: 200,
            body: JSON.stringify({
                message: "user information : " + data.user_id,
                data : result[0]
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


