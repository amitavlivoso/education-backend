const router=require('express').Router();

router.use("/auth", require("./auth.route"));
router.use("/teacher",require("./teacherRoute"));


module.exports=router;