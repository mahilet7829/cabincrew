const express = require("express");
const requireAuth = require("../middleware/auth");
const requireAdmin = require("../middleware/isAdmin");
const ctrl = require("../controllers/adminController");
const uploadVideo = require("../middleware/uploadVideo");

const router = express.Router();
router.use(requireAuth, requireAdmin);

router.get("/payments/pending", ctrl.getPendingPayments);
router.post("/payments/:paymentId/approve", ctrl.approvePayment);
router.post("/payments/:paymentId/reject", ctrl.rejectPayment);
router.get("/users", ctrl.getAllUsers);
router.post("/modules", ctrl.createModule);
router.post("/modules/:moduleId/lessons", uploadVideo.single("video"), ctrl.addLesson);
router.post("/modules/:moduleId/questions", ctrl.addQuizQuestion);
router.patch("/modules/:moduleId", ctrl.updateModule);
router.delete("/modules/:moduleId", ctrl.deleteModule);
router.patch("/lessons/:lessonId", uploadVideo.single("video"), ctrl.updateLesson);
router.delete("/lessons/:lessonId", ctrl.deleteLesson);
router.delete("/questions/:questionId", ctrl.deleteQuestion);
router.get("/settings/:key", ctrl.getSetting);
router.put("/settings/:key", ctrl.updateSetting);

module.exports = router;