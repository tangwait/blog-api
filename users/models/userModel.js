const prisma = require("../prisma");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

async function createUser(email, hashedPassword, username) {
    const newUser = await prisma.user.create({
        data: { 
            email, 
            password: hashedPassword, 
            username, 
            sessionToken: "" 
        }
    });
    
    const token = jwt.sign(
        { userId: newUser.id },
        JWT_SECRET,
        { expiresIn: '5h' }
    );

    return { user: newUser, token };
}

async function findUserEmail(email) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

async function findUserId(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });
          
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        throw new Error("Database error");
    }
}


module.exports = {
    createUser,
    findUserEmail,
    findUserId
}