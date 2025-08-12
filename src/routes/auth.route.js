const router = require("express").Router();
const authController = require("../controller/auth.controller");
const upload = require("../middleware/multer");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);
router.post("/req-reset", authController.login);
router.post("/reset-password", authController.login);
router.post("/upload-single", upload.single("file"), (req, res, next) => {
  req.files = [req.file]; // Normalize for controller
  authController.uploadFilesFromForm(req, res);
});

// ✅ Upload multiple files: `req.files`
router.post(
  "/upload-multiple",
  upload.array("files", 10),
  authController.uploadFilesFromForm
);
router.post("/userfilter", authController.filterUsers);

module.exports = router;
