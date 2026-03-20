
const {multipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')
const Song = require('../models/Songs');

class AdminController {
    // [GET] /dashboard
    async Dashboard(req, res) {
        try{
            const songs = await Song.find({});
            const totalViews = songs.reduce((total, song) => total + song.views, 0);
            const totalLikes = songs.reduce((total, song) => total + song.likes, 0);    
            const totalTracksCount = songs.length;
            const topTracks =JSON.parse(JSON.stringify(songs)).sort((a, b) => b.views - a.views).slice(0, 10);
            //songs.sort((a, b) => b.views - a.views).slice(0, 10);

            res.render('pages/admin/dashboard',{
                songs: multipleMongooseToObject(songs),
                totalViews,
                totalLikes,
                totalTracksCount,
                topTracks,
                title: ' Admin' + ' | ' + 'Dashboard',
                layout:'admin'});
        }
        catch(err){
            console.log(err);
        } 
    }
    // [GET] /songManage
   async SongManage(req, res, next) {
        try{
            const songs = await Song.find({});
            res.render('pages/admin/songManage', {
                songs: multipleMongooseToObject(songs),
                title: ' Admin' + ' | ' + 'Song Management',
                layout: 'admin'
            });
        } catch (err) {
            next(err);
            res.status(500).send('Lỗi khi lấy danh sách bài hát');
        }
    }
    // [POST] /addSong
    async AddSong(req, res, next) {
        try{
            const {title, artist, genre, year, fileUrl, album, description} = req.body;
            const song = new Song({title, artist, genre, year, fileUrl, album, description, image: 'https://i.ytimg.com/vi/' + fileUrl + '/hqdefault.jpg'});
            await song.save();
            res.json({success:true,message: 'Thêm thành công'})
        }
        catch (err) {
            next(err);
        }
    }
    // [GET] /setting
    Setting(req, res) {
        res.render('pages/admin/setting',{title: ' Admin' + ' | ' + 'Settings',layout:'admin'});
    }
    // [GET] /trashManage
    async TrashManage(req, res, next) {
        try{
            const songs = await Song.findWithDeleted({deleted: true});
            res.render('pages/admin/trashManage', {
                songs: multipleMongooseToObject(songs),
                title: ' Admin' + ' | ' + 'Trash Management',
                layout: 'admin'
            });
        } catch (err) {
            next(err);
        }
    }
    // [PATCH] /deleteSong/:id
    async DeleteSong(req, res, next) {
        try{
            const id = req.params.id;
            await Song.findByIdAndUpdate(id,{
                deleted: true,
                deletedAt: new Date()
            });
            res.json({success: true,message: 'Xóa thành công'});
        }
         catch (err) {
            next(err);
        }
    }
    // [PATCH] /restoreSong/:id
    async RestoreSong(req, res, next) {
        try{

            let ids = req.params.id;
            if(typeof ids === 'string'){
                ids = ids.split(',').map(id => id.trim()).filter(Boolean);
            }
            await Song.restore({_id: {$in: ids}});
            res.json({success: true,message: 'Khôi phục thành công'});
        }
         catch (err) {
            next(err);
        }
    }
    // [DELETE] /destroySong/:id
    async DestroySong(req, res, next) {
        try{
           let ids = req.params.id;
            if(typeof ids === 'string'){
                ids = ids.split(',').map(id => id.trim()).filter(Boolean);
            }
            await Song.deleteMany({_id: {$in: ids}});
            res.json({success: true,message: 'Xóa vĩnh viễn thành công'});
        }
         catch (err) {
            next(err);
        }
    }
    // [PUT] /editSong/:id
    async EditSong(req, res, next) {
        try{          
            const {title, artist, genre, year, fileUrl, album, description} = req.body; 
            await Song.updateOne({_id: req.params.id},
                {
                    title,
                    artist,
                    genre,
                    year,
                    fileUrl,
                    album,
                    image: 'https://i.ytimg.com/vi/' + fileUrl + '/hqdefault.jpg',
                    description,
                }
            );
            res.json({success: true,message: 'Cập nhật thành công'});
        }
        catch(err){
            next(err);
        }
    }
    // [PATCH] /deleteManySong/:dataid
    async DeleteManySong(req, res, next) {
        try{
            let ids = req.params.id;
            if(typeof ids === 'string'){
                ids = ids.split(',').map(id => id.trim()).filter(Boolean);
            }
            await Song.updateMany(
                {_id: {$in: ids} },
                {
                deleted: true,
                deletedAt: new Date()
                });
            res.json({success: true,message: 'Xóa thành công'});
        }
         catch (err) {
            next(err);
        }
    }

}

module.exports = new AdminController();