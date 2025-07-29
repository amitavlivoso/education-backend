const Student = require('../models/Student');
const User = require("../models/User");

exports.updateStudentProfile = async (req, res) => {
  try {
    const {
      userId,
      enrollmentNumber,
      address,
      bankDetails,
      socialMediaLink,
      education,
      parentInfo,
      name,
      phone
    } = req.body;

    // Find user and student
    const user = await User.findOne({ where: { id: userId, role: 'student' } });
    if (!user) return res.status(404).json({ message: "Student not found" });

    // Update user fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    await user.save();

    // Update or create student profile
    let student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      student = await Student.create({
        userId: user.id,
        enrollmentNumber,
        address,
        bankDetails,
        socialMediaLink,
        education,
        parentInfo
      });
    } else {
      if (enrollmentNumber !== undefined) student.enrollmentNumber = enrollmentNumber;
      if (address !== undefined) student.address = address;
      if (bankDetails !== undefined) student.bankDetails = bankDetails;
      if (socialMediaLink !== undefined) student.socialMediaLink = socialMediaLink;
      if (education !== undefined) student.education = education;
      if (parentInfo !== undefined) student.parentInfo = parentInfo;
      await student.save();
    }

    res.json({ message: "Student profile updated successfully", success: true, user, student });
  } catch (error) {
    console.error("Update Student Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};