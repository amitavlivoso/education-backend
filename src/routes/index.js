const router=require('express').Router();

router.use("/auth", require("./auth.route"));
router.use("/teacher",require("./teacherRoute"));
router.use("/student",require("./Student.route"))


module.exports=router;