const mysql = require('../handler')

const createUser = async function(event){
   let data = await JSON.parse(event.body)
    mysql.query("insert into user(first_name, last_name, password,email_id) values ? " , [[[data.first_name,data.last_name,data.password,data.email_id]]])
    return {
        statusCode:200,
        body:JSON.stringify({
        message: "succesfully created"
        })
    }
}


module.exports.createUser= createUser