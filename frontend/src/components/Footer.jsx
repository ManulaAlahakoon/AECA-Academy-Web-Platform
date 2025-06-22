import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
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

        {/* Center: Important Links */}
        <div className="space-y-2">
          <a href="/about" className="hover:underline block">About AECA</a>
          <a href="/about" className="hover:underline block">Our Mission</a>
          <a href="/contact" className="hover:underline block">Terms & Conditions</a>
          <a href="/contact" className="hover:underline block">Student Support</a>
          <a href="/contact" className="hover:underline block">Accessibility</a>
        </div>

        {/* Right: Quick Navigation & Social */}
        <div className="space-y-2">
          <a href="/" className="hover:underline block">Visit AECA</a>
          <a href="/contact" className="hover:underline block">Contact Us</a>
         

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 text-lg">
            <a
              href="https://www.facebook.com/share/1CPq3tNn64/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4267B2]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/ielts_aeca?igsh=eXRpaDBsbmVzNmY2&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/academy-of-english-for-career-advancement-2a30aa2b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0077B5]"
            >
              <FaLinkedinIn />
            </a>
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
