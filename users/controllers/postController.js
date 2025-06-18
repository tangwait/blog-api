const prismaFunction = require("../models/postModel");
const jwt = require('jsonwebtoken');

async function loadUserDrafts(req, res) {
    try {
        const userId = req.user.userId;

        const drafts = await prismaFunction.getDrafts(userId);
        console.log("Drafts found:", drafts);
        res.json({ drafts });

    } catch (error) {
        console.error("Load Drafts Error:", error);
        res.status(403).json({ error: "Failed to load drafts" });
    }
}

async function saveUserDraft(req, res) {
    try {
        const { postText, published } = req.body;
        const userId = req.user.userId;

        const draft = await prismaFunction.saveDraft(userId, postText, published);

        res.status(201).json({ message: "Draft saved", draft });
    } catch (error) {
        console.error("Save Draft Error:", error);
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

async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { postText } = req.body;

        const post = await prismaFunction.updatePost(id, postText);
        
        res.json({ message: "Post updated", post });
    } catch (error) {
        res.status(500).json({ error: "Failed to update post" });
    }
}

async function loadPosts(req, res) {
    try {
        const posts = await prismaFunction.getPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to load posts" })
    }
}

module.exports = {
    loadUserDrafts,
    saveUserDraft,
    updateDraft,
    updatePost,
    loadPosts,
};
