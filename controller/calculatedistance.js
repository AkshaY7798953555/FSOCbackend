const mysql = require('../handler')
const center = require('../controller/getcenter')
const CalculateDistance = async function (event) {
    let data = await JSON.parse(event.body)
    
    const result = await mysql.query("select count(*) as count from user where user_id = " + data.user_id)
    if (result[0].count == 1) {
        let finalResult = [];
        const earthRadiusKm = 6371;
        //get user location details
        let userLocationDetails = await mysql.query("select  latitude, longitude, current_location from user_address where user_id="+data.user_id)
        let userLatitude = userLocationDetails[0].latitude;
        let userLongitude = userLocationDetails[0].longitude;
        let userCurrentLocation = userLocationDetails[0].current_location;

        //get user center details
        const getCenterDetails = await fetch("http://localhost:3000/dev/get-center?user_id="+data.user_id);
        const centerDetails = await getCenterDetails.json();
        console.log("centerDetails : ",centerDetails);

        //calculate distance from current location to centers
        for(let i=0;i<centerDetails.data.length;i++){

            if(centerDetails.data[i].center_name==userCurrentLocation){
                console.log("Not adding "+userCurrentLocation);
                continue;
            }else{
                console.log("Calculating distance for : "+centerDetails.data[i].center_name);
                const dLat = (centerDetails.data[i].latitude - userLatitude) * Math.PI / 180;
                const dLong = (centerDetails.data[i].longitude - userLongitude) * Math.PI / 180;
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                            Math.cos(userLatitude * Math.PI / 180) * Math.cos(centerDetails.data[i].latitude * Math.PI / 180) *
                            Math.sin(dLong/2) * Math.sin(dLong/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                const distanceKm = earthRadiusKm * c;
                let distanceData={}
                distanceData["Location"] = centerDetails.data[i].center_name;
                distanceData["DistanceFromCurrentLocation"] = distanceKm;
                finalResult.push(distanceData);
            }
        }

        finalResult.sort((x,y) => {
            return x.DistanceFromCurrentLocation - y.DistanceFromCurrentLocation;
        });
        
 
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Successfully calculated distances from centers to current location",
                data : finalResult
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


module.exports.CalculateDistance = CalculateDistance


// exports.calculateDistance = (event, context, callback) => {
//     // Parse the current location's latitude and longitude from the request body
//     const { currentLat, currentLong } = JSON.parse(event.body);
  
//     // Query the MySQL database for the center location's latitude and longitude
//     connection.query('SELECT * FROM center_location', (error, results) => {
//       if (error) {
//         // Handle the error
//         callback(error);
//       } else {
//         // Parse the center location's latitude and longitude from the query result
//         const centerLat = results[0].latitude;
//         const centerLong = results[0].longitude;
  
//         // Calculate the distance using the Haversine formula
//         const earthRadiusKm = 6371;
//         const dLat = (centerLat - currentLat) * Math.PI / 180;
//         const dLong = (centerLong - currentLong) * Math.PI / 180;
//         const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                   Math.cos(currentLat * Math.PI / 180) * Math.cos(centerLat * Math.PI / 180) *
//                   Math.sin(dLong/2) * Math.sin(dLong/2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//         const distanceKm = earthRadiusKm * c;
  
//         // Return the distance in the response body
//         const response = {
//           statusCode: 200,
//           body: JSON.stringify({ distanceKm })
//         };
//         callback(null, response);
//       }
//     });
//   };
//   Deploy the API: Deploy the API to your serverless framework. Once the API is deployed, you can test it by sending a request with the current location's latitude and longitude in the request body.
//   This is a basic example to get started with. You may need to add more error handling and authentication/authorization to make the API more secure and robust.
  
  
  
  
  
//   Regenerate response
  