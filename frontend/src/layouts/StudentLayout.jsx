// File: src/layouts/StudentLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaTachometerAlt, FaBook, FaUpload, FaBullhorn, FaCommentDots, FaRobot, FaBars, FaUser} from "react-icons/fa";

const studentLinks = [
  { path: "/student", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/student/courses", label: "My Courses", icon: <FaBook /> },
  { path: "/student/announcements", label: "Announcements", icon: <FaBullhorn /> },
  { path: "/student/feedback", label: "Feedback", icon: <FaCommentDots /> },
  { path: "/student/chatbot", label: "Chatbot", icon: <FaRobot /> },
  { path: "/student/profile", label: "Profile", icon: <FaUser /> }

];

const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      <Sidebar
        title="AECA Student"
        links={studentLinks}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 min-h-screen bg-gray-100 ml-0 md:ml-64">
        <div className="p-4 md:hidden flex justify-between items-center bg-gray-800 text-white shadow">
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
          <h1 className="text-xl font-bold">AECA Student</h1>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
