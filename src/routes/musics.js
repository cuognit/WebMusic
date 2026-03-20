const express = require('express');
const musicController = require('../app/controllers/MusicController');
const blockLoginIfLogedin = require('../app/middlewares/blockLoginIfLogedin');
const router = express.Router();

router.get('/', musicController.index);
router.get('/auth', blockLoginIfLogedin,musicController.index);
// router.get('/:fileUrl', musicController.show);
module.exports = router;
