const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;
const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        role: { type: String, default: 'user' },
        slug: { type: String, slug: 'name', unique: true },
        verified: { type: Boolean, default: false },
        playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        statusLogin: { type: Boolean, default: false },

    },
    { timestamps: true },
);

User.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // 10 vòng hash
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

mongoose.plugin(slug);
module.exports = mongoose.model('User', User);
