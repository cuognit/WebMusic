const { createClient } = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
    url: redisUrl,
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

// Connect using promise API so this file works under CommonJS (no top-level await)
redisClient.connect().catch((err) => {
    console.error('Redis connection failed:', err);
});

module.exports = redisClient;
