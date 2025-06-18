const prisma = require("../prisma");

async function getPosts() {
    const posts = await prisma.post.findMany({
        where: { published: true, },
        include: { user: true },
        orderBy: { postTime: "desc" }
    });
    return posts;
}

async function saveDraft(userId, postText, published) {
    return await prisma.post.create({
        data: {
            userId,
            postText,
            published: published,
            postTime: new Date(),
        },
        include: { user: true },
    });
}

async function updateDraft(id, postText, published) {
    return await prisma.post.update({
        where: { id },
        data: { 
            postText,
            published: published,
            postTime: new Date(),
        },
    });
}

async function updatePost(id, postText) {
    return await prisma.post.update({
        where: { id },
        data: { 
            postText,
            edited: true,
            postTime: new Date(),
        },
    });
}

async function getDrafts(userId) {
    return await prisma.post.findMany({
        where: {
            userId: userId,
            published: false,
        },
        orderBy: { postTime: "desc" }
    })    
}

async function publish(id, userId) {
    return await prisma.post.updateMany({
        where: { 
            id: parseInt(id),
            userId: userId,
            published: false,
        },
        data: { published: true }
    })    
}

module.exports = {
    getPosts,
    saveDraft,
    updateDraft,
    updatePost,
    getDrafts,
    publish,
}