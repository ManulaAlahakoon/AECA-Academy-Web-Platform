import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Padding top reduced to 260px */}
      <main className="flex-grow pt-[260px] px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#7c0000] mb-6 text-center">
          Upcoming Events
        </h1>
        <p className="text-center text-gray-700 text-lg">
          Stay tuned for our latest workshops, seminars, and academic events happening at AECA Academy.
        </p>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
