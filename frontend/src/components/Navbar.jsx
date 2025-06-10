// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';  // Make sure logo.png is here!

const Navbar = () => {
  const tabs = ['Home', 'About', 'Features', 'Courses', 'Contact', 'Login', 'Register'];

  return (
    <header className="bg-[#F3E8E8] px-6 py-1 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <img
        src={Logo}
        alt="AECA Logo"
        className="h-[100px] w-auto object-contain"
      />

      {/* Tabs */}
      <nav className="flex space-x-3 items-center">
        {tabs.map((item, index) => {
          if (index < 5) {
            return (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="w-24 text-center px-6 py-2 text-sm rounded-md border border-[#800000] text-[#800000] bg-[#F3E8E8] hover:bg-[#800000] hover:text-white transition duration-200"
              >
                {item}
              </Link>
            );
          } else {
            return (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="w-24 text-center px-6 py-2 text-sm rounded-md border border-[#800000] text-white bg-[#800000] hover:opacity-90 transition duration-200"
              >
                {item}
              </Link>
            );
          }
        })}
      </nav>
    </header>
  );
};

export default Navbar;
