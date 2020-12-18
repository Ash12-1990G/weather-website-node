const request = require('postman-request');
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXNoZ2ciLCJhIjoiY2tpMzVuaG1vMjNoejJxbXBvdjY4Y2RyciJ9.7Urd4Nc3egJM2SshNCF8Cw&limit=1';
    request({url,json:true}, (error, response, body) => {
        if(error){
            callback('Unable to connect to location service',undefined); // Print the error if one occurred
        }
        else if(body.features.length===0){
            callback('Unable to find location. Try another search',undefined);
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
        
    });
}
module.exports = geocode;