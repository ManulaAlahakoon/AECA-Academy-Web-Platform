import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { useNavigate } from "react-router-dom";

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [uploadCourse, setUploadCourse] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState("lecture"); // 'lecture' or 'assignment'

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

  const handleUploadMaterial = (courseName, courseId) => {
    localStorage.setItem("selectedCourseId", courseId);
    setUploadCourse(courseName);
    setUploadType("lecture");
    setShowModal(true);
  };

  const handleUploadAssignment = (courseName, courseId) => {
    localStorage.setItem("selectedCourseId", courseId);
    setUploadCourse(courseName);
    setUploadType("assignment");
    setShowModal(true);
  };

  const toggleExpand = (courseId) => {
    setExpanded((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadCourse || !uploadFile) return alert("Please select course and file");

    const formData = new FormData();
    formData.append("course", uploadCourse);
    formData.append("file", uploadFile);
    formData.append("type", uploadType);

    const endpoint =
      uploadType === "assignment"
        ? "http://localhost:5000/api/teacher/assignments/upload"
        : "http://localhost:5000/api/teacher/materials/upload";

    try {
      setUploading(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server returned non-JSON response");
      }

      if (res.ok && data.success) {
        alert(`${uploadType === "assignment" ? "Assignment" : "Material"} uploaded successfully.`);
        setShowModal(false);
        setUploadCourse("");
        setUploadFile(null);
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch (err) {
      alert("Error uploading: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // const handleClick = (courseId) => {
  //   navigate(`/teacher/course/${courseId}`);
  // };
  
 //dev
  const handleClick = (course) => {
    navigate(`/teacher/course/${course._id}`, { state: { course } });
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
                  onClick={() => handleUploadMaterial(course.name, course._id)}
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
                  onClick={() => handleUploadAssignment(course.name, course._id)}
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
      {/* dev */}
         {/* {courses.map((course) => (
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
         ))} */}
 {/* Dev */}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold text-maroon-700 mb-4">
              Upload {uploadType === "assignment" ? "Assignment" : "Material"} for: {uploadCourse}
            </h2>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select File
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="w-full mt-1"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#a00000]"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
