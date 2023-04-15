const mysql = require('../handler')
const deleteuser = async function (event) {
    let data = await JSON.parse(event.body)
    const result = await mysql.query("select count(*) as count from user where user_id = " + data.user_id)
    console.log("result : ", result[0].count)
    if (result[0].count == 1) {
        mysql.query("delete from user where user_id ="+data.user_id
        )
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "successfully delet records for user : " + data.user_id
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

module.exports.deleteuser = deleteuser

