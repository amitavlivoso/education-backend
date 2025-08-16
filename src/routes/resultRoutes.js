// routes/resultRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllSubjects,
  getChaptersBySubject,
  getResultsBySubjectChapter
} = require("../controller/resultController");

router.get("/subjects", getAllSubjects);
router.get("/chapters/:subject", getChaptersBySubject);
router.get("/allresults/:subject/:chapter", getResultsBySubjectChapter);

module.exports = router;
