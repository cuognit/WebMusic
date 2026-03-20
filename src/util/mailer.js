// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// async function sendEmail(email, otp) {
//     const info = await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is: ${otp}`,
//     });
// }

// module.exports = { sendEmail };
