const express = require("express");
const requireAuth = require("../middleware/auth");
const requireApproved = require("../middleware/requireApproved");
const { getQuiz, submitQuiz } = require("../controllers/quizController");

const router = express.Router();
router.use(requireAuth, requireApproved);

router.get("/:moduleId", getQuiz);
router.post("/:moduleId/submit", submitQuiz);

module.exports = router;