require("dotenv").config()
const express = require("express");
const ejs = require("ejs");
const https = require("https");
const { dirname } = require("path");

const date = require(__dirname + "/date.js");

app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {

    res.render("search");

});

app.post("/", (req, res) => {

    const cityName = req.body.cityname;

    const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + process.env.API_KEY + "&units=metric&cnt=16";
    https.get(url, (response) => {
        
        response.on("data", (d) => {

            const weatherData = JSON.parse(d);
            const climate = weatherData.list[0].weather[0].main;
            const fullName = new Intl.DisplayNames(['en'], { type: 'region' });
            const country = fullName.of(weatherData.city.country);
            const iconId = weatherData.list[0].weather[0].icon;
            const iconurl = "./images/weather icons/"+iconId+".svg";
            const icon1 = "./images/weather icons/"+weatherData.list[3].weather[0].icon+".svg";
            const icon2 = "./images/weather icons/"+weatherData.list[7].weather[0].icon+".svg";
            const icon3 = "./images/weather icons/"+weatherData.list[11].weather[0].icon+".svg";
            const icon4 = "./images/weather icons/"+weatherData.list[15].weather[0].icon+".svg";

            res.render("index", {
                date: date(),
                climate: climate, 
                discription: weatherData.list[0].weather[0].description, 
                city: weatherData.city.name,
                country: country,
                iconId: iconurl,
                icon1: icon1,
                icon2: icon2,
                icon3: icon3,
                icon4: icon4,
                mintemp: weatherData.list[0].main.temp_min,
                maxtemp: weatherData.list[0].main.temp_max,
                windSpeed: weatherData.list[0].wind.speed,
                humidity: weatherData.list[0].main.humidity,
                temp1: weatherData.list[0].main.temp, 
                temp2: weatherData.list[3].main.temp,
                temp3: weatherData.list[7].main.temp,
                temp4: weatherData.list[11].main.temp,
                temp5: weatherData.list[15].main.temp,
                day1: new Date(weatherData.list[3].dt_txt).toDateString().split(' ')[0],
                day2: new Date(weatherData.list[7].dt_txt).toDateString().split(' ')[0], 
                day3: new Date(weatherData.list[11].dt_txt).toDateString().split(' ')[0],
                day4: new Date(weatherData.list[15].dt_txt).toDateString().split(' ')[0],
                time1: new Date(weatherData.list[3].dt * 1000).toLocaleTimeString("en-US").replace(":00", ""),
                time2: new Date(weatherData.list[7].dt * 1000).toLocaleTimeString("en-US").replace(":00", ""),
                time3: new Date(weatherData.list[11].dt * 1000).toLocaleTimeString("en-US").replace(":00", ""),
                time4: new Date(weatherData.list[15].dt * 1000).toLocaleTimeString("en-US").replace(":00", "")   
            
            });

        })
    });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
    console.log("server running on port 3000");
});
