const mysql = require('serverless-mysql')
const sqlconnect = require ('serverless-mysql')({
     config : {
          host     : 'localhost',
          database : "address",
          user     : "root",
          password : "Akshay@27"
     }
    
})

module.exports= sqlconnect

// const mysql = require('serverless-mysql')({
//   config: {
//     host     : 'localhost',
//     database : "employee",
//     user     : "root",
//     password : "Akshay@27"
//   }
// })

// module.exports.showUsers = async (event, context) => {
  
//   let results = await mysql.query('SELECT * FROM user_details')
  
//   await mysql.end()
 
//   return results
// }

// module.exports.createUser = async (event, context) => {
//   const { name, email } = JSON.parse(event.body);

//   const result = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);

//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'User created successfully' })
//   };
// };


// module.exports.hello = async (event) => {
//   let results = await mysql.query('SELECT * FROM user_details')
//   await mysql.end()
//   console.log(results)
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'hey.. we have created first function hello world!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
