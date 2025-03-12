const prisma = require("../prisma");

async function createUser(email, hashedPassword) {
    return await prisma.user.create({
        data: {email, password: hashedPassword}
    })    
}

async function findUserEmail(email) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

module.exports = {
    createUser,
    findUserEmail
}