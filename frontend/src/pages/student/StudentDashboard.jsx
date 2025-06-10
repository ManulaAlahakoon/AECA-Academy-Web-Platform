import React, { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await apiFetch("/api/courses/enabled-courses");
      setCourses(res.courses);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await apiFetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
      });
      alert("Enrolled successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#800000]">
        Available Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded shadow p-4 flex flex-col"
          >
            <img
              src={course.image || "https://via.placeholder.com/300x200"}
              alt={course.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold text-[#800000] mb-1">
              {course.name}
            </h2>
            <p className="text-gray-600 mb-2">
              {course.assignedTeacher
                ? `Instructor: ${course.assignedTeacher.name}`
                : "Instructor: TBD"}
            </p>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <button
              onClick={() => handleEnroll(course._id)}
              className="bg-[#800000] hover:bg-[#660000] text-white py-2 rounded font-semibold mt-auto"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   FaUserCircle,
//   FaBookOpen,
//   FaFileDownload,
//   FaTasks,
//   FaBullhorn,
//   FaComments,
//   FaRobot,
// } from "react-icons/fa";

// const features = [
//   {
//     title: "My Profile",
//     icon: <FaUserCircle className="w-8 h-8 text-[#800000]" />,
//     description: "View and update your personal information.",
//     link: "/student/profile",
//   },
//   {
//     title: "Enrolled Courses",
//     icon: <FaBookOpen className="w-8 h-8 text-[#800000]" />,
//     description: "Browse and access your enrolled courses.",
//     link: "/student/courses",
//   },
//   {
//     title: "Study Materials",
//     icon: <FaFileDownload className="w-8 h-8 text-[#800000]" />,
//     description: "Download lecture notes and resources.",
//     link: "/student/materials",
//   },
//   {
//     title: "Assignments",
//     icon: <FaTasks className="w-8 h-8 text-[#800000]" />,
//     description: "Upload and track your assignments.",
//     link: "/student/assignments",
//   },
//   {
//     title: "Announcements",
//     icon: <FaBullhorn className="w-8 h-8 text-[#800000]" />,
//     description: "Stay informed with course updates and news.",
//     link: "/student/announcements",
//   },
//   {
//     title: "Feedback",
//     icon: <FaComments className="w-8 h-8 text-[#800000]" />,
//     description: "Submit and review your feedback.",
//     link: "/student/feedback",
//   },
//   {
//     title: "AI Chatbot",
//     icon: <FaRobot className="w-8 h-8 text-[#800000]" />,
//     description: "Ask academic and English-related questions.",
//     link: "/student/chatbot",
//   },
// ];

// const StudentDashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="p-6">
//       <h1 className="text-[#800000] text-3xl font-semibold text-center">
//         Welcome, {user?.name || "Student"}!
//       </h1>

//       {/* Location Indicator */}
//       <div className="text-sm text-gray-500 text-center mt-2">
//         You are here: <span className="font-semibold text-[#800000]">Dashboard</span>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//         {features.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
//           >
//             <div>
//               <div className="flex items-center space-x-4 mb-4">
//                 {item.icon}
//                 <h2 className="text-lg font-bold text-[#800000]">
//                   {item.title}
//                 </h2>
//               </div>
//               <p className="text-gray-600 text-sm">{item.description}</p>
//             </div>
//             <div className="mt-6 flex justify-center">
//               <Link to={item.link}>
//                 <button className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#a30000]">
//                   Go to {item.title}
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
