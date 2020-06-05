const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const name = req.body.cityname;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=32776cb31c64ee6252f1a0c5d7cb604c&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);

      const tempp = weatherdata.main.temp;
      const imageurl =
        "http://openweathermap.org/img/wn/" +
        weatherdata.weather[0].icon +
        "@2x.png";
      const desc = weatherdata.weather[0].description;

      res.write("<p>The Weather is currently " + desc + "</p>");
      res.write("<h1>Current temperature is " + tempp + " degree celsius</h1>");
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});
app.listen(3000, function (res, req) {
  console.log("Server started at 3000");
});
