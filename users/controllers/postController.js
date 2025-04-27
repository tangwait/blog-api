const prismaFunction = require("../models/postModel");
const jwt = require('jsonwebtoken');

async function loadUserDrafts(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId) {
            return res.status(400).json({ error: "Invalid token: Missing userId" });
        }
        const drafts = await prismaFunction.getDrafts(userId);
        res.json({ data: drafts });

    } catch (error) {
        console.log("JWT Error:", error);
        res.status(403).json({ error: "Invalid or expired token" });
    }
}

async function saveUserDraft(req, res) {
    try {
        const { postText } = req.body;
        const userId = req.user.userId;

        const draft = await prismaFunction.saveDraft(userId, postText);

        res.status(201).json({ message: "Draft saved", draft });
    } catch (error) {
        res.status(500).json({ error: "Failed to save draft" });
    }
}

async function updateDraft(req, res) {
    try {
        const { id } = req.params;
        const { postText, published } = req.body;

        const draft = await prismaFunction.updateDraft(id, postText, published);
        
        res.json({ message: "Draft updated", draft });
    } catch (error) {
        res.status(500).json({ error: "Failed to update draft" });
    }
}

module.exports = {
    loadUserDrafts,
    saveUserDraft,
    updateDraft,
};
