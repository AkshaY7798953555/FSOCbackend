
const mysql = require('../handler')
const jwt = require("jsonwebtoken");

// const loginuser = async function (event) {
//     try {
//         let data = await JSON.parse(event.body)
//         //mysql.query ("select* from user (user_id, password) values ? ",[[[data.user_id,data.password]]])
//         mysql.query('SELECT * FROM user WHERE user_id = ? AND password = ?', [data.user_id, data.password], function (error, results, fields) {
//             //console.log(results);

//             if (results.length == 0) throw new Error("user id and password is wrong");
//             //console.log('The solution is: ', results[0]);

//         });
//         return {
//             statuscode: 200,
//             body: JSON.stringify({
//                 message: "succefully login"
//             })
//         }




//     }
//     catch (error) {
//         return {
//             statuscode: 200,
//             body: JSON.stringify({
//                 message: error.message
//             })


//         }

//     }
// }


const loginuser = async function (event) {
    try {
        let data = await JSON.parse(event.body)
        //mysql.query ("select* from user (user_id, password) values ? ",[[[data.user_id,data.password]]])
        const result = await mysql.query('SELECT * FROM user WHERE email_id = ? AND password = ?', [data.email_id, data.password])
        console.log(result);
        if (!result.length) {

            throw new Error('Unauthorized')
        }
        
        
        



        else {
            let token = jwt.sign({
                user_id : result.user_id
             },
             "californium_functionup")
            console.log('succesfully login')
            return {
                statuscode: 200,
                body: JSON.stringify({
                    message: "succefully login",token:token
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

module.exports.loginuser = loginuser

//module.exports.loginuser = loginuser