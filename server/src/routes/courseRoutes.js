const express = require("express");
const requireAuth = require("../middleware/auth");
const requireApproved = require("../middleware/requireApproved");
const { getModules, getModule } = require("../controllers/courseController");

const router = express.Router();
router.use(requireAuth, requireApproved);

router.get("/", getModules);
router.get("/:id", getModule);

module.exports = router;