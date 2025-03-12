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
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prismaFunction.createUser(email, hashedPassword);
        console.log(user);

        res.json({
            message: "User registered",
            user: { id: user.id, email: user.email, createdAt: user.createdAt},
        });
    } catch (error) {
        console.error("Cannot register user:", error);
        res.status(500).json({ error: 'Cannot register user' });
    }
}

async function loginUser(req, res) {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) { 
            console.error('Error during authentication:', err);
            return next(err);
            }

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            req.LogIn(user, (loginError) => {
                if (loginError) {
                    console.error('Login failed:', loginError);
                    return next(loginError);
                }
            })

            const token = jwt.sign(
                { userId: user._id },
                dogs,
                { expiresIn: '5h'}
            );

            return res.status(200).json({
                message: 'Login successful',
                token: token
            });
        }) (req, res, next);
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