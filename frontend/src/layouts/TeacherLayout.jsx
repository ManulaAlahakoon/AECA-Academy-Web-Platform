import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  FaTachometerAlt,
  FaBook,
  FaFileAlt,
  FaUserCircle,
  FaBars,
  FaBullhorn,
  FaCommentDots,
} from "react-icons/fa";

const teacherLinks = [
  { path: "/teacher", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/teacher/mycourses", label: "My Courses", icon: <FaBook /> },
  { path: "/teacher/lecturematerials", label: "Lecture Materials", icon: <FaBook /> },
  { path: "/teacher/announcements", label: "Announcements", icon: <FaBullhorn /> },
  { path: "/teacher/feedback", label: "Feedback", icon: <FaCommentDots /> },
  { path: "/teacher/submissions", label: "Submissions", icon: <FaFileAlt /> },
  { path: "/teacher/profile", label: "Profile", icon: <FaUserCircle /> },
];

const TeacherLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        title="AECA Teacher"
        links={teacherLinks}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Content area */}
      <div className="flex-1 min-h-screen bg-gray-100 ml-0 md:ml-64">
        {/* Hamburger Button */}
        <div className="p-4 md:hidden flex justify-between items-center bg-blue-800 text-white shadow">
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
          <h1 className="text-xl font-bold">AECA Teacher</h1>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
