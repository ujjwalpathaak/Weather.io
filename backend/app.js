const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "hbs");
app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    const query =  req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=76c9b4d2a16a4d4ad2dcc526dac1bb1f&q=" + query + "&units=metric";
    
    https.get(url, function(response){
        
        response.on("data", function(data){
            if(response.statusCode === 200){
                    const weatherData = JSON.parse(data);
                    console.log(weatherData);
                    const temp = weatherData.main.temp;
                    const location = weatherData.name;
                    const icon = weatherData.weather[0].icon;
                    const pressure = weatherData.main.pressure;
                    const humidity = weatherData.main.humidity;
                    const visibility = weatherData.visibility;
                    const windspeed = weatherData.wind.speed;
                    const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                    console.log(weatherData)
        
                    res.render("index", {
                        temp: temp,
                        location: location,
                        icon: imgURL,
                        pressure: pressure, 
                    humidity: humidity,
                    visibility: visibility,
                    Enterlocation: "Enter Location",
                    windspeed: windspeed,
                    });
                }
            else{
                res.render("failed", {
                    Enterlocation: "Try again",
                }); 
            }
            }
           
        )
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server running at 3000");
})