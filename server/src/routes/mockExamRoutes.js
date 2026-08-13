const express = require("express");
const requireAuth = require("../middleware/auth");
const requireApproved = require("../middleware/requireApproved");
const requireAdmin = require("../middleware/isAdmin");
const ctrl = require("../controllers/mockExamController");

const router = express.Router();
router.use(requireAuth, requireApproved);

router.get("/", ctrl.listExams);
router.get("/:examId", ctrl.getExam);
router.post("/:examId/submit", ctrl.submitExam);

// Admin-only sub-routes
router.post("/", requireAdmin, ctrl.createExam);
router.get("/:examId/admin", requireAdmin, ctrl.getExamAdmin);
router.post("/:examId/questions", requireAdmin, ctrl.addExamQuestion);
router.delete("/:examId", requireAdmin, ctrl.deleteExam);
router.delete("/questions/:questionId", requireAdmin, ctrl.deleteExamQuestion);

module.exports = router;