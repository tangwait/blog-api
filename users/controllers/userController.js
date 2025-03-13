const bcrypt = require('bcryptjs');
const prismaFunction = require("../models/userModel");
const passport = require('passport');
require("../passportConfig");
const jwt = require('jsonwebtoken');

function loadIndex(req, res) {
    res.json({ message: "backend works" });
};

async function registerUser(req, res) {
    try {
        const { email, password, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const { user, token } = await prismaFunction.createUser(email, hashedPassword, username);
        console.log(user);

        return res.status(201).json({
            message: 'User created successfully',
            user: user,
            token: token,
        });
    } catch (error) {
        console.error("Cannot register user:", error);
        res.status(500).json({ error: 'Cannot register user' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await prismaFunction.findUserEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const JWT_SECRET = process.env.JWT_SECRET;

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: '5h'}
         );

        return res.status(200).json({
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        console.error("Can't login:", error);
        res.status(500).json({ error: "Can't login user"});
    }
}

module.exports = {
    loadIndex,
    registerUser,
    loginUser
}