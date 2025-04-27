const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController');
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authentication");

router.get('/', userController.loadIndex);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get("/user-info", authenticateToken, userController.getUserInfo);

router.get('/posts', authenticateToken, postController.loadPosts);
router.post("/posts", authenticateToken, postController.createPost);


router.get("/drafts", authenticateToken, postController.loadUserDrafts);
router.post("/drafts", authenticateToken, postController.saveUserDraft);
router.put("/drafts/:id/", authenticateToken, postController.updateDraft);

module.exports = router;