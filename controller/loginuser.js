
const mysql = require('../handler')
const jwt = require("jsonwebtoken");




exports.handler = async function (event) {
    try {
        let data = await JSON.parse(event.body)
        //mysql.query ("select* from user (user_id, password) values ? ",[[[data.user_id,data.password]]])
        const result = await mysql.query('SELECT * FROM user WHERE email_id = ? AND password = ?', [data.email_id, data.password])
        console.log(result);
        if (result.length == 0) {

            throw new Error('Unauthorized')
        }






        else {
            let token = jwt.sign({
                user_id: result.user_id
            },
                "californium_functionup")
            console.log('succesfully login')
            return {
                statuscode: 200,
                body: JSON.stringify({
                    message: "succefully login", token: token
                })
            }
        }



    }


    catch (error) {
        return {
            "statusCode": 500,
            "headers": {
                "my_header": "my_value"
            },

            "body": JSON.stringify({ error: error.message }),
            "isBase64Encoded": false



        }

    }
}


//module.exports.loginuser = loginuser