var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require('../models/user');

// Root Route
router.get("/", function(req, res) {
    res.render("landing");
});

// Register route
router.get("/register", function(req, res) {
    res.render("register");
});

// Register POST
router.post("/register", function(req, res) {
    var newUser = new User( {username: req.body.username });
    
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        } 
        
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

// Login route
router.get("/login", function(req, res) {
    res.render("login");
});

// Login POST
router.post("/login", passport.authenticate("local", { successRedirect: "/campgrounds", failureRedirect: "/login" }), function(req, res) {
});

// Logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.flash("success", "You are now signed out!");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

module.exports = router;
