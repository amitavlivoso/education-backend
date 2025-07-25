const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOtpEmail = async (to, otp) => {

    const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "OTP Verification",
    html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`
  });
};

module.exports = sendOtpEmail;
