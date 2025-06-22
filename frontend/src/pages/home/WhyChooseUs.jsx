import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhyImage from '../../assets/why.png';

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="pt-[260px] px-6 pb-8 flex-grow">
        {/* Title Section */}
        <section className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-[#800000] mb-4">
            Why Choose Us
          </h2>
        </section>

        {/* Main Content Section */}
        <section className="flex flex-col md:flex-row items-start gap-16 max-w-6xl mx-auto px-2 md:px-6">
          {/* Text Content */}
          <div className="md:w-1/2 text-justify space-y-6 text-[18px] leading-[1.9] text-gray-800">
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Experienced Instructors:</strong> Our faculty consists of highly qualified educators with extensive experience in language instruction.
              </li>
              <li>
                <strong>Personalized Learning:</strong> We assess the individual needs of our students to create customized learning plans that align with their goals.
              </li>
              <li>
                <strong>Supportive Environment:</strong> We cultivate an inclusive and encouraging atmosphere, ensuring that every learner feels valued and motivated to succeed.
              </li>
              <li>
                <strong>Continuous Improvement:</strong> We regularly update our curriculum and teaching methods to align with current trends and student feedback, ensuring the highest standards in English language education.
              </li>
            </ul>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={WhyImage}
              alt="Why Choose Us"
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyChooseUs;
