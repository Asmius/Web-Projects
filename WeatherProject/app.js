const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname +"/index.html");
})

app.post("/",function(req,res){

  const query = req.body.Cityname;
  const apikey="701d73756dcbac5f1eeac5497da995b0"
  const unit="metric"

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit
  https.get(url,function(response){
    console.log(response);

    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      const temperature =weatherdata.main.temp
      const description = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imgURL= "http://openweathermap.org/img/wn/"+icon+"10d@2x.png"
      res.write("<h1>The temperature of the "+query+" now is "+ temperature+" Degree Celcius</h1>")
      res.write("<p>The weathe currently is "+ description+"</p>")
      res.write("<img src="+imgURL+">");

    })
  })
})





app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
