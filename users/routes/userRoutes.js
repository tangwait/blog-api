const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController');
const postController = require("../controllers/postController");

router.get('/', userController.loadIndex);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/posts', postController.loadPosts);
router.post("/posts", postController.createPost);


module.exports = router;