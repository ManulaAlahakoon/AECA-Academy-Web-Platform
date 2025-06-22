import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TeacherCourseInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  if (!course) {
    return (
      <div className="p-6">
        <p className="text-red-600">No course data provided.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#800000]">{course.name}</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <img
        src={course.image || "https://via.placeholder.com/600x300"}
        alt={course.name}
        className="w-full max-w-2xl mx-auto h-64 object-cover rounded shadow mb-6"
      />

      <div className="text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-lg">
          {course.description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default TeacherCourseInfo;
