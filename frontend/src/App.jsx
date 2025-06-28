// <<<<<<< risna-1
// import './App.css'
// import { Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import LoginPage from './pages/auth/LoginPage';
// import RegisterPage from './pages/auth/RegisterPage';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import ResetPassword from './pages/auth/ResetPassword';
// import StudentDashboard from './pages/student/StudentDashboard';
// import TeacherDashboard from './pages/teacher/TeacherDashboard';
// //import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageCourse from "./pages/admin/CourseManagementPage";
// import TeacherRegistrationPage from "./pages/admin/TeacherRegistrationPage";
// import PaymentVerification from "./pages/admin/PaymentVerification";
// import ManageUsers from "./pages/admin/ManageUsers";


// //student dashboard
// import StudentLayout from './layouts/StudentLayout';
// import StudentCourses from './pages/student/StudentCourses';
// import StudentAssignments from './pages/student/StudentAssignments';
// import StudentAnnouncements from './pages/student/StudentAnnouncements';
// import StudentFeedback from './pages/student/StudentFeedback';
// import StudentChatbot from './pages/student/StudentChatbot';
// import StudentCourseDetail from "./pages/student/StudentCourseDetail";

// //teacher dashboard
// import TeacherProfile from "./pages/teacher/TeacherProfile";
// import TeacherAnnouncements from "./pages/teacher/TeacherAnnouncements";
// import LectureMaterials from "./pages/teacher/LectureMaterials";
// import StudentSubmissions from "./pages/teacher/StudentSubmissions";
// import CourseFeedback from "./pages/teacher/CourseFeedback";
// import TeacherLayout from "./layouts/TeacherLayout";
// import TeacherCourses from './pages/teacher/TeacherCourses';
// import TeacherCourseInfo from './pages/teacher/TeacherCourseInfo';



// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />

//         <Route
//           path="/student"
//           element={
//             <ProtectedRoute role="student">
//               <StudentLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<StudentDashboard />} />
//           <Route path="courses" element={<StudentCourses />} />
//           <Route path="assignments" element={<StudentAssignments />} />
//           <Route path="announcements" element={<StudentAnnouncements />} />
//           <Route path="feedback" element={<StudentFeedback />} />
//           <Route path="chatbot" element={<StudentChatbot />} />
          

//           <Route path="course/:id" element={<StudentCourseDetail />} />
//           {/* Add other student pages here */}
//         </Route>

//         <Route
//           path="/teacher"
//           element={
//             <ProtectedRoute role="teacher">
//               <TeacherLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<TeacherDashboard />} />
//           <Route path="profile" element={<TeacherProfile />} />
//           <Route path="announcements" element={<TeacherAnnouncements />} />
//           <Route path="lecturematerials" element={<LectureMaterials />} />
//           <Route path="submissions" element={<StudentSubmissions />} />
//           <Route path="feedback" element={<CourseFeedback />} />
//           <Route path="mycourses" element={<TeacherCourses />} />

//           <Route path="/teacher/course/:id" element={<TeacherCourseInfo />} />

          

//         </Route>
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<AdminDashboard />} />
//           <Route path="manage-courses" element={<ManageCourse />} />
//           <Route
//             path="teacher-registration"
//             element={<TeacherRegistrationPage />}
//           />
//           <Route
//             path="enrollment-approvals"
//             element={<PaymentVerification />}
//           />
//           <Route path="manage-users" element={<ManageUsers />} />

//           {/* Add other nested routes here */}
//         </Route>
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;

// //Test

import './App.css'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/home/AboutPage';
import FeaturePage from './pages/home/FeaturePage';
import CoursePage from './pages/home/CoursePage';
import ContactPage from './pages/home/ContactPage';
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
import PaymentVerification from "./pages/admin/PaymentVerification";
import ManageUsers from "./pages/admin/ManageUsers";


//student dashboard
import StudentLayout from './layouts/StudentLayout';
import StudentCourses from './pages/student/StudentCourses';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentAnnouncements from './pages/student/StudentAnnouncements';
import StudentFeedback from './pages/student/StudentFeedback';
import StudentChatbot from './pages/student/StudentChatbot';
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentMaterials from "./pages/student/StudentAssignments";
import StudentProfile from './pages/student/StudentProfile';


//teacher dashboard
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherAnnouncements from "./pages/teacher/TeacherAnnouncements";
import LectureMaterials from "./pages/teacher/LectureMaterials";
import StudentSubmissions from "./pages/teacher/StudentSubmissions";
import CourseFeedback from "./pages/teacher/CourseFeedback";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherCourseInfo from './pages/teacher/TeacherCourseInfo';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/contact" element={<ContactPage />} />
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
          <Route path="profile" element={<StudentProfile />} />

          <Route path="course/:id/:name" element={<StudentCourseDetail />} />
          <Route path="materials/:courseName" element={<StudentMaterials />} />
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
          //tharushi-1
          <Route path="/teacher/course/:courseId/materials" element={<LectureMaterials />} />

          //dev
          <Route path="/teacher/course/:id" element={<TeacherCourseInfo />} />

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
          <Route
            path="enrollment-approvals"
            element={<PaymentVerification />}
          />
          <Route path="manage-users" element={<ManageUsers />} />

          
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

//Test

