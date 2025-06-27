import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import CourseImg1 from '../../assets/a.jpg';
import CourseImg2 from '../../assets/b.jpg';
import CourseImg3 from '../../assets/c.jpg';
import CourseImg4 from '../../assets/d.jpg';
import CourseImg5 from '../../assets/e.jpg';
import CourseImg6 from '../../assets/f.jpg';

const courses = [
  {
    title: 'Spoken English',
    description: 'Enhance your speaking skills for daily communication, interviews, and social interaction.',
    moreInfo: 'This course focuses on fluency, pronunciation, vocabulary building, and interactive conversation sessions.',
    image: CourseImg1,
  },
  {
    title: 'Business English',
    description: 'Develop professional communication skills for meetings, emails, and workplace success.',
    moreInfo: 'Includes formal writing, negotiation skills, presentations, and role-plays to prepare you for the corporate world.',
    image: CourseImg2,
  },
  {
    title: 'IELTS',
    description: 'Prepare for the IELTS exam with targeted training in listening, speaking, reading, and writing.',
    moreInfo: 'Get mock tests, speaking simulations, band score estimations, and personal feedback.',
    image: CourseImg3,
  },
  {
    title: 'PTE',
    description: 'Get ready for the Pearson Test of English with guided practice and strategies.',
    moreInfo: 'Learn time management strategies, scoring criteria, and tips to maximize your PTE score.',
    image: CourseImg4,
  },
  {
    title: 'Global Exams Services',
    description: 'Support for various international English proficiency exams and test preparation.',
    moreInfo: 'We help with TOEFL, Duolingo, and other certifications with expert-led sessions and resources.',
    image: CourseImg5,
  },
  {
    title: 'USA Agents and Counsellors',
    description: 'Connect with certified agents and advisors for study and immigration pathways in the USA.',
    moreInfo: 'Get guidance on university applications, visa processes, scholarships, and academic advising.',
    image: CourseImg6,
  },
];

const CoursePage = () => {
  const [expanded, setExpanded] = useState(Array(courses.length).fill(false));

  const toggleMore = (index) => {
    const updated = [...expanded];
    updated[index] = !updated[index];
    setExpanded(updated);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex flex-col px-6 md:px-20 pt-6 space-y-12">
        {/* Title */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#800000] mb-4">
            AECA Courses
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Discover our personalized and group English learning programs designed for academic, career, and personal growth.
          </p>
        </section>

        {/* Courses Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-[#fdf8f8] rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded-xl w-full h-48 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-[#800000] mb-2 text-center">
                {course.title}
              </h3>
              <p className="text-gray-700 text-base text-justify">
                {course.description}
                {expanded[index] && (
                  <span className="block mt-2 text-gray-700">{course.moreInfo}</span>
                )}
              </p>
              <p
                className="text-sm text-blue-600 cursor-pointer mt-2 hover:underline"
                onClick={() => toggleMore(index)}
              >
                {expanded[index] ? 'See less' : 'See more'}
              </p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CoursePage;
