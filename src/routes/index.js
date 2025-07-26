const router=require('express').Router();

router.use("/auth", require("./auth.route"));
router.use("/teacher",require("./teacherRoute"));
router.use("/assignment",require("./assignmentRoute"));

module.exports=router;