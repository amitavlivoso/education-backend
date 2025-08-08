const router=require("express").Router();
const studentController=require("../controller/Student.controller")

router.post("/updateStudentProfile",studentController.updateStudentProfile)
router.post("/saveResult",studentController.saveResult)
router.get("/getresults/:userId", studentController.getResultsByUserId);

module.exports=router;