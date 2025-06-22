import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { useNavigate } from "react-router-dom";

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await apiFetch("/api/teacher/courses");
      setCourses(res.courses);
    } catch (err) {
      alert("Error loading courses: " + err.message);
    }
  };

  // const handleClick = (courseId) => {
  //   navigate(`/teacher/course/${courseId}`);
  // };

  const handleClick = (course) => {
    navigate(`/teacher/course/${course._id}`, { state: { course } });
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-[#800000] mb-6">
        My Assigned Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => handleClick(course)}
            className="cursor-pointer bg-white p-4 shadow rounded hover:shadow-lg transition"
          >
            <img
              src={course.image || "https://via.placeholder.com/300x200"}
              alt={course.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold text-[#800000] mb-1">
              {course.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2">Instructor: You</p>
            <p className="text-gray-700 text-sm">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourses;
