var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Welcome to Bambank');
});
app.listen(5000, function (err) {
    if (!err)
        console.log("application running");
    else console.log(err)
});