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

    res.render("search", {
        errMsg: ""
    });

});

app.post("/", (req, res) => {

    const cityName = req.body.cityname;

    const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + process.env.API_KEY + "&units=metric&cnt=16";
    https.get(url, (response) => {
        
        response.on("data", (d) => {

            try {
                const weatherData = JSON.parse(d);
                const fullName = new Intl.DisplayNames(['en'], { type: 'region' });
                const country = fullName.of(weatherData.city.country);
                // const iconurl = "./images/weather icons/"+iconId+".svg";
                // const icon1 = "./images/weather icons/"+weatherData.list[3].weather[0].icon+".svg";

                res.render("index", {
                    date: date(),
                    weatherData: weatherData.list,
                    city: weatherData.city.name,
                    country: country
            
                });
            }
            catch(err){
                const errMsg = "Enter a valid city name";
                return res.render("search", {
                    errMsg: errMsg
                });
            }
        })
    });

});

app.use((req, res, next) => {
    res.status(404).render("error");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
    console.log("server running on port 3000");
});
