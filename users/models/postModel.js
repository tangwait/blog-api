const prisma = require("../prisma");

async function getPosts() {
    const posts = await prisma.post.findMany();
    return posts;
}

async function createPost(user, postText) {
    return await prisma.post.create({
        data: {
            user,
            postText,
            postTime: new Date()
        }
    });
}

module.exports = {
    getPosts,
    createPost
}