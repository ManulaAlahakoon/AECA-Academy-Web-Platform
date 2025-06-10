import React from 'react';
import Navbar from '../../components/Navbar';

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
    description: 'Submit feedback and receive automatic analysis to improve the learning experience.',
    icon: '📊',
  },
  {
    title: 'Course Materials Access',
    description: 'Download notes, recordings, and resources for each class securely and conveniently.',
    icon: '📚',
  },
  {
    title: 'Student-Teacher Communication',
    description: 'Get quick responses from teachers, and stay updated via announcements.',
    icon: '💬',
  },
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-[#800000] mb-10">
          AECA Academy Features
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#f9f9f9] rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold text-[#800000] mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
