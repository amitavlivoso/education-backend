const router=require('express').Router();
const authController=require('../controller/auth.controller');

router.post("/register",authController.register)
router.post('/verify-otp', authController.verifyOtp);
router.post("/login",authController.login)


module.exports=router;