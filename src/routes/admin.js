const express = require('express');
const adminController = require('../app/controllers/AdminController');
const router = express.Router();

router.patch('/deleteManySong/:id', adminController.DeleteManySong);
router.put('/editSong/:id', adminController.EditSong);
router.delete('/destroySong/:id', adminController.DestroySong);
router.patch('/restoreSong/:id', adminController.RestoreSong);
router.patch('/deleteSong/:id', adminController.DeleteSong);
router.post('/addSong', adminController.AddSong);
router.get('/trashManage', adminController.TrashManage);
router.get('/settings', adminController.Setting);    
router.get('/dashboard', adminController.Dashboard);
router.get('/songManage', adminController.SongManage);

module.exports = router;