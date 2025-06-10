import React from 'react';
import Navbar from '../../components/Navbar';
import HeroImage from '../../assets/img1.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Section with slight zoom */}
      <main className="transform scale-105 flex flex-col-reverse md:flex-row flex-1 px-10 md:px-20 py-12">
        {/* Left Side - Fully Centered Content */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#800000] uppercase">
              Academy of English for Career Advancement
            </h2>
            <p className="text-gray-700 text-lg">
              Welcome to AECA Academy! Explore a smarter way to learn with both physical and online classes. Access courses, submit assignments, 
              and get support through our English-learning chatbot. Sign up now and start your journey!
            </p>
            <div className="flex space-x-4 justify-center">
              <a
                href="/login"
                className="w-24 text-center px-6 py-2 text-sm rounded-md border border-[#800000] text-white bg-[#800000] hover:opacity-90 transition"
              >
                Login
              </a>
              <a
                href="/register"
                className="w-24 text-center px-6 py-2 text-sm rounded-md border border-[#800000] text-white bg-[#800000] hover:opacity-90 transition"
              >
                Register
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img src={HeroImage} alt="AECA Hero" className="w-full max-w-md rounded-md object-contain" />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
