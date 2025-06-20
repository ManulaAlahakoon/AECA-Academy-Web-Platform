import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { useNavigate } from "react-router-dom";

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState({});
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

  const handleUploadMaterial = (courseId) => {
    navigate(`/teacher/course/${courseId}/upload-material`);
  };

  const handleUploadAssignment = (courseId) => {
    navigate(`/teacher/course/${courseId}/upload-assignment`);
  };

  const toggleExpand = (courseId) => {
    setExpanded((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-[#800000] mb-6">
        My Assigned Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => {
          const isExpanded = expanded[course._id];
          const description = course.description || "No description provided";
          const shortDesc = description.slice(0, 100);

          return (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
              style={{ minHeight: "420px" }}
            >
              {/* Top Section */}
              <div className="flex-grow">
                <img
                  src={course.image || "https://via.placeholder.com/300x200"}
                  alt={course.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h2 className="text-xl font-semibold text-[#800000] mb-1">
                  {course.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">Instructor: You</p>
                <p className="text-gray-700 text-sm mb-2">
                  {isExpanded ? description : shortDesc}
                  {description.length > 100 && (
                    <button
                      onClick={() => toggleExpand(course._id)}
                      className="ml-2 text-[#800000] text-xs underline"
                    >
                      {isExpanded ? "See less" : "See more"}
                    </button>
                  )}
                </p>
              </div>

              {/* Bottom Buttons */}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => handleUploadMaterial(course._id)}
                  className="bg-[#800000] hover:bg-[#a00000] text-white text-sm rounded-md shadow-md transition duration-200"
                  style={{
                    width: "140px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title="Upload Materials"
                >
                  Upload Materials
                </button>

                <button
                  onClick={() => handleUploadAssignment(course._id)}
                  className="bg-[#800000] hover:bg-[#a00000] text-white text-sm rounded-md shadow-md transition duration-200"
                  style={{
                    width: "140px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title="Upload Assignments"
                >
                  Upload Assignments
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherCourses;
