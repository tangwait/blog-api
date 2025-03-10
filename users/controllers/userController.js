const bcrypt = require('bcryptjs');
const prismaFunction = require("../models/userModel");


function loadIndex(req, res) {
    res.json({ message: "backend works" });
};

async function registerUser(req, res) {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prismaFunction.createUser(email, hashedPassword);
        console.log(user);

        res.redirect('/login');
    } catch (error) {
        console.error("Cannot register user:", error);
        res.status(500).json({ error: error.message || "Cannot register user" });
    }
}



module.exports = {
    loadIndex,
    registerUser
}