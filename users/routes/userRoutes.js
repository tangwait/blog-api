const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController');

router.get('/', userController.loadIndex);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/blogPosts', userController.loadPosts);

module.exports = router;