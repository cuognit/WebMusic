const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Playlist = new Schema({
    name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    description: { type: String },
    image: { type: String },
    

});
Otp.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Playlist', Playlist);
