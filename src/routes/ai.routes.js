const { askQuestion } = require("../controller/ai.controller");

const router = require("express").Router();

router.post("/ask", askQuestion);

module.exports = router;
