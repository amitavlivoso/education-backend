const router=require('express').Router();

router.use("/auth", require("./auth.route"));
router.use("/teacher",require("./teacherRoute"));
router.use("/student",require("./Student.route"))


router.use("/assignment",require("./assignmentRoute"));
router.use("/coursecategory",require("./courseCategory"));
router.use("/course",require("./courseRoute"));
module.exports=router;