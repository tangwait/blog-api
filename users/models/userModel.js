const prisma = require("../prisma");

async function createUser(email, hashedPassword) {
    return await prisma.user.create({
        data: {email, password: hashedPassword}
    })    
}

module.exports = {
    createUser
}