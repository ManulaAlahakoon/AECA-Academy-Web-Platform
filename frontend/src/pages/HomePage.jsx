import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import HeroImage from '../assets/img1.jpg';

const HomePage = () => {
  const tabs = ['Home', 'About', 'Features', 'Courses', 'Contact', 'Login', 'Register'];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="bg-[#F3E8E8] px-6 py-1 flex justify-between items-center shadow-sm">
        {/*Logo */}
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
                  to={`/${item.toLowerCase()}`}
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

      {/* Main Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between flex-1 px-10 md:px-20 py-12">
        {/* AECA Text Left Side */}
        <div className="md:w-1/2 flex items-start justify-center md:justify-start mb-10 md:mb-0">
          <h2 className="text-2xl md:text-4xl font-bold text-[#800000] uppercase text-center md:text-left leading-snug mt-[-50px]">
            Academy of English for Career Advancement
          </h2>
        </div>

        {/* Image and Description Section */}
        <div className="md:w-1/2 space-y-6">
          <p className="text-gray-700 text-lg">
            Welcome to AECA Academy! Explore a smarter way to learn. Access courses, submit assignments,
            and get support with our English-learning chatbot. Sign up now and start your journey!
          </p>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="w-24 text-center px-6 py-2 text-sm rounded-md border border-[#800000] text-white bg-[#800000] hover:opacity-90 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-24 text-center px-6 py-2 text-sm rounded-md border border-[#800000] text-white bg-[#800000] hover:opacity-90 transition"
            >
              Register
            </Link>
          </div>
          <img src={HeroImage} alt="AECA Hero" className="w-full max-w-md mx-auto rounded-md object-contain" />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
