var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

///Require all models
var db = require("./models");

var PORT = 7000;

//initialize express
var app = express();

//configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//connect to Mongodb
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

//routes

//A Get route for scraping the nytimes website

app.get("/scrape", function (req, res) {
    axios.get("http://www.nytimes.com").then(function (response) {
        var $ = cheerio.load(response.data);


    })
});
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
