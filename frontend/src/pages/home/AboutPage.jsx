import React from 'react';
import Navbar from '../../components/Navbar';  // adjust path

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-1 px-10 md:px-20 py-12 text-center">
        <h2 className="text-3xl font-bold text-[#800000] mb-6">About Us</h2>
        <p className="max-w-3xl text-gray-700 text-lg">
          AECA Academy is dedicated to advancing your English skills and career through
          high-quality courses, expert guidance, and interactive learning tools.
          We believe in empowering students with knowledge, confidence, and the support
          needed to excel in their professional journeys.
        </p>
      </main>
    </div>
  );
};

export default AboutPage;
