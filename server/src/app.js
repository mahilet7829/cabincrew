const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const quizRoutes = require("./routes/quizRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const mockExamRoutes = require("./routes/mockExamRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/exams", mockExamRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

module.exports = app;