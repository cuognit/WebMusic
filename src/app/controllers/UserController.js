const {multipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')
const User = require('../models/Users');
const Song = require('../models/Songs');

class UserController {
     // [GET] /favorites
       async favorites(req, res, next) {
            try{
                const user = await User.findById(req.session.user._id).populate('favorites').exec();
                res.render('pages/client/songFavourites', {
                    user: mongooseToObject(user),
                    title: 'NMusiC' + ' | ' + 'My Favorites',
                    
                });
            } catch (err) {
                next(err);
                res.status(500).send('Lỗi khi lấy danh sách bài hát');
            }
        }

    // [POST] /like/:id
    async like(req, res, next) {
        try {
            const songId = req.params.id;
            const userId = req.session.user._id;
            const user = await User.findById(userId);
            const song = await Song.findById(songId);
            if (!user.favorites.includes(songId)) {
                user.favorites.push(songId);
                await user.save();
                    song.likes = (song.likes || 0) + 1;
                    await song.save();
                res.json({ message: 'Bài hát đã được thêm vào yêu thích' });
            } else {
                user.favorites.pull(songId);
                await user.save();
                    song.likes = Math.max((song.likes || 1) - 1, 0);
                    await song.save();
                res.json({ message: 'Bài hát đã được xóa khỏi yêu thích' });

                    }
            req.session.user = user;
            req.session.save(); // Cập nhật session với thông tin người dùng mới nhất
        }
        catch (err) {
                next(err);
                res.status(500).json({ message: 'Lỗi khi thêm bài hát vào yêu thích' });
            }
        }
    
    // [GET] /history
        async history(req, res, next) {
            try{

                const user = await User.findById(req.session.user._id).populate('watched').exec();
                res.render('pages/client/songHistory', {
                    user: mongooseToObject(user),
                    title: 'NMusiC' + ' | ' + 'My History',
                    
                });
            } catch (err) {
                next(err);
                res.status(500).send('Lỗi khi lấy danh sách bài hát');
            }
        }
    // [POST] /watched/:id
    async watched(req, res, next) {
        try {
            const songId = req.params.id;
            const userId = req.session.user._id;
            const user = await User.findById(userId);
            const song = await Song.findById(songId);
            if (!user.watched.includes(songId)) {
                await user.updateOne({ $push: { watched:{ $each: [songId], $position: 0 } } });
                song.views = (song.views || 0) + 1;
                await song.save();
                res.json({ message: 'Bài hát đã được thêm vào lịch sử xem' });
            } else {
                await user.updateOne({ $pull: { watched: songId } });
                await user.updateOne({ $push: { watched:{ $each: [songId], $position: 0 } } });
                song.views = (song.views || 0) + 1;
                await song.save();
                res.json({ message: 'Bài hát đã có trong lịch sử xem' });
            }
            req.session.user = user;
            req.session.save(); 
        } catch (err) {
                next(err);
                res.status(500).json({ message: 'Lỗi khi thêm bài hát vào lịch sử xem' });
            }
        }
}

module.exports = new UserController();