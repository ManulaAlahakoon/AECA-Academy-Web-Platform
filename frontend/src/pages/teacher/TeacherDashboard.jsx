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
  const [uploadType, setUploadType] = useState("lecture");
  const [uploadTopic, setUploadTopic] = useState("");
  const [uploadDueDate, setUploadDueDate] = useState("");

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
    setUploadTopic("");
    setUploadDueDate("");
    setShowModal(true);
  };

  const handleUploadAssignment = (courseName, courseId) => {
    localStorage.setItem("selectedCourseId", courseId);
    setUploadCourse(courseName);
    setUploadType("assignment");
    setUploadTopic("");
    setUploadDueDate("");
    setShowModal(true);
  };

  const toggleExpand = (courseId) => {
    setExpanded((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadCourse || !uploadFile || !uploadTopic) {
      return alert("Please fill all required fields.");
    }

    const formData = new FormData();
    formData.append("course", uploadCourse);
    formData.append("file", uploadFile);
    formData.append("type", uploadType);
    formData.append("topic", uploadTopic);
    if (uploadType === "assignment") {
      formData.append("dueDate", uploadDueDate);
    }

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
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed. Server said: ${errorText}`);
      }
      const data = await res.json();

      if (res.ok && data.success) {
        alert(
          `${uploadType === "assignment" ? "Assignment" : "Material"} uploaded successfully.`
        );
        setShowModal(false);
        setUploadCourse("");
        setUploadFile(null);
        setUploadTopic("");
        setUploadDueDate("");
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch (err) {
      alert("Error uploading: " + err.message);
    } finally {
      setUploading(false);
    }
  };

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

              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => handleUploadMaterial(course.name, course._id)}
                  className="bg-[#800000] hover:bg-[#a00000] text-white text-sm rounded-md shadow-md transition duration-200"
                  style={{ width: "140px", height: "36px" }}
                >
                  Upload Materials
                </button>

                <button
                  onClick={() =>
                    handleUploadAssignment(course.name, course._id)
                  }
                  className="bg-[#800000] hover:bg-[#a00000] text-white text-sm rounded-md shadow-md transition duration-200"
                  style={{ width: "140px", height: "36px" }}
                >
                  Upload Assignments
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 hover:scale-[1.01]">
            <h2 className="text-xl font-bold text-[#800000] mb-6 border-b pb-2">
              📤 Upload{" "}
              {uploadType === "assignment" ? "Assignment" : "Material"}
              <span className="block text-sm text-gray-500 mt-1">
                Course: {uploadCourse}
              </span>
            </h2>

            <form onSubmit={handleFileUpload} className="space-y-5">
              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <input
                  type="text"
                  value={uploadTopic}
                  onChange={(e) => setUploadTopic(e.target.value)}
                  required
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#800000] focus:outline-none"
                />
              </div>

              {/* Due Date (assignments only) */}
              {uploadType === "assignment" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="datetime-local"
                    value={uploadDueDate}
                    onChange={(e) => setUploadDueDate(e.target.value)}
                    required
                    className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#800000] focus:outline-none"
                  />
                </div>
              )}

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select File
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="w-full mt-1 border border-gray-200 p-2 rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#800000] file:text-white hover:file:bg-[#a00000]"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-[#800000] text-white rounded-lg shadow hover:bg-[#a00000] transition"
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

// import React, { useEffect, useState } from "react";
// import { apiFetch } from "../../services/api";
// import { useNavigate } from "react-router-dom";

// const TeacherCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [uploadCourse, setUploadCourse] = useState("");
//   const [uploadFile, setUploadFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadType, setUploadType] = useState("lecture");
//   const [uploadTopic, setUploadTopic] = useState("");
//   const [uploadDueDate, setUploadDueDate] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await apiFetch("/api/teacher/courses");
//       setCourses(res.courses);
//     } catch (err) {
//       alert("Error loading courses: " + err.message);
//     }
//   };

//   const handleUploadMaterial = (courseName, courseId) => {
//     localStorage.setItem("selectedCourseId", courseId);
//     setUploadCourse(courseName);
//     setUploadType("lecture");
//     setUploadTopic("");
//     setUploadDueDate("");
//     setShowModal(true);
//   };

//   const handleUploadAssignment = (courseName, courseId) => {
//     localStorage.setItem("selectedCourseId", courseId);
//     setUploadCourse(courseName);
//     setUploadType("assignment");
//     setUploadTopic("");
//     setUploadDueDate("");
//     setShowModal(true);
//   };

//   const toggleExpand = (courseId) => {
//     setExpanded((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!uploadCourse || !uploadFile || !uploadTopic) {
//       return alert("Please fill all required fields.");
//     }

//     const formData = new FormData();
//     formData.append("course", uploadCourse);
//     formData.append("file", uploadFile);
//     formData.append("type", uploadType);
//     formData.append("topic", uploadTopic);
//     if (uploadType === "assignment") {
//       formData.append("dueDate", uploadDueDate);
//     }

//     const endpoint =
//       uploadType === "assignment"
//         ? "http://localhost:5000/api/teacher/assignments/upload"
//         : "http://localhost:5000/api/teacher/materials/upload";

//     try {
//       setUploading(true);
//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });
//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`Upload failed. Server said: ${errorText}`);
//       }
//       const data = await res.json();

//       if (res.ok && data.success) {
//         alert(`${uploadType === "assignment" ? "Assignment" : "Material"} uploaded successfully.`);
//         setShowModal(false);
//         setUploadCourse("");
//         setUploadFile(null);
//         setUploadTopic("");
//         setUploadDueDate("");
//       } else {
//         alert(data.message || "Upload failed.");
//       }
//     } catch (err) {
//       alert("Error uploading: " + err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleClick = (course) => {
//     navigate(`/teacher/course/${course._id}`, { state: { course } });
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-center text-[#800000] mb-6">
//         My Assigned Courses
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {courses.map((course) => {
//           const isExpanded = expanded[course._id];
//           const description = course.description || "No description provided";
//           const shortDesc = description.slice(0, 100);

//           return (
//             <div
//               key={course._id}
//               className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
//               style={{ minHeight: "420px" }}
//             >
//               <div className="flex-grow">
//                 <img
//                   src={course.image || "https://via.placeholder.com/300x200"}
//                   alt={course.name}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />
//                 <h2 className="text-xl font-semibold text-[#800000] mb-1">
//                   {course.name}
//                 </h2>
//                 <p className="text-sm text-gray-600 mb-2">Instructor: You</p>
//                 <p className="text-gray-700 text-sm mb-2">
//                   {isExpanded ? description : shortDesc}
//                   {description.length > 100 && (
//                     <button
//                       onClick={() => toggleExpand(course._id)}
//                       className="ml-2 text-[#800000] text-xs underline"
//                     >
//                       {isExpanded ? "See less" : "See more"}
//                     </button>
//                   )}
//                 </p>
//               </div>

//               <div className="mt-4 flex justify-center gap-4">
//                 <button
//                   onClick={() => handleUploadMaterial(course.name, course._id)}
//                   className="bg-[#800000] hover:bg-[#a00000] text-white text-sm rounded-md shadow-md transition duration-200"
//                   style={{ width: "140px", height: "36px" }}
//                 >
//                   Upload Materials
//                 </button>

//                 <button
//                   onClick={() => handleUploadAssignment(course.name, course._id)}
//                   className="bg-[#800000] hover:bg-[#a00000] text-white text-sm rounded-md shadow-md transition duration-200"
//                   style={{ width: "140px", height: "36px" }}
//                 >
//                   Upload Assignments
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Upload Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-lg font-bold text-maroon-700 mb-4">
//               Upload {uploadType === "assignment" ? "Assignment" : "Material"} for: {uploadCourse}
//             </h2>
//             <form onSubmit={handleFileUpload} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Topic</label>
//                 <input
//                   type="text"
//                   value={uploadTopic}
//                   onChange={(e) => setUploadTopic(e.target.value)}
//                   required
//                   className="w-full mt-1 border border-gray-300 rounded p-2"
//                 />
//               </div>

//               {uploadType === "assignment" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Due Date</label>
//                   <input
//                     type="date"
//                     value={uploadDueDate}
//                     onChange={(e) => setUploadDueDate(e.target.value)}
//                     required
//                     className="w-full mt-1 border border-gray-300 rounded p-2"
//                   />
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Select File</label>
//                 <input
//                   type="file"
//                   accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
//                   onChange={(e) => setUploadFile(e.target.files[0])}
//                   className="w-full mt-1"
//                   required
//                 />
//               </div>

//               <div className="flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-600 hover:underline"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={uploading}
//                   className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#a00000]"
//                 >
//                   {uploading ? "Uploading..." : "Upload"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherCourses;
