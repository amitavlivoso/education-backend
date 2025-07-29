const router=require('express').Router();
const Coursecategory=require('../controller/Coursecategory')


router.post("/createCoursecategory",Coursecategory.createCoursecategory)
 router.get("/getCoursecategorys",Coursecategory.getCoursecategorys)
 router.get("/getCoursecategoryById/:id",Coursecategory.getCoursecategoryById)
router.post("/updateCoursecategory/:id",Coursecategory.updateCoursecategory)
router.delete("/deleteCoursecategory/:id",Coursecategory.deleteCoursecategory)
module.exports=router