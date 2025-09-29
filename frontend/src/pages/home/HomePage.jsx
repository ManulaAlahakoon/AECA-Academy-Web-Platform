import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Images & Videos
import HeroImage from '../../assets/m.jpg';
import AboutImage from '../../assets/about.png';
import ClassImage1 from '../../assets/group.jpg';
import ClassImage2 from '../../assets/individual.jpg';
import ClassImage3 from '../../assets/certificate.jpg';
import Video1 from '../../assets/feedback01.mp4';
import Video2 from '../../assets/feedback02.mp4';
import Video3 from '../../assets/feedback03.mp4';

import CourseImg1 from '../../assets/a.jpg';
import CourseImg2 from '../../assets/b.jpg';
import CourseImg3 from '../../assets/c.jpg';
import CourseImg4 from '../../assets/d.jpg';
import CourseImg6 from '../../assets/f.jpg';
import group from '../../assets/group.jpg';

import Instructor2 from '../../assets/instructor2.jpg';
import Instructor3 from '../../assets/instructor3.jpg';
import Instructor5 from '../../assets/instructor5.jpg';
import Sign from '../../assets/imp.png';
import Cofounder1 from '../../assets/cofounder1.jpg';
import Cofounder2 from '../../assets/cofounder2.jpg';

// Courses data 
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
    moreInfo: 'Our expertise ranges from CV and resume writing to business proposal development, project report creation, assignment proofreading, and citation writing. We understand that each of these elements is crucial in presenting your skills and knowledge effectively. By leveraging our services, you can enhance your professional documentation, ensure clarity in your assignments, and make a lasting impression on potential employers or partners. In PSCA services , we are committed to your success and provide tailored assistance to meet your unique needs. Let us partner with you on your journey to professional advancement.',
    image: CourseImg6,
  },
];

// Features data 
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

const HomePage = () => {
  const [expanded, setExpanded] = useState(Array(courses.length).fill(false));
  const toggleMore = (index) => {
    const updated = [...expanded];
    updated[index] = !updated[index];
    setExpanded(updated);
  };


  const mainStyle = { paddingTop: 'var(--header-height, 200px)' };
  const sectionStyle = { scrollMarginTop: 'var(--header-height, 200px)' };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex flex-col pt-[250px] space-y-28 px-6 md:px-20">

{/* HOME SECTION */}
<section
  id="home"
  data-section-id="home"
  style={sectionStyle}
  className="relative w-full h-screen flex items-center justify-center"
>
  {/* Background Image */}
  <img
    src={HeroImage} // replace with your image
    alt="AECA Academy"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay for readability */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Text Box */}
  <div className="relative z-10 flex items-center justify-center w-full h-full px-6 md:px-20">
    <div className="bg-black/60 rounded-xl p-8 shadow-2xl">
      <p className="text-xl md:text-1xl font-bold text-white leading-relaxed text-center">
        AECA is a premier English language academy dedicated to helping individuals
        achieve their language goals, whether for academic pursuits, professional
        advancement, or personal enrichment.
        <br /><br />
        Our comprehensive programs focus on international exam preparation, English
        for non-native speakers, and essential English skills required for career
        enhancement.
      </p>
    </div>
  </div>
</section>





        {/* ABOUT SECTION */}
        <section id="about" data-section-id="about" style={sectionStyle} className="space-y-10">
          <h2 className="text-3xl font-bold text-[#800000] text-center">About Us</h2>
          <div className="flex flex-col md:flex-row items-center gap-10 bg-[#fcf0ed] p-6 md:p-10 rounded-2xl shadow">
            <div className="md:w-1/2 text-lg text-gray-800 space-y-4 text-justify">
              <p>
                Our mission is to empower learners through high-quality English language education, enabling them to excel in international examinations, communicate effectively in professional settings, and pursue their career aspirations confidently.
              </p>
              <p>
                Our vision is to create a supportive and engaging learning environment where every student can develop strong English language skills, build confidence, and unlock new opportunities for academic and professional success worldwide.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src={AboutImage} alt="AECA Overview" className="rounded-xl w-full max-w-[350px] h-[350px] mx-auto object-contain" />
            </div>
          </div>

          {/* Course Options */}
          <div>
            <h3 className="text-2xl font-semibold text-[#800000] text-center mb-2">Course Options</h3>
            <div className="w-24 h-1 bg-[#800000] mx-auto mb-8 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[{title:'Small Group Classes',desc:'Only 5 students per class. Instructor gives individual attention.',img:ClassImage1},
                {title:'Individual Sessions',desc:'Schedule classes based on your availability and preference.',img:ClassImage2},
                {title:'Certificate Courses',desc:'Earn recognized certificates for Spoken English courses.',img:ClassImage3}]
                .map((item, index) => (
                  <div key={index} className="space-y-5">
                    <img src={item.img} alt={item.title} className="rounded-xl w-full h-[220px] object-cover" />
                    <h4 className="text-xl font-semibold text-[#800000]">{item.title}</h4>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
              ))}
            </div>
          </div>

          {/* Student Feedback */}
          <div>
            <h3 className="text-2xl font-semibold text-[#800000] text-center mb-2">Student Feedback</h3>
            <div className="w-24 h-1 bg-[#800000] mx-auto mb-8 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[Video1, Video2, Video3].map((videoSrc, i) => (
                <video key={i} src={videoSrc} controls className="rounded-xl w-full h-[220px] object-cover" />
              ))}
            </div>
          </div>
        </section>

        {/* COURSES SECTION */}
        <section id="courses" data-section-id="courses" style={sectionStyle} className="space-y-12">
          <h2 className="text-3xl font-bold text-[#800000] text-center">AECA Courses</h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto">
            Discover our personalized and group English learning programs designed for academic, career, and personal growth.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, index) => (
              <div key={index} className="bg-[#fdf8f8] rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
                <img src={course.image} alt={course.title} className="rounded-xl w-full h-48 object-cover mb-4" />
                <h3 className="text-xl font-semibold text-[#800000] mb-2 text-center">{course.title}</h3>
                <p className="text-gray-700 text-base text-justify">
                  {course.description}
                  {expanded[index] && (<span className="block mt-2">{course.moreInfo}</span>)}
                </p>
                <p onClick={() => toggleMore(index)} className="text-sm text-blue-600 cursor-pointer mt-2 hover:underline">
                  {expanded[index] ? 'See less' : 'See more'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" data-section-id="features" style={sectionStyle} className="space-y-12">
          <h2 className="text-3xl font-bold text-[#800000] text-center">AECA Academy Features</h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto">
            Explore the unique features that make AECA Academy a comprehensive and student-friendly English learning platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#fdf8f8] rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300 text-center flex flex-col items-center">
                <div className="text-5xl bg-[#800000] text-white rounded-full w-20 h-20 flex items-center justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#800000] mb-3">{feature.title}</h3>
                <p className="text-gray-700 text-base text-justify">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STAFF SECTION */}
        <section id="staff" data-section-id="staff" style={sectionStyle} className="space-y-12">
          <h2 className="text-3xl font-bold text-[#800000] text-center">Meet Our Instructors</h2>
          <div className="bg-[#fcf0ed] px-4 py-12 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#800000] text-center mb-8">Founder</h3>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-10">
              <img src={Instructor2} alt="Instructor 2" className="w-48 h-64 object-cover rounded-xl" />
              <img src={Instructor3} alt="Instructor 3" className="w-48 h-64 object-cover rounded-xl" />
              <img src={Instructor5} alt="Instructor 5" className="w-48 h-64 object-cover rounded-xl" />
            </div>
            <div className="text-center max-w-2xl mx-auto space-y-2 text-base text-[#333]">
              <p><strong>Ms. Kanchana Arachchi | Founder – AECA</strong></p>
              <p>BA (Asian University for Women BD | California State University, L.B)</p>
              <p>MA: MLRHRM (University of Colombo, Sri Lanka)</p>
              <p>CIPM (CCHRM - Chartered Institute of Personnel Management Sri Lanka)</p>
            </div>
            <div className="mt-10 flex justify-center">
              <img src={Sign} alt="Signature" className="w-auto max-w-sm" />
            </div>
          </div>

          <div className="bg-[#fdf7f5] px-4 py-12 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#800000] text-center mb-8">Co-Founder & Managing Director</h3>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-10">
              <img src={Cofounder1} alt="Co-Founder 1" className="w-48 h-64 object-cover rounded-xl" />
              <img src={Cofounder2} alt="Co-Founder 2" className="w-48 h-64 object-cover rounded-xl" />
            </div>
            <div className="text-center max-w-2xl mx-auto space-y-2 text-base text-[#333]">
              <p><strong>Mr. Anton Sujeeva Perera | Co-Founder & Managing Director – AECA</strong></p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
