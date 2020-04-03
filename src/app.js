const path = require("path");
const express = require("express");
const hbs = require("hbs");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials/");

//Setup handlebars Engine, Views location and Registering Partials

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve!
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Avinash Kumar"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Avinash Kumar"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Here helps are provided!",
    name: "Avinash Kumar"
  });
});

app.get("/weather", (req, res) => {

  if (!req.query.location) {
    return res.send({
      error: "You must provide an location to view weather!"
    });
  }
  axios.get("http://api.weatherstack.com/forecast?access_key=7c5acd54f8b392ee18559033456c9c49&query="+req.query.location).then(response => {
    return response.data;
  }).then((data)=>{
    res.send({
        forecast: `The current temperature is ${data.current.temperature}. There is ${data.current.precip}% chance for rain.`,
        location: req.query.location,
        region: data.location.region,
        country: data.location.country
      });
  }).catch((err)=>{
      return res.send({
          error: 'Unable to find location. Please try again with a valid input.'
      });
  })
});

// app.get("/products", (req, res) => {

//   if(!req.query.search){
//     return res.send({
//         error: 'You must provide a search term'
//     })
//   }
//   res.send({
//     products: []
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Avinash Kumar",
    errorMessage: "Article not found!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Avinash Kumar",
    errorMessage: "Page not found!"
  });
});

app.listen(port, () => {
  console.log("Application started listening!");
});
