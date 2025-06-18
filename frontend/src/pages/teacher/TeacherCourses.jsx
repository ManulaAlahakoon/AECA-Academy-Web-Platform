// File: src/pages/teacher/TeacherCourses.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const teacherId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/teacher/${teacherId}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching teacher courses:", error);
        setCourses([
          {
            _id: "dummy1",
            name: "Introduction to Computer Science",
            studentCount: 42,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
// if teacherid didn't found navigate to teacherdashboard page
    if (teacherId) {
      fetchCourses();

      const interval = setInterval(fetchCourses, 10000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
      navigate("/teacher");
    }
  }, [teacherId, navigate]);

  const handleAddMaterial = (courseId) => {
    navigate(`/teacher/lecturematerials/${courseId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-[#800000]">
          <h2 className="text-xl font-semibold text-[#800000] mb-2">
            Introduction to Computer Science
          </h2>
          <p className="text-sm text-gray-700 mb-3">Students Enrolled: 42</p>
          <button onClick={() => navigate(`/teacher/lecturematerials/${courses._id}`)}>
  Add Lecture Materials
</button>

        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-lg p-5 border-l-4 border-[#800000]"
            >
              <h2 className="text-xl font-semibold text-[#800000] mb-2">
                {course.name}
              </h2>
              <p className="text-sm text-gray-700 mb-3">
                Students Enrolled: {course.studentCount}
              </p>
              <button
                onClick={() => handleAddMaterial(course._id)}
                className="bg-[#800000] hover:bg-[#990000] text-white px-4 py-2 rounded-md transition"
              >
                Add Lecture Materials
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
