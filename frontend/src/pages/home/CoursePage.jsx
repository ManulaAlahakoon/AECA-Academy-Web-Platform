import React from 'react';
import Navbar from '../../components/Navbar';

const courses = [
  {
    title: 'IELTS Preparation',
    description: 'Get ready for your IELTS exam with expert guidance, mock tests, and speaking practice sessions.',
    duration: '8 Weeks',
    level: 'Intermediate to Advanced',
  },
  {
    title: 'PTE Academic Training',
    description: 'Master the Pearson Test of English with structured lessons and AI-based practice tools.',
    duration: '6 Weeks',
    level: 'Intermediate',
  },
  {
    title: 'Spoken English',
    description: 'Improve fluency, pronunciation, and confidence through engaging conversation classes.',
    duration: '4 Weeks',
    level: 'Beginner to Intermediate',
  },
  {
    title: 'Business English',
    description: 'Learn professional communication, presentations, emails, and interviews for the workplace.',
    duration: '6 Weeks',
    level: 'Intermediate',
  },
];

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-[#800000] mb-10">
          Our Courses
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-[#fefefe] border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-[#800000] mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Duration:</span> {course.duration}<br />
                <span className="font-semibold">Level:</span> {course.level}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
