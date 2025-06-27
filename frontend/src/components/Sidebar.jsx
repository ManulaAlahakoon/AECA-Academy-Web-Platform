// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Logout icon

const Sidebar = ({ title = "AECA", links, isOpen, toggleSidebar }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Replace with actual key if different
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#800000] text-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 text-2xl font-bold border-b border-[#800000] flex justify-between items-center bg-[#800000]">
          {title}
          <button className="md:hidden text-xl" onClick={toggleSidebar}>
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md hover:bg-[#990000] transition ${
                  isActive ? "bg-[#990000]" : ""
                }`
              }
              onClick={toggleSidebar}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-base">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button at Bottom */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#800000] hover:bg-[#990000] text-white py-2 rounded-md transition"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center w-[300px]">
            <h2 className="text-lg font-semibold mb-4 text-[#800000]">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#990000]"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
