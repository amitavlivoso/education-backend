const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const sendOtpEmail=require('../utils/mailer')

exports.register = async (req, res) => {
    try {
        const { name, email, password ,phone,role } = req.body;
        if (!name || !email || !password,!phone) {
            return res.json({
                message: "Please fill all the fields",
                success: false,
            })
        }

        const exitingUser = await User.findOne({ where: { email } });
        if (exitingUser) {
            return res.json({
                message: "USer alredy exists",
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

        
        await sendOtpEmail(email, otp);
        const newuser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            otp,
            otpExpiry,
            isVerified: false
        });

    res.status(200).json({
      message: "User registered. OTP sent to email.",
      success: true
    });

    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

 
    if (user.otp !== otp || new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP", success: false });
    }
       if (user.isVerified) {
      return res.json({ message: "User already verified", success: true });
    }

    user.isVerified = true;

    // user.otp = null;
    // user.otpExpiry = null;
    await user.save();

    res.json({ message: "OTP verified successfully", success: true });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return res.status(400).json({ message: "invelid credential and password not match" }) }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.json({
            message: "Login Successfull",
            success: true,
            token, user
        })
    } catch (error) {
        console.log("login faild", error)
        res.json({
            messag: "login faild",
            success: false,
            error: true
        })
    }
}

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent to your email for password reset.", success: true });
  } catch (error) {
    console.error("Request Password Reset Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP", success: false });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful", success: true });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};