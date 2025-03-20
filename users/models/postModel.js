const prisma = require("../prisma");

async function getPosts() {
    const posts = await prisma.post.findMany({
        where: { published: true, },
        include: { user: true },
        orderBy: { postTime: "desc" }
    });
    return posts;
}

async function createPost(userId, postText) {
    return await prisma.post.create({
        data: {
            userId,
            postText,
            published: true,
        }
    });
}

async function getDrafts(userId) {
    return await prisma.post.findMany({
        where: {
            userId: userId,
            published: false,

        }
    })    
}

async function saveDraft(userId, postText) {
    return await prisma.post.create({
        data: {
            userId,
            postText,
            published: false,
        }
    });
}

module.exports = {
    getPosts,
    createPost,
    getDrafts,
    saveDraft
}