function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Can't find user")
    res.redirect("/login");
}

module.exports = {
    isAuthenticated
}