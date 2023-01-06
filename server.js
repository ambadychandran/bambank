var express = require('express');
var app = express();
// require modules for authentication
var passport = require('passport');
var session = require('express-session');
//config file
var env = require('dotenv').config();
// view template
var exphbs = require('express-handlebars')

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

//Models
var models = require("./app/models");

// load the handlebars middlewear
// app.use(hbs.middleware({
//     viewPath: path.resolve(__dirname, './app/views'),
//     layoutsPath: path.resolve(__dirname, './app/views/layouts'),
//     defaultLayout: 'main'
//   }))


//For Handlebars
app.set('views', './app/views');
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: "./app/views/layouts/"
}));
app.set('view engine', '.hbs');

//Routes
var authRoute = require('./app/routes/auth.js')(app);

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