const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController');

router.get('/', userController.loadIndex);
router.post('/register', userController.registerUser);





module.exports = router;