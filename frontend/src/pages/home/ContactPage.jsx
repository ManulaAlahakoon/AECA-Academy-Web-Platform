import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Instructor1 from '../../assets/instructor1.jpg';
import Instructor2 from '../../assets/instructor2.jpg';
import Instructor3 from '../../assets/instructor3.jpg';
import Instructor4 from '../../assets/instructor4.jpg';
import Instructor5 from '../../assets/instructor5.jpg';
import Sign from '../../assets/imp.png';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex flex-col px-6 md:px-20 pt-6 space-y-12 flex-grow">
        {/* Title Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#800000] mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Reach out to us for course details, enrollment support, or any inquiries. We're always happy to help!
          </p>
        </section>

        {/* Contact Info */}
        <section className="text-center text-gray-700 text-lg space-y-2">
          <p><strong>Email:</strong> aeca.edu.lk@gmail.com</p>
          <p><strong>Phone:</strong> +94 76 220 0670</p>
          <p><strong>Location:</strong> No.123, AECA Academy, Colombo, Sri Lanka</p>
        </section>

        {/* Instructor Section */}
        <section className="bg-[#fcf0ed] px-4 py-12 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold text-center text-[#800000] mb-8">
            Meet Our Instructor
          </h2>

          {/* Top Image Row */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-6">
            <img src={Instructor1} alt="Instructor 1" className="w-48 h-64 object-cover rounded-xl" />
            <img src={Instructor2} alt="Instructor 2" className="w-48 h-64 object-cover rounded-xl" />
          </div>

          {/* Instructor Details */}
          <div className="text-center max-w-2xl mx-auto space-y-2 text-base text-[#333]">
            <p><strong>Ms. Kanchana Arachchi | Founder A E C A</strong></p>
            <p>BA (Asian University for Women BD | California State University, L.B)</p>
            <p>MA: MLRHRM (University of Colombo, Sri Lanka)</p>
            <p>CIPM (CCHRM - Chartered Institute of Personnel Management Sri Lanka)</p>
          </div>

          {/* Bottom Image Row */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mt-8">
            <img src={Instructor3} alt="Instructor 3" className="w-48 h-64 object-cover rounded-xl" />
            <img src={Instructor4} alt="Instructor 4" className="w-48 h-64 object-cover rounded-xl" />
            <img src={Instructor5} alt="Instructor 5" className="w-48 h-64 object-cover rounded-xl" />
          </div>

          {/* Signature Image without border or shadow */}
          <div className="mt-10 flex justify-center">
            <img src={Sign} alt="Signature" className="w-auto max-w-sm" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
