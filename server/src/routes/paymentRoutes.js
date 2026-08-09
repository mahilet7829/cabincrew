const express = require("express");
const requireAuth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { submitPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/submit", requireAuth, upload.single("receipt"), submitPayment);

module.exports = router;