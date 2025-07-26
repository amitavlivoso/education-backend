const router=require('express').Router();
const TeacherController=require('../controller/Teachercontroller')


router.post("/createteacher",TeacherController.createTeacher)
 router.get("/getteacher",TeacherController.getteacher)
 router.get("/getbyid/:id",TeacherController.getTeacherById)
router.post("/updateteacher/:id",TeacherController.updateTeacher)

module.exports=router