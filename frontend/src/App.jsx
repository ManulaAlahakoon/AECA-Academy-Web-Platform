import './App.css'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
//import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourse from "./pages/admin/CourseManagementPage";
import TeacherRegistrationPage from "./pages/admin/TeacherRegistrationPage";

//student dashboard
import StudentLayout from './layouts/StudentLayout';
import StudentCourses from './pages/student/StudentCourses';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentAnnouncements from './pages/student/StudentAnnouncements';
import StudentFeedback from './pages/student/StudentFeedback';
import StudentChatbot from './pages/student/StudentChatbot';
//teacher dashboard
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherAnnouncements from "./pages/teacher/TeacherAnnouncements";
import LectureMaterials from "./pages/teacher/LectureMaterials";
import StudentSubmissions from "./pages/teacher/StudentSubmissions";
import CourseFeedback from "./pages/teacher/CourseFeedback";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherCourses from './pages/teacher/TeacherCourses';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="announcements" element={<StudentAnnouncements />} />
          <Route path="feedback" element={<StudentFeedback />} />
            <Route path="chatbot" element={<StudentChatbot />} />
          {/* Add other student pages here */}
          </Route>

        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="announcements" element={<TeacherAnnouncements />} />
          <Route path="lecturematerials" element={<LectureMaterials />} />
          <Route path="submissions" element={<StudentSubmissions />} />
          <Route path="feedback" element={<CourseFeedback />} />
          <Route path="mycourses" element={<TeacherCourses />} />
          
/>
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="manage-courses" element={<ManageCourse />} />
          <Route
            path="teacher-registration"
            element={<TeacherRegistrationPage />}
          />
          {/* Add other nested routes here */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

//Test
