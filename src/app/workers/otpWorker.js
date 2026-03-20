// const { Worker } = require('bullmq');
// const dotenv = require('dotenv');
// const { sendEmail } = require('../../util/mailer');
// const { otpQueue } = require('../queues/otpQueue');
// const nodemailer = require('nodemailer');
// dotenv.config();

// const worker = new Worker(
//     'otpQueue',
//     async (job) => {
//         const { email, otp } = job.data;
//         await sendEmail(email, otp);
//         console.log(`✅ Sent OTP to ${email}`);
//     },
//     { connection: { url: process.env.REDIS_URL } },
// );

// worker.on('failed', (job, err) => {
//     console.error(`❌ Job ${job.id} failed:`, err);
// });
// process.stdin.resume();
// module.exports = { worker };
