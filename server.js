/*************************************************************************
* BTI325 – Test - 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this assignment has been copied manually or electronically from any other source.
* (including 3rd party web sites) or distributed to other students.
*
* Name: Kelvin Vora Student ID: 157616210 Date: 19th Oct 2022
*
* Your app’s URL (from Cyclic Heroku) that I can click to see your application:
* https://periwinkle-tuxedo.cyclic.app 
*
*************************************************************************/

var express = require("express");
var exphbs = require('express-handlebars');

var app = express();

var HTTP_PORT = process.env.PORT || 8080;
var data = require("./data_prep.js");

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.engine('.hbs', exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
        navLink: function (url, options) {
            return '<li' +
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
                '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));
app.set("view engine", ".hbs");

app.use(function (req, res, next) {
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
})

app.get("/", function (req, res) {
    res.render('home');
});

app.get("/BSD", function (req, res) {
    data.getBSD().then((data) => {
        res.render("students", { students: data });
    }).catch((err) => {
        res.json({ ERROR: err });
    })
});

app.get("/highGPA", function (req, res) {
    data.highGPA().then((data) => {
        res.render("student", { student: data });
    }).catch((err) => {
        res.json({ ERROR: err });
    })
})

app.get("/allStudents", function (req, res) {
    data.allStudents().then((data) => {
        res.render("students", { students: data });
    }).catch((err) => {
        res.json({ ERROR: err });
    })
})

app.get("*", function (req, res) {
    res.send("Error 404: page not found.");
})

data.prepare().then(() => {
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log(err);
})