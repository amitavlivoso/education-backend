const router=require('express').Router();
const AssignmentController=require('../controller/Assignmentcontroller')


router.post("/createAssignment",AssignmentController.createAssignment)
 router.get("/getAssignments",AssignmentController.getAssignments)
 router.get("/getAssignmentById/:id",AssignmentController.getAssignmentById)
router.post("/updateAssignment/:id",AssignmentController.updateAssignment)
router.delete("/deleteAssignment/:id",AssignmentController.deleteAssignment)
module.exports=router