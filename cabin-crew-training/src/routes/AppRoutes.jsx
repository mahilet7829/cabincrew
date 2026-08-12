import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PaymentUpload from "../pages/PaymentUpload";
import Dashboard from "../pages/Dashboard";
import ModuleDetail from "../pages/ModuleDetail";
import Lesson from "../pages/Lesson";
import Quiz from "../pages/Quiz";
import QuizResults from "../pages/QuizResults";
import AdminLayout from "../components/layout/AdminLayout";
import PendingPayments from "../pages/admin/PendingPayments";
import ManageCourses from "../pages/admin/ManageCourses";
import AllUsers from "../pages/admin/AllUsers";
import { ProtectedRoute, AdminRoute } from "../components/auth/ProtectedRoute";
import Settings from "../pages/admin/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/payment" element={<PaymentUpload />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/module/:moduleId" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
      <Route path="/module/:moduleId/lesson/:lessonId" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
      <Route path="/module/:moduleId/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/module/:moduleId/quiz/results" element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />

      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<PendingPayments />} />
        <Route path="payments" element={<PendingPayments />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}