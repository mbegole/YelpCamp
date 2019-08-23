var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seeds = require("./seeds");
var app = express();

var config = JSON.parse(fs.readFileSync('./config.json', 'UTF-8'));

mongoose.connect(config.connectionString);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

seeds();

app.get("/", function(req, res) {
    res.render("landing");
});

// Campgrounds INDEX
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// Campgrounds CREATE
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var newCampground = { name: name, image: image, description: description };

    Campground.create(newCampground, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campground created: ");
            console.log(campground);
        }
    });

    res.redirect("/campgrounds");
});

// Campgrounds NEW
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// Campgrounds SHOW
app.get("/campgrounds/:id", function(req, res) {
    var campground = Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, currentCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: currentCampground });
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })
});

app.listen(3000, process.env.IP, function() {
    console.log("The YelpCamp server has started.");
});
