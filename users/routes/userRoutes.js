const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController');
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authentication");

router.get('/', userController.loadIndex);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/posts', authenticateToken, postController.loadPosts);
router.post("/posts", postController.createPost);

router.get("/user-info", authenticateToken, userController.getUserInfo);


router.get("/drafts", postController.loadUserDrafts);
router.post("/drafts", postController.saveUserDraft);
module.exports = router;