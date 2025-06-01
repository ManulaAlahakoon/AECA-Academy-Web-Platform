// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links, isOpen, toggleSidebar }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg z-50 transform
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="p-4 text-2xl font-bold border-b border-gray-700 flex justify-between items-center">
        AECA Admin
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
              `flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700" : ""
              }`
            }
            onClick={toggleSidebar} // Close sidebar on link click (for mobile)
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-base">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
