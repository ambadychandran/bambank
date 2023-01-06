var express = require('express');
var app = express();
// require modules for authentication
var passport = require('passport');
var session = require('express-session');

//middle for requests handle
app.use(express.urlencoded({
    extended: true
    })
);
app.use(express.json());
// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized:true
}));
// session secret
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

//config file
var env = require('dotenv').config();

//Models
var models = require("./app/models");
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database");
});

app.get('/', function (req, res) {
    res.send('Welcome to Bambank');
});
app.listen(5000, function (err) {
    if (!err)
        console.log("application running");
    else console.log(err)
});