const router=require('express').Router();
const TeacherController=require('../controller/Teachercontroller')

router.post("/createteacher",TeacherController.createTeacher)
 router.get("/getteacher",TeacherController.getteacher)
 router.get("/getbyid/:id",TeacherController.getTeacherById)
router.post("/updateteacher/:id",TeacherController.updateTeacher)
router.post("/createexam",TeacherController.createExam)
router.get("/getexam",TeacherController.getAllExams)
router.post("/studymaterial",TeacherController.uploadsmaterial)
router.get("/getStudyMaterialsByExamType/:examType", TeacherController.getStudyMaterialsByExamType);

module.exports=router