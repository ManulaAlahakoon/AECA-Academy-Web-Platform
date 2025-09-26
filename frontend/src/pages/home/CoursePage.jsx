import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import CourseImg1 from '../../assets/a.jpg';
import CourseImg2 from '../../assets/b.jpg';
import CourseImg3 from '../../assets/c.jpg';
import CourseImg4 from '../../assets/d.jpg';
import CourseImg6 from '../../assets/f.jpg';
import group from '../../assets/group.jpg';
const courses = [
  {
    title: 'IELTS (individual/ small group)',
    description: 'we specialize in preparing students for various internationally recognized English exams, including IELTS.',
    moreInfo: 'Our experienced instructors provide targeted training that covers all 04 areas of the exams, from reading and writing to speaking and listening, ensuring that students are well-equipped to achieve their desired scores.',
    image: CourseImg1,
  },
  {
    title: '⁠PTE (individual/small group)',
    description: 'We offer tailored PTE courses specifically for basic English speakers. These courses focus on building fundamental language skills, ',
    moreInfo: 'enhancing vocabulary, and improving communication abilities in all PTE sections. Our immersive learning environment fosters confidence and fluency step by step.',
    image: CourseImg2,
  },
  {
    title: '⁠Spoken English for Career Advancement (SECA)',
    description: 'Understanding the importance of English proficiency in today’s global job market,',
    moreInfo: 'AECA provides specialized courses aimed at equipping professionals with the necessary language skills for career growth.These courses emphasize business communication, presentation skills, and networking strategies in English, enhancing employability and professional relationships.',
    image: CourseImg3,
  },
  {
    title: 'General English (Local G1-13) / International O/L & A/L)',
    description: 'At AECA we offer small group teaching specifically designed to prepare students for local and international school exams, focusing on the General English exam.',
    moreInfo: 'Our courses cater to both Ordinary Level (O/L) and Advanced Level (A/L) students, providing a tailored educational experience that emphasizes individualized attention and support.',
    image: CourseImg4,
  },
  {
    title: 'English  Language for Kids (ELK)',
    description: 'For children learning English, small group instruction combined with individual attention can significantly enhance their language acquisition process.',
    moreInfo: 'ELK course provides small group support with individual attention for kids learning English is a powerful strategy that addresses their unique learning needs. By fostering a supportive environment where children feel safe to explore and practice.',
    image: group,
  },
  {
    title: 'Professional Services for Career Advancement (PSCA)',
    description: 'Professional Services for Career Advancement (PSCA) offers comprehensive support in various writing domains to empower individuals in achieving their career goals.',
    moreInfo: 'Our expertise ranges from CV and resume writing to business proposal development, project report creation, assignment proofreading, and citation writing. We understand that each of these elements is crucial in presenting your skills and knowledge effectively. By leveraging our services, you can enhance your professional documentation, ensure clarity in your assignments, and make a lasting impression on potential employers or partners. In PSCA services , we are committed to your success and provide tailored assistance to meet your unique needs. Let us partner with you on your journey to professional advancement.',
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

      <main className="flex flex-col px-6 md:px-20 pt-[260px] space-y-12">
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
