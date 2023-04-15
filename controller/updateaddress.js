const mysql = require ('../handler')

const updateaddress = async function (event) {
    let data = await JSON.parse(event.body)
    const result = await mysql.query("select count(*) as count from user_address where user_id = " + data.user_id)
    console.log("result : ", result[0].count)
    if (result[0].count == 1) {
        if(data.location){
            mysql.query("update user_address set current_location= '"+data.location+"' where user_id = "+data.user_id)
        }
        if(data.latitude){
            mysql.query("update user_address set latitude= '"+data.latitude+"' where user_id = "+data.user_id)
        }
        if(data.longitude){
            mysql.query("update user_address set longitude= '"+data.longitude+"' where user_id = "+data.user_id)
        }
        return {
            statusCode: 202,
            body: JSON.stringify({
                message: "successfully updated records for user : " + data.user_id
            })
        }
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "No user address record found for user : " + data.user_id
            })
        }
    }

}


module.exports.updateaddress = updateaddress