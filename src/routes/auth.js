const express = require('express');
const authController = require('../app/controllers/AuthController');

const router = express.Router();

router.post('/logout', authController.Logout);
router.post('/login', authController.Login);
router.post('/register', authController.Register);


module.exports = router;