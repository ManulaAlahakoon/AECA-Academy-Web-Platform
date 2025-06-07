// src/layouts/AdminLayout.jsx
import  { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaChartBar,                 
  FaBars,
} from "react-icons/fa";

const adminLinks = [
  { path: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/admin/manage-courses", label: "Courses", icon: <FaBook /> },
  { path: "/admin/manage-users", label: "Manage Users", icon: <FaUsers /> },
  { path: "/admin/reports", label: "Reports", icon: <FaChartBar /> },
  { path: "/admin/teacher-registration", label: "Teacher Registration", icon: <FaChartBar /> },

];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        links={adminLinks}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Content area */}
      <div className="flex-1 min-h-screen bg-gray-100 ml-0 md:ml-64">
        {/* Hamburger Button */}
        <div className="p-4 md:hidden flex justify-between items-center bg-gray-800 text-white shadow">
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
          <h1 className="text-xl font-bold">AECA Admin</h1>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
