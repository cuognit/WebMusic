const express = require('express');
const userController = require('../app/controllers/UserController');
const blockLoginIfLogedin = require('../app/middlewares/blockLoginIfLogedin');
const router = express.Router();

router.post('/watched/:id', userController.watched);
router.get('/favorites', userController.favorites);
router.get('/history', userController.history);
router.post('/like/:id', userController.like);



module.exports = router;
