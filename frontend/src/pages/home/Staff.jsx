import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import Instructor2 from '../../assets/instructor2.jpg';
import Instructor3 from '../../assets/instructor3.jpg';
import Instructor5 from '../../assets/instructor5.jpg';
import Sign from '../../assets/imp.png';
import Cofounder1 from '../../assets/cofounder1.jpg';
import Cofounder2 from '../../assets/cofounder2.jpg';

const Staff = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="pt-[260px] px-6 md:px-20 flex-grow space-y-12">
        {/* Page Title */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#800000] mb-2">
            Meet Our Instructors
          </h2>
        </section>

        {/* Founder Section */}
        <section className="bg-[#fcf0ed] px-4 py-12 rounded-2xl">
          <h3 className="text-2xl font-semibold text-[#800000] text-center mb-8">
            Founder
          </h3>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-10">
            <img src={Instructor2} alt="Instructor 2" className="w-48 h-64 object-cover rounded-xl" />
            <img src={Instructor3} alt="Instructor 3" className="w-48 h-64 object-cover rounded-xl" />
            <img src={Instructor5} alt="Instructor 5" className="w-48 h-64 object-cover rounded-xl" />
          </div>

          {/* Founder Info */}
          <div className="text-center max-w-2xl mx-auto space-y-2 text-base text-[#333]">
            <p><strong>Ms. Kanchana Arachchi | Founder – AECA</strong></p>
            <p>BA (Asian University for Women BD | California State University, L.B)</p>
            <p>MA: MLRHRM (University of Colombo, Sri Lanka)</p>
            <p>CIPM (CCHRM - Chartered Institute of Personnel Management Sri Lanka)</p>
          </div>

          {/* Signature */}
          <div className="mt-10 flex justify-center">
            <img src={Sign} alt="Signature" className="w-auto max-w-sm" />
          </div>
        </section>

        {/* Co-Founder & Managing Director Section */}
        <section className="bg-[#fdf7f5] px-4 py-12 rounded-2xl mb-16">
          <h3 className="text-2xl font-semibold text-[#800000] text-center mb-8">
            Co-Founder & Managing Director
          </h3>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-10">
            <img src={Cofounder1} alt="Co-Founder 1" className="w-48 h-64 object-cover rounded-xl" />
            <img src={Cofounder2} alt="Co-Founder 2" className="w-48 h-64 object-cover rounded-xl" />
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-2 text-base text-[#333]">
            <p><strong>Mr. Anton Sujeeva Perera | Co-Founder & Managing Director – AECA</strong></p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Staff;
