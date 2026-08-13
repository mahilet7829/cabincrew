import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PaymentUpload from "../pages/PaymentUpload";
import TraineeLayout from "../components/layout/TraineeLayout";
import Dashboard from "../pages/Dashboard";
import AllLessons from "../pages/AllLessons";
import AllQuizzes from "../pages/AllQuizzes";
import ModuleDetail from "../pages/ModuleDetail";
import Lesson from "../pages/Lesson";
import Quiz from "../pages/Quiz";
import QuizResults from "../pages/QuizResults";
import AdminLayout from "../components/layout/AdminLayout";
import PendingPayments from "../pages/admin/PendingPayments";
import ManageModules from "../pages/admin/ManageModules";
import ManageLessons from "../pages/admin/ManageLessons";
import ManageQuizzes from "../pages/admin/ManageQuizzes";
import AllUsers from "../pages/admin/AllUsers";
import Settings from "../pages/admin/Settings";
import { ProtectedRoute, AdminRoute } from "../components/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/payment" element={<PaymentUpload />} />

      <Route path="/" element={<ProtectedRoute><TraineeLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="lessons" element={<AllLessons />} />
        <Route path="quizzes" element={<AllQuizzes />} />
      </Route>

      <Route path="/module/:moduleId" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
      <Route path="/module/:moduleId/lesson/:lessonId" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
      <Route path="/module/:moduleId/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/module/:moduleId/quiz/results" element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />

      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<PendingPayments />} />
        <Route path="payments" element={<PendingPayments />} />
        <Route path="modules" element={<ManageModules />} />
        <Route path="lessons" element={<ManageLessons />} />
        <Route path="quizzes" element={<ManageQuizzes />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}