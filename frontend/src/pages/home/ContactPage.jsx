import React from 'react';
import Navbar from '../../components/Navbar';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-[#800000] mb-10">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[#800000] focus:border-[#800000]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[#800000] focus:border-[#800000]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="5"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[#800000] focus:border-[#800000]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#800000] text-white px-6 py-2 rounded-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-gray-100 p-6 rounded-md shadow">
            <h2 className="text-2xl font-semibold text-[#800000] mb-4">AECA Academy</h2>
            <p className="text-gray-700 mb-2">
              📍 123 Main Street, Colombo, Sri Lanka
            </p>
            <p className="text-gray-700 mb-2">
              📞 +94 76 123 4567
            </p>
            <p className="text-gray-700 mb-2">
              📧 contact@aecacademy.lk
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#800000] mb-2">Business Hours</h3>
              <p className="text-gray-700">Monday - Friday: 9 AM – 6 PM</p>
              <p className="text-gray-700">Saturday: 9 AM – 1 PM</p>
              <p className="text-gray-700">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
