const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require(__dirname+'/utils/geocode.js');
const forecast = require(__dirname+'/utils/forecast.js');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views',viewsPath);

app.get('', (req, res) => {
    return res.render('index');
  
});
app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
        error:'Please provide an address'
     });
   }
   
     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error){
         return res.send({
             error:error
          });
       }
      
       forecast(latitude,longitude,(error,forecastdata)=>{
         if(error){
             return res.send({
                 error:error
              });
         }
       
         res.send({
             
             forecast: forecastdata.info,
             temperature: forecastdata.temperature,
             feelslike: forecastdata.feelslike,
             localtime: forecastdata.localtime,
             icon: forecastdata.icon,
             location,
             address:req.query.address
         });
      
       });
       
     });
})
app.listen(3000, () => {
console.log('Server is up on port 3000.')
})