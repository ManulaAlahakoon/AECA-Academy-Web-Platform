import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTimes,
  FaYoutube
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2e2e2e] text-white py-10 px-4 sm:px-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        
        {/* Left: Logo and Address */}
        <div>
          <h2 className="text-lg font-bold mb-2">WELCOME TO</h2>
          <h1 className="text-3xl font-bold mb-4">AECA ACADEMY</h1>
          <p className="font-semibold">AECA Academy</p>
          <p>Athurugiriya Road, Malabe</p>
          <p>Colombo, Sri Lanka</p>
        </div>

        {/* Center: Links */}
        <div className="space-y-2">
          <a href="#" className="hover:underline block">About AECA</a>
          <a href="#" className="hover:underline block">Our Mission</a>
          <a href="#" className="hover:underline block">Terms & Conditions</a>
          <a href="#" className="hover:underline block">Student Support</a>
          <a href="#" className="hover:underline block">Careers</a>
          <a href="#" className="hover:underline block">Donate</a>
          <a href="#" className="hover:underline block">Accessibility</a>
          <a href="#" className="hover:underline block">Privacy Policy</a>
        </div>

        {/* Right: Links and Social */}
        <div className="space-y-2">
          <a href="#" className="hover:underline block">Visit AECA</a>
          <a href="#" className="hover:underline block">Our Locations</a>
          <a href="#" className="hover:underline block">Contact Us</a>
          <a href="#" className="hover:underline block">Maps & Directions</a>
          <a href="#" className="hover:underline block">Student Portal</a>
          <a href="#" className="hover:underline block">Email Login</a>
          <a href="#" className="hover:underline block">Site Map</a>

          <div className="flex space-x-4 mt-4 text-lg">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
            <FaTimes />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-8">
        ©{new Date().getFullYear()} AECA Academy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
