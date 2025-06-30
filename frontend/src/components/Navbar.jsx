import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from '../assets/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Features', path: '/features' },
    { label: 'Staff', path: '/staff' },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow">
      {/* Top Maroon Bar */}
      <div className="bg-[#7c0000] text-white text-sm py-3 px-4 md:px-6 flex justify-between items-center font-bold">
        <div className="hidden md:flex space-x-6">
          <Link to="/events" className="hover:text-[#FFD700] transition">Events</Link>
          <Link to="/faq" className="hover:text-[#FFD700] transition">FAQs</Link>
          <Link to="/why-choose-us" className="hover:text-[#FFD700] transition">Why Choose Us</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <a
            href="https://www.google.com/maps/place/IELTS+%7C+PTE+by+AECA+(Academy+of+English+for+Career+Advancement)/@6.8864052,79.965568,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFD700] transition"
          >
            Location
          </a>
          <Link to="/contact" className="hover:text-[#FFD700] transition">Contact</Link>
        </div>
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Middle Logo */}
      <div className="bg-white py-4 flex justify-center items-center border-b border-[#7c0000]">
        <img src={Logo} alt="AECA Logo" className="h-[80px] object-contain" />
      </div>

      {/* Desktop Nav */}
      <nav className="bg-white px-4 md:px-6 py-3 border-b border-[#7c0000] hidden md:flex justify-center font-medium text-[#233651] text-sm">
        <div className="flex space-x-6 items-center">
          {menuItems.map((item, i) => (
            <Link key={i} to={item.path} className="hover:text-[#7c0000] transition">
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="px-4 py-1 border border-[#7c0000] text-[#7c0000] hover:bg-[#7c0000] hover:text-white transition rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-1 border border-[#7c0000] text-[#7c0000] hover:bg-[#7c0000] hover:text-white transition rounded"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="bg-white px-6 py-4 border-t border-[#7c0000] md:hidden space-y-4 text-sm text-[#233651] font-medium">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="block hover:text-[#7c0000] transition"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="inline-block border border-[#7c0000] text-[#7c0000] px-4 py-2 rounded hover:bg-[#7c0000] hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-block border border-[#7c0000] text-[#7c0000] px-4 py-2 rounded hover:bg-[#7c0000] hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
