const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var cityName = req.body.cityName;
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&appid={Your api key}";
  https.get(url, (response) => {
    console.log(response);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temperature = weatherData.main.temp;
      const pressure = weatherData.main.pressure;
      const humidity = weatherData.main.humidity;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>Currently the weather is " + description + "</p>");
      res.write(
        "<h1>The Temperature in " +
          cityName +
          " is " +
          temperature +
          " degree celcius.</h1>"
      );
      res.write("<h1>The humidity is " + humidity + " .</h1>");
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });
});

app.listen(30000, () => {
  console.log("server is running in port 3000");
});
