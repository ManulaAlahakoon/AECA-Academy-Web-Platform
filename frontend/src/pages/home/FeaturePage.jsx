import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const features = [
  {
    title: 'English-Learning Chatbot',
    description: 'Ask questions, get grammar help, and practice conversations 24/7 with our smart AI-powered chatbot.',
    icon: '🤖',
  },
  {
    title: 'Assignment Submission',
    description: 'Easily upload and manage your assignments from your dashboard with deadline reminders.',
    icon: '📝',
  },
  {
    title: 'Sentiment-Based Feedback',
    description: 'Students can submit feedback, and the system provides automatic analysis to help teachers improve the learning experience.',
    icon: '📊',
  },
  {
    title: 'Course Materials Access',
    description: 'Download notes and resources for each class conveniently.',
    icon: '📚',
  },
  {
    title: 'Announcements and Updates',
    description: 'Stay informed with important updates and announcements shared by teachers and admins.',
    icon: '💬',
  },
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex flex-col px-6 md:px-20 pt-6 space-y-12 flex-grow">
        {/* Title Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#800000] mb-4">
            AECA Academy Features
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Explore the unique features that make AECA Academy a comprehensive and student-friendly English learning platform.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#fdf8f8] rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300 text-center flex flex-col items-center"
            >
              <div className="text-5xl bg-[#800000] text-white rounded-full w-20 h-20 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#800000] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-base mb-2 text-justify">
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
