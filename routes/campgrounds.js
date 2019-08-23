var express = require("express");
var router = express.Router();
var Campground = require('../models/campground');

// Campgrounds INDEX
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// Campgrounds CREATE
router.post("/", function(req, res) {
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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

// Campgrounds SHOW
router.get("/:id", function(req, res) {
    var campground = Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

module.exports = router;
