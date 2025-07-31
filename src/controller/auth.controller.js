const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendOtpEmail = require("../utils/mailer");
const cloudinary = require("../utils/cloudinary");

exports.register = async (req, res) => {
    try {
        const { name, email, password ,phone,role } = req.body;
        if (!name || !email || !password,!phone) {
            return res.json({
                message: "Please fill all the fields",
                success: false,
            })
        }
const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOtpEmail(email, otp);
    const newuser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      otp,
      otpExpiry,
      isVerified: false,
    });

    res.status(200).json({
      message: "User registered. OTP sent to email.",
      success: true,
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
      return res
        .status(400)
        .json({ message: "Invalid or expired OTP", success: false });
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
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "invelid credential and password not match" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: "Login Successfull",
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log("login faild", error);
    res.json({
      messag: "login faild",
      success: false,
      error: true,
    });
  }
};

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

    res.json({
      message: "OTP sent to your email for password reset.",
      success: true,
    });
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
      return res
        .status(400)
        .json({ message: "Invalid or expired OTP", success: false });
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

exports.uploadFilesFromForm = async (req, res) => {
  try {
    const files = req.files;
    console.log(req.files);
    console.log(req.file);

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadResults = [];

    await Promise.all(
      files.map((file, i) => {
        return new Promise((resolve, reject) => {
          const ext = file.originalname.split(".").pop().toLowerCase();

          let resource_type = "auto";
          if (["mp4", "avi", "mov", "webm"].includes(ext))
            resource_type = "video";
          else if (["pdf", "docx", "txt"].includes(ext)) resource_type = "raw";
          else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
            resource_type = "image";

          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type,
              public_id: `file_${Date.now()}_${i}`,
            },
            (err, result) => {
              if (err) return reject(err);
              uploadResults.push({
                original: result,
                url: result.secure_url,
              });
              resolve();
            }
          );

          uploadStream.end(file.buffer);
        });
      })
    );

    res.json({ files: uploadResults });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload failed: " + err.message });
  }
};
