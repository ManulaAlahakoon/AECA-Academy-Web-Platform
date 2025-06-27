import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow">
      {/* Top Maroon Bar with Bold Text & Golden Hover */}
      <div className="bg-[#7c0000] text-white text-sm py-4 px-6 flex justify-between items-center font-bold">
        <div className="flex space-x-6">
          <Link to="#" className="hover:text-[#FFD700] transition">Events</Link>
          <Link to="#" className="hover:text-[#FFD700] transition">FAQs</Link>
        </div>
        <div className="flex space-x-6">
          <Link to="#" className="hover:text-[#FFD700] transition">Location</Link>
          <Link to="#" className="hover:text-[#FFD700] transition">Contact</Link>
        </div>
      </div>

      {/* Middle Logo Bar with Maroon Bottom Border and Smaller Logo */}
      <div className="bg-white py-4 flex justify-center items-center border-b border-[#7c0000]">
        <img src={Logo} alt="AECA Logo" className="h-[80px] object-contain" />
      </div>

      {/* Bottom Navigation Bar with Centered Tabs and Maroon Border */}
      <nav className="bg-white px-6 py-3 border-b border-[#7c0000] flex justify-center font-medium text-[#233651] text-sm">
        <div className="flex space-x-6 items-center">
          {[
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
            { label: 'Why Choose Us', path: '/why-choose-us' },
            { label: 'Courses', path: '/courses' },
            { label: 'Features', path: '/features' },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="hover:text-[#7c0000] transition"
            >
              {item.label}
            </Link>
          ))}

          {/* Login and Register Buttons */}
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
    </header>
  );
};

export default Navbar;
