// src/pages/admin/MaterialManagementPage.jsx
// import React, { useEffect, useState } from "react";
// import { apiFetch } from "../../services/api";

// const MaterialManagementPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [materials, setMaterials] = useState([]);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (selectedCourse) {
//       fetchMaterials(selectedCourse);
//     }
//   }, [selectedCourse]);

//   const fetchCourses = async () => {
//     const res = await apiFetch("/api/courses");
//     setCourses(res.courses);
//   };

//   const fetchMaterials = async (courseName) => {
//     const res = await apiFetch(`/api/admin/materials/${courseName}`);
//     setMaterials(res.materials);
//   };

//   const handleToggle = async (id) => {
//     const confirm = window.confirm(
//       "Are you sure you want to toggle visibility?"
//     );
//     if (!confirm) return;
//     try {
//       await apiFetch(`/api/admin/materials/${id}/toggle`, {
//         method: "PATCH",
//       });
//       fetchMaterials(selectedCourse);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-[#800000]">
//         Manage Materials
//       </h1>

//       <select
//         value={selectedCourse}
//         onChange={(e) => setSelectedCourse(e.target.value)}
//         className="p-2 border mb-4"
//       >
//         <option value="">Select a course</option>
//         {courses.map((c) => (
//           <option key={c._id} value={c.name}>
//             {c.name}
//           </option>
//         ))}
//       </select>

//       <table className="min-w-full bg-white border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Type</th>
//             <th className="border p-2">Uploaded By</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {materials.map((mat) => (
//             <tr key={mat._id}>
//               <td className="border p-2">
//                 <a
//                   // href={`${import.meta.env.VITE_API_BASE_URL}/${mat.filePath}`}
//                   href={`${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/${mat.filePath.replace(/^\//, "")}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-700 underline"
//                 >
//                   {mat.originalName}
//                 </a>
//               </td>
//               <td className="border p-2">{mat.type}</td>
//               <td className="border p-2">
//                 {mat.uploadedBy?.name || "Unknown"}
//               </td>
//               <td className="border p-2">
//                 {mat.isEnabled ? "Enabled" : "Disabled"}
//               </td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleToggle(mat._id)}
//                   className={`px-3 py-1 rounded text-white ${
//                     mat.isEnabled ? "bg-red-600" : "bg-green-600"
//                   }`}
//                 >
//                   {mat.isEnabled ? "Disable" : "Enable"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MaterialManagementPage;
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

const MaterialManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchMaterials(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const res = await apiFetch("/api/courses");
      setCourses(res.courses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      alert("Failed to load courses.");
    }
  };

  const fetchMaterials = async (courseName) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/materials/${courseName}`);
      setMaterials(res.materials || []);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
      alert("Failed to load materials.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to toggle this material's visibility?"
    );
    if (!confirm) return;
    try {
      await apiFetch(`/api/admin/materials/${id}/toggle`, { method: "PATCH" });
      fetchMaterials(selectedCourse);
    } catch (err) {
      console.error("Toggle failed:", err);
      alert(err.message);
    }
  };

  // Split into lectures and assignments like student view
  const lectureMaterials = materials.filter((m) => m.type === "lecture");
  const assignmentMaterials = materials.filter((m) => m.type === "assignment");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#800000] mb-6 text-center">
        Manage Course Materials
      </h1>

      <div className="mb-6 max-w-md mx-auto">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-3 border rounded"
        >
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading materials...</p>
      ) : (
        selectedCourse && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2 text-[#800000]">
                Lecture Materials
              </h2>
              {lectureMaterials.length === 0 ? (
                <p className="text-gray-600">No lecture materials uploaded.</p>
              ) : (
                <ul className="space-y-3">
                  {lectureMaterials.map((mat) => (
                    <li key={mat._id} className="bg-white p-4 rounded shadow">
                      <div className="flex justify-between items-center">
                        <div>
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}${
                              mat.type === "assignment"
                                ? `/assignments/${mat.course}/${mat.fileName}`
                                : `/LectureMaterials/${mat.course}/${mat.fileName}`
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 underline font-medium"
                          >
                            {mat.originalName}
                          </a>

                          <div className="text-sm text-gray-600">
                            Uploaded by: {mat.uploadedBy?.name || "Unknown"}
                          </div>
                          <div className="text-sm">
                            Status:{" "}
                            <span
                              className={
                                mat.isEnabled
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {mat.isEnabled ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggle(mat._id)}
                          className={`px-3 py-1 rounded text-white ${
                            mat.isEnabled
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {mat.isEnabled ? "Disable" : "Enable"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-[#800000]">
                Assignments
              </h2>
              {assignmentMaterials.length === 0 ? (
                <p className="text-gray-600">No assignments uploaded.</p>
              ) : (
                <ul className="space-y-3">
                  {assignmentMaterials.map((mat) => (
                    <li key={mat._id} className="bg-white p-4 rounded shadow">
                      <div className="flex justify-between items-center">
                        <div>
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/${mat.filePath.replace(/^\//, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 underline font-medium"
                          >
                            {mat.originalName}
                          </a>
                          <div className="text-sm text-gray-600">
                            Uploaded by: {mat.uploadedBy?.name || "Unknown"}
                          </div>
                          <div className="text-sm">
                            Status:{" "}
                            <span
                              className={
                                mat.isEnabled
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {mat.isEnabled ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggle(mat._id)}
                          className={`px-3 py-1 rounded text-white ${
                            mat.isEnabled
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {mat.isEnabled ? "Disable" : "Enable"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default MaterialManagementPage;
