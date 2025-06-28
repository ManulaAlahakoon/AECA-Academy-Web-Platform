import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroImage from '../../assets/img1.jpg'; // your actual image path

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Push content below fixed navbar */}
      <div className="pt-[180px]">
        {/* Text Left, Image Right */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-x-12">
          {/* Text - Left */}
          <div className="md:w-1/2 mb-8 md:mb-0 text-justify">
            <p className="text-base md:text-lg text-gray-800 leading-relaxed">
              AECA is a premier English language academy dedicated to helping individuals achieve their language goals, whether for academic pursuits, professional advancement, or personal enrichment.
              <br /><br />
              Our comprehensive programs focus on international exam preparation, English for non-native speakers, and essential English skills required for career enhancement.
            </p>
          </div>

          {/* Image - Right */}
          <div className="md:w-1/2 mt-0 md:mt-6">
            <img
              src={HeroImage}
              alt="AECA Academy"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
