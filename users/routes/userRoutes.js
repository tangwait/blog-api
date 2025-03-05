const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController');

router.get('/', userController.loadIndex);






module.exports = router;