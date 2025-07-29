const router=require("express").Router();
const studentController=require("../controller/Student.controller")

router.post("/updateStudentProfile",studentController.updateStudentProfile)

module.exports=router;