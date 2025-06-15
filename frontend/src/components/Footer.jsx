import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F3E8E8] text-[#800000] text-center px-4 sm:px-6 lg:px-10 py-4 mt-10 border-t border-[#e0cfcf]">
      <p className="text-xs sm:text-sm">
        © {new Date().getFullYear()} AECA Academy. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
