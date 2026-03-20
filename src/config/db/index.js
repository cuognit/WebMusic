const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('Database connected successfully!!!');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

module.exports = { connect };
