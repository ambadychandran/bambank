exports.dashboard = function(req, res) {
    console.log(req)
    let fullName  =  `${req.user.firstname} ${req.user.lastname}`
    res.render('dashboard',{
        displayName: fullName,
    })
};