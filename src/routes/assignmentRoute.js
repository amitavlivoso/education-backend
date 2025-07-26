const router=require('express').Router();
const TeacherController=require('../controller/Teachercontroller')


router.post("/createAssignment",TeacherController.createAssignment)
 router.get("/getAssignments",TeacherController.getAssignments)
 router.get("/getAssignmentById/:id",TeacherController.getAssignmentById)
router.post("/updateAssignment/:id",TeacherController.updateAssignment)
router.delete("/deleteAssignment/:id",TeacherController.deleteAssignment)
module.exports=router