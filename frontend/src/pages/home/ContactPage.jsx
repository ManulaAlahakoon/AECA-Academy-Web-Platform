import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex flex-col px-6 md:px-20 pt-[260px] space-y-16 flex-grow">
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
        <section className="flex flex-col items-center space-y-4 text-lg text-gray-700">
          <div className="flex items-center gap-3 bg-[#fdf3f3] px-6 py-3 rounded-xl shadow hover:shadow-md transition">
            <FaEnvelope className="text-[#800000]" />
            <span><strong>Email:</strong> aeca.edu.lk@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 bg-[#fdf3f3] px-6 py-3 rounded-xl shadow hover:shadow-md transition">
            <FaPhoneAlt className="text-[#800000]" />
            <span><strong>Phone:</strong> +94 76 220 0670</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
