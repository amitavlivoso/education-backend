const Student = require('../models/Student');
const User = require("../models/User");
const Result = require('../models/Result');

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

//...result  save

exports.saveResult = async (req, res) => {
  try {
    const { examId, userId, attempted, correct, wrong, unattempted, total, status,subject,chapter } = req.body;

    if (!examId || !userId) {
      return res.status(400).json({ success: false, message: "examId and userId are required" });
    }

    const saved = await Result.create({
      examId,
      userId,
      attempted,
      correct,
      wrong,
      unattempted,
      total,
      status,
      subject,
      chapter,
      teacherId
    });

    res.status(200).json({ success: true, message: "Result saved", result: saved });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getResultsByUserId = async (req, res) => {
  try{
    const {userId} =  req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }
   const results = await Result.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, message: "No results found for this user" });
    }

    return res.status(200).json({ success: true, results });
    
   
  }catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}