const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden authentication" }); 
        console.log("Decoded user:", user);
        console.log("Decoded user from token:", user);
        req.user = user;
        next();
    });
}


module.exports = {
    authenticateToken
}