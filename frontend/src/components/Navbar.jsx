import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tabs = ['Home', 'About', 'Features', 'Courses', 'Contact', 'Login', 'Register'];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-[#F3E8E8] px-6 py-2 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img src={Logo} alt="AECA Logo" className="h-[80px] w-auto object-contain" />

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#800000] focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden md:flex space-x-3 items-center">
          {tabs.map((item, index) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`w-24 text-center px-4 py-2 text-sm rounded-md border transition duration-200 ${
                index < 5
                  ? 'border-[#800000] text-[#800000] bg-[#F3E8E8] hover:bg-[#800000] hover:text-white'
                  : 'border-[#800000] text-white bg-[#800000] hover:opacity-90'
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          {tabs.map((item, index) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`text-center px-4 py-2 text-sm rounded-md border transition duration-200 ${
                index < 5
                  ? 'border-[#800000] text-[#800000] bg-[#F3E8E8] hover:bg-[#800000] hover:text-white'
                  : 'border-[#800000] text-white bg-[#800000] hover:opacity-90'
              }`}
              onClick={() => setIsOpen(false)} // close menu on click
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
