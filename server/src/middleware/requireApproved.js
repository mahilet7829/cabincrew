function requireApproved(req, res, next) {
  if (req.user.role === "ADMIN") return next(); // admins bypass
  if (req.user.status !== "APPROVED") {
    return res.status(403).json({ error: "Your account is not approved yet" });
  }
  next();
}

module.exports = requireApproved;