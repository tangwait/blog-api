const prismaFunction = require("../models/postModel");

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

async function createPost(req, res) {
    try {
        const { user, postText } = req.body;
        if (!user || !postText) {
            return res.status(400).json({ error: "User and postText are required" });
        }

        const post = await prismaFunction.createPost(user, postText);
        res.json({ message: "Post created successfully", post });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Can't create post" });
    }
}

module.exports = {
    loadPosts,
    createPost
}