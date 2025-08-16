// controllers/resultController.js
const Result = require('../models/Result');
const User = require('../models/User'); 

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Result.findAll({
      attributes: ["subject"],
      group: ["subject"]
    });
    res.json({ success: true, data: subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all chapters for a subject
exports.getChaptersBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const chapters = await Result.findAll({
      attributes: ["chapter"],
      where: { subject },
      group: ["chapter"]
    });
    res.json({ success: true, data: chapters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get results for all students by subject & chapter
exports.getResultsBySubjectChapter = async (req, res) => {
  try {
    const { subject, chapter } = req.params;
    const results = await Result.findAll({
      where: { subject, chapter },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
      order: [["createdAt", "DESC"]]
    });
    res.json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
