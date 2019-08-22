var express = require("express");
var app = express();


app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        { name: "Salmon Creek", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_340.jpg" },
        { name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_340.jpg" },
        { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f732b72d0904ac1_340.jpg" }
    ];

    res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(3000, process.env.IP, function() {
    console.log("The YelpCamp server has started.");
});
