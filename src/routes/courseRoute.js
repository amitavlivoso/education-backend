const router=require('express').Router();
const Course=require('../controller/Course')


router.post("/createCourse",Course.createCourse)
 router.get("/getCourses",Course.getCourses)
 router.get("/getCourseById/:id",Course.getCourseById)
router.post("/updateCourse/:id",Course.updateCourse)
router.delete("/deleteCourse/:id",Course.deleteCourse)
module.exports=router