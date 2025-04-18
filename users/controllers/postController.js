const prismaFunction = require("../models/postModel");
const jwt = require('jsonwebtoken');

async function loadPosts(req, res) {
    try {
        const posts = await prismaFunction.getPosts();

        res.json({
            data: posts
        });

    } catch (error) {
        res.status(500).json("Can't load posts")
    }
}

async function loadUserDrafts(req, res) {
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
        const drafts = await prismaFunction.getDrafts(userId)
        res.json({ data: drafts });

    } catch (error) {
        console.log("JWT Error:", error);
        res.status(403).json({ error: "Invalid or expired token" });
    }
}


async function createPost(req, res) {
    try {
        const { user, postText } = req.body;
        
        if (!user || !postText) {
            return res.status(400).json({ error: "User and postText are required" });
        }

        console.log("Creating post with:", { user, postText });

        const post = await prismaFunction.saveDraft(user, postText);
        res.json({ message: "Post created successfully", post });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Can't create post" });
    }
}

async function saveUserDraft(req, res) {
    try {
        console.log("Decoded req.user:", req.user);
        console.log("Type of req.user:", typeof req.user);
        console.log("req.user.userId:", req.user.userId);
        
        const { postText } = req.body;
        const userId = req.user.userId;

        const draft = await prismaFunction.saveDraft(userId, postText);

        res.status(201).json({ message: "Draft saved", draft });
    } catch (error) {
        res.status(500).json({ error: "Failed to save draft" });
    }
}

async function publishDraft(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const updatedPost = await prismaFunction.publish(id, userId)
        if (updatedPost.count === 0) {
            return res.status(403).json({ error: "Draft not found or unauthorized" });
        }
        
        res.json({ message: "Draft published", updatedPost });
    }   catch (error) {
        res.status(500).json({ error: "Failed to publish draft" });
    } 
}

module.exports = {
    loadPosts,
    createPost,
    loadUserDrafts,
    saveUserDraft,
    publishDraft,
}