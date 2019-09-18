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



const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/unit18Populater";
//connect to Mongodb
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//routes

// Get route for scraping the nytimes website

app.get("/scrape", function (req, res) {
    axios.get("https://www.nytimes.com").then(function (response) {
        var $ = cheerio.load(response.data);
        // console.log($);
        // console.log(response.data);
        const articleArr = [];

        $('.assetWrapper').each(function (i, element) {
            const headline = $(this).find('h2').text().trim();
            const link = $(this).find('a').attr('href').trim();
            const summary = $(this).find('p').text().trim();

            const article = {
                title: headline,
                link,
                summary
            }

            if (article.title && article.link && article.summary) {
                articleArr.push(article);
            }

            console.log(article)
        })

        db.Article.insertMany(articleArr);

        res.json('scrape complete');

    })
});

app.get('/api/articles', function (req, res) {
    db.Article.find().then(dbModel => {
        res.json(dbModel);
    })
})
//  .populate()
app.get("/api/articles/:id", (req, res) => {
    const { id } = req.params;
    db.Article.find({
        _id: id
    })
        .populate("comments")
        .then(dbArticle => {
            res.json(dbArticle);
        });
});

app.get('/api/articles/:id', function (req, res) {
    console.log(req.params.id);
    db.Article.find({
        _id: req.params.id
    }).then(dbModel => {
        res.json(dbModel);
    })
})

app.post('/api/articles/:id', function (req, res) {
    db.Comment.create(req.body).then(function (comment) {
        res.json(comment);
    })
})

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
