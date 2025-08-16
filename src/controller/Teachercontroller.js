const teacherservice=require('../services/teacher.service.js')
const Question = require('../models/Questions.js');
const Exam = require("../models/Exam.js");
const StudyMaterial = require('../models/StudyMaterial.js');
const Result = require('../models/Result.js');
exports.createTeacher=async (req,res)=>{
try{
    const body=req.body
    const newTeacher=await teacherservice.addData(body)
    res.json({
        message:"Teacher add successfull",
        error:false,
        success:true,
        newTeacher
    })

}catch(error){
    res.status(400).json({
        message:'error in adding in Teacher ',
        error:error,
        success:false,
        error
    })
}
}
exports.getteacher=async (req,res)=>{
    try{
        const allTeacher =await teacherservice.getAllData()
        res.json({
            message:'Teacher fetched successfull',
            allTeacher
        })

    }catch(error){
       res.status(400).json({
        message:"error factiching the Teacher data",
        success:false,
        error:true
       })
    }
}
exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await teacherservice.getOneDataByCond(id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Teacher fetched successfully",
      teacher,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching teacher by ID",
      error: error.message,
      success: false,
    });
  }
};
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(body)

    const teacher =  teacherservice.updateData(id,body);
    console.log(teacher)
    res.json({
      message: "Teacher updated successfully",
      teacher,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating teacher",
      error: error.message,
      success: false,
    });
  }
};

exports.createExam = async (req, res) => {
  const { subjects, chapter, estimatedTime, totalCount, question,selectedExamType,teacher_id } = req.body;

  if (!subjects || !chapter || !estimatedTime || !totalCount || !Array.isArray(question)) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  try {
    const exam = await Exam.create({
      subject: subjects,
      chapter,
      estimated_time: estimatedTime,
      total_count: totalCount,
      selectedExamType,
      teacher_id: teacher_id
    });

    const examId = exam.id;

    const labeledQuestions = question.map(q => {
      const labeledOptions = q.options.map((text, i) => ({
        label: ["A", "B", "C", "D"][i],
        text
      }));

      return {
        exam_id: examId,
        question_text: q.question,
        options: labeledOptions,
        correct_option: q.answer
      };
    });

    await Question.bulkCreate(labeledQuestions);

    res.status(201).json({ success: true, message: "Exam and questions created", examId });
  } catch (err) {
    console.error("Create exam error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


Question.belongsTo(Exam, { foreignKey: 'exam_id', as: 'exam' });

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: {
        model: Question,
        as: "questions",
        attributes: ["id", "question_text", "options", "correct_option"]
      },
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json({
      success: true,
      exams
    });
  } catch (err) {
    console.error("Fetch exams error:", err);
    res.status(500).json({ success: false, message: "Server error while fetching exams" });
  }
};


exports.uploadsmaterial = async (req, res) => {
  const {
    teacherId,
    examType,
    title,
    desc,
    subject,
    chapter,
    fileUrl,
    fileName
  } = req.body;

  // Validate required fields
  if (!teacherId || !examType || !title || !subject || !chapter || !fileUrl || !fileName) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const material = await StudyMaterial.create({
      teacherId,
      examType,
      title,
      desc,
      subject,
      chapter,
      fileUrl,
      fileName
    });

    res.status(201).json({
      success: true,
      message: "Study material uploaded successfully",
      material
    });
  } catch (err) {
    console.error("Upload study material error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



exports.getStudyMaterialsByExamType = async (req, res) => {
  try {
    const { examType } = req.params;; // or req.body if you prefer
    const {teacherId} = req.query;

    if (!examType) {
      return res.status(400).json({ success: false, message: "examType is required" });
    }

    const materials = await StudyMaterial.findAll({
      where: { examType, teacherId },
    });

    res.status(200).json({
      success: true,
      materials
    });
  } catch (err) {
    console.error("Fetch study materials error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



////result controller ......................
exports.saveResult = async (req, res) => {
  try {
    const { examId, userId, attempted, correct, wrong, unattempted, total, status } = req.body;

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
    });

    res.status(200).json({ success: true, message: "Result saved", result: saved });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ success: false, message: "Internal server error" });

  }
};


// controllers/resultController.js


// exports.getResultsBySubjectAndChapter = async (req, res) => {
//   try {
//     const { subject, chapter } = req.query; // expecting: /api/results/filter?subject=Math&chapter=Chapter%201

//     // ✅ Validation
//     if (!subject || !chapter) {
//       return res.status(400).json({
//         success: false,
//         message: "Both subject and chapter are required"
//       });
//     }

//     // ✅ Fetch results
//     const results = await Result.findAll({
//       where: { subject, chapter }
//     });

//     if (results.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No results found for given subject and chapter"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: results
//     });

//   } catch (error) {
//     console.error("Error fetching results:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// };

