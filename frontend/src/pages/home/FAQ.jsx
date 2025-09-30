import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Is AECA an online or onsite education provider?',
      answer: 'AECA offers a flexible learning experience with both online and onsite education options. This is designed to cater to the needs of our diverse clientele, whether they prefer virtual learning from the comfort of their own homes or hands-on training in a classroom setting. Our goal is to provide quality education accessible to everyone, regardless of their location.',
    },
    {
      question: 'Can students join your academy?',
      answer: 'Absolutely! Our academy is open to students from around the globe. We currently serve a wide range of international clients, including those from Poland, Vietnam, Myanmar, and Bangladesh. We believe in fostering an inclusive environment where students from various backgrounds can come together to learn and grow.',
    },
    {
      question: 'Do you provide a certificate?',
      answer: ' Yes, we are pleased to issue a valid certificate to participants who successfully complete any of our programs. Our certificates are recognized and valued, providing added credibility to your skills and knowledge gained through our courses. This certification can be a valuable addition to your professional portfolio.',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="pt-[260px] px-6 pb-12 flex-1 max-w-5xl mx-auto w-full">
        <h3 className="text-3xl font-semibold text-[#800000] mb-8 text-center">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className={`
                bg-gradient-to-r from-pink-50 via-red-50 to-yellow-50 
                rounded-2xl border border-[#f3c6c6] 
                shadow-md cursor-pointer p-6 
                transition duration-300
                hover:shadow-lg hover:ring-2 hover:ring-[#d97706]
              `}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-[#800000]">
                  {faq.question}
                </h4>
                <span
                  className={`text-2xl font-bold text-[#800000] transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  +
                </span>
              </div>
              <div
                className={`mt-4 text-gray-700 leading-relaxed tracking-wide overflow-hidden transition-max-height duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
                style={{ transitionProperty: 'max-height' }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
