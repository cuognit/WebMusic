const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Otp = new Schema({
    email: { type: String, required: true },
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});
Otp.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Otp', Otp);
