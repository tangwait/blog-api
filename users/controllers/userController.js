const bcrypt = require('bcryptjs');
const prismaFunction = require("../models/userModel");
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


async function getUserInfo(req, res) {
    console.log("Headers received:", req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        console.log("Decoded Token: ", decoded);

        if (!userId) {
            return res.status(400).json({ error: "Invalid token: Missing userId" });
        }

        const user = await prismaFunction.findUserId(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ data: user });
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
}


module.exports = {
    loadIndex,
    registerUser,
    loginUser,
    getUserInfo
}