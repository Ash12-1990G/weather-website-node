const request = require('postman-request');
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=76425255a23d02935d23f3fc0704320a&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f';
    //console.log(url)
    request({url,json:true}, (error, response, body) => {
        if(error){
            callback('Unable to connect to weather service',undefined); // Print the error if one occurred
          
        }
        else if(body.error){
            callback(body.error.info,undefined);
        }
        else{
          
            callback(undefined,{
                info:body.current.weather_descriptions+". There is currently "+body.current.temperature+" degrees out. There is a "+ body.current.precip +"% chance of rain",
                icon: body.current.weather_icons[0],
                feelslike: body.current.feelslike,
                temperature: body.current.temperature,
                localtime:body.current.localtime

            });
          
        }
         
    });
}
module.exports = forecast;