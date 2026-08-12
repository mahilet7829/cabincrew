const express = require("express");
const requireAuth = require("../middleware/auth");
const { getPublicSetting } = require("../controllers/settingsController");

const router = express.Router();
router.get("/:key", requireAuth, getPublicSetting);

module.exports = router;