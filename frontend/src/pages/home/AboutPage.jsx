import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AboutImage from '../../assets/about.png';
import ClassImage1 from '../../assets/group.jpg';
import ClassImage2 from '../../assets/individual.jpg';
import ClassImage3 from '../../assets/certificate.jpg';
import Video1 from '../../assets/feedback01.mp4';
import Video2 from '../../assets/feedback02.mp4';
import Video3 from '../../assets/feedback03.mp4';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex flex-col px-6 md:px-20 pt-[260px] space-y-28">
        
        <h2 className="text-3xl font-bold text-[#800000] text-center mb-6">
          About Us
        </h2>

        {/* Intro Section */}
        <section className="flex flex-col md:flex-row items-center gap-10 bg-[#ffffff] p-6 md:p-10 rounded-2xl shadow mb-10 md:mb-20">
          <div className="md:w-1/2 text-lg text-gray-800 space-y-4 text-justify leading-relaxed tracking-wide">
            <p>
              Our mission is to empower learners through high-quality English language education, enabling them to excel in international examinations, communicate effectively in professional settings, and pursue their career aspirations confidently.
            </p>
            <p>
              Our vision is to create a supportive and engaging learning environment where every student can develop strong English language skills, build confidence, and unlock new opportunities for academic and professional success worldwide.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={AboutImage}
              alt="AECA Overview"
              className="rounded-xl w-full max-w-[350px] h-[350px] mx-auto object-contain"
            />
          </div>
        </section>

        {/* Course Options */}
        <section className="mb-10 md:mb-20">
          <h3 className="text-2xl font-semibold text-[#800000] mb-2 text-center">
            Course Options
          </h3>
          <div className="w-24 h-1 bg-[#800000] mx-auto mb-8 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: 'Small Group Classes',
                desc: 'Only 5 students per class. Instructor gives individual attention.',
                img: ClassImage1,
              },
              {
                title: 'Individual Sessions',
                desc: 'Schedule classes based on your availability and preference.',
                img: ClassImage2,
              },
              {
                title: 'Certificate Courses',
                desc: 'Earn recognized certificates for Spoken English courses.',
                img: ClassImage3,
              },
            ].map((item, index) => (
              <div key={index} className="space-y-5">
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-xl w-full h-[220px] object-cover"
                />
                <h4 className="text-xl font-semibold text-[#800000]">{item.title}</h4>
                <p className="text-gray-700 leading-relaxed tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Student Feedback */}
        <section className="mb-10 md:mb-20">
          <h3 className="text-2xl font-semibold text-[#800000] mb-2 text-center">
            Student Feedback
          </h3>
          <div className="w-24 h-1 bg-[#800000] mx-auto mb-8 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[Video1, Video2, Video3].map((videoSrc, index) => (
              <video
                key={index}
                src={videoSrc}
                controls
                className="rounded-xl w-full h-[220px] object-cover"
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
