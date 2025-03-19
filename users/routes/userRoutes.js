const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController');
const postController = require("../controllers/postController");
const { authenticationToken } = require("../middleware/authentication");

router.get('/', userController.loadIndex);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/posts', authenticationToken, postController.loadPosts);
router.post("/posts", postController.createPost);

router.get("/user-info", authenticationToken, userController.getUserInfo);

module.exports = router;