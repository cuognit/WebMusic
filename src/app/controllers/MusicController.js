const {multipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')

const Song = require('../models/Songs');
const User = require('../models/Users');

class MusicsController {
    // [GET] /musics
  async  index(req, res, next) {
        try {            
            const user = req.session.user ? await User.findById(req.session.user._id) : null;   
            const songs = await Song.find();
            const favorites = user ? user.favorites.map(id => id.toString()) : [];
            const songsWithFav = songs.map(song => {
                return {
                    ...song.toObject(),
                    isFavorite: favorites.includes(song._id.toString())
                }
            });
            res.render('pages/client/home',{songs: songsWithFav, title: ' NMusiC' + ' | ' + 'Home'});
        } catch (error) {
            next(error);
        }
    }
    // [GET] /musics/:slug
    async  show(req, res, next) {
            try {
                const song = await Song.findOne({ slug: req.params.slug });
                if (!song) {
                    return res.redirect('/');
                }
                res.render('pages/client/home', { song: mongooseToObject(song),title: ' NMusiC' + ' | ' + song.title});
            } catch (error) {
                next(error);
            }
    }
}

module.exports = new MusicsController();
