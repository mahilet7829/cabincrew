const express = require("express");
const requireAuth = require("../middleware/auth");
const requireAdmin = require("../middleware/isAdmin");
const ctrl = require("../controllers/adminController");

const router = express.Router();
router.use(requireAuth, requireAdmin);

router.get("/payments/pending", ctrl.getPendingPayments);
router.post("/payments/:paymentId/approve", ctrl.approvePayment);
router.post("/payments/:paymentId/reject", ctrl.rejectPayment);
router.get("/users", ctrl.getAllUsers);

module.exports = router;