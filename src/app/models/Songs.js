const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;
const Song = new Schema(
    {
        title: { type: String, required: true },
        artist: { type: String, required: true },
        album: { type: String },
        genre: { type: String },
        year: { type: Number },
        fileUrl: { type: String, required: true },
        slug: { type: String, slug: 'title', unique: true },
        image: { type: String },
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        description: { type: String },
    },
    { timestamps: true },
);

mongoose.plugin(slug);
Song.plugin(mongoose_delete, {
   deletedAt : true,
   overrideMethods: 'all',
  
});
Song.index({ deletedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });
module.exports = mongoose.model('Song', Song);