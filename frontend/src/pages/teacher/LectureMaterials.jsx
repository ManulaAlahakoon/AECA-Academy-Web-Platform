import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

const LectureMaterials = () => {
  const [groupedMaterials, setGroupedMaterials] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMaterials = async () => {
      try {
        const response = await apiFetch("/api/teacher/materials-by-teacher");
        const materials = response.materials ?? [];

        const grouped = {};

        materials.forEach((mat) => {
          const course = mat.course || "Unknown Course";
          const topic = mat.topic || "General";
          const type = mat.type || "lecture";

          if (!grouped[course]) grouped[course] = {};
          if (!grouped[course][topic])
            grouped[course][topic] = { lecture: [], assignment: [] };

          grouped[course][topic][type].push({
            id: mat._id,
            title: mat.originalName,
            fileUrl:
              mat.type === "assignment"
                ? `http://localhost:5000/assignments/${mat.course}/${mat.fileName}`
                : `http://localhost:5000/lecturematerials/${mat.course}/${mat.fileName}`,
            dueDate: mat.dueDate
              ? new Date(mat.dueDate).toLocaleDateString()
              : null,
          });
        });

        setGroupedMaterials(grouped);
      } catch (err) {
        alert("Failed to fetch materials: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMaterials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?"))
      return;

    try {
      const response = await apiFetch(`/api/teacher/materials/${id}`, {
        method: "DELETE",
      });

      if (response.success) {
        alert("Material deleted successfully.");
        setGroupedMaterials((prev) => {
          const updated = { ...prev };
          for (const course in updated) {
            for (const topic in updated[course]) {
              ["lecture", "assignment"].forEach((type) => {
                updated[course][topic][type] = updated[course][topic][
                  type
                ].filter((m) => m.id !== id);
              });
            }
          }
          return updated;
        });
      } else {
        alert(response.message || "Failed to delete material.");
      }
    } catch (err) {
      alert("Error deleting material: " + err.message);
    }
  };

  if (loading)
    return (
      <p className="p-6 text-center text-lg">Loading lecture materials...</p>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#800000] text-center mb-8">
        Lecture Materials
      </h1>

      {Object.entries(groupedMaterials).map(([course, topics]) => (
        <div key={course} className="mb-10">
          <h2 className="text-2xl font-bold text-[#4B5563] mb-6 border-b pb-2">
            📚 {course}
          </h2>

          {Object.entries(topics).map(([topic, types]) => (
            <div key={topic} className="mb-6">
              <h3 className="text-xl font-semibold text-[#374151] mb-4">
                🔖 Topic: {topic}
              </h3>

              {/* Lecture Materials */}
              <h4 className="text-lg font-semibold text-[#6B7280] mb-2">
                📘 Lecture Materials
              </h4>
              {types.lecture.length === 0 ? (
                <p className="text-gray-500 mb-4">
                  No lecture materials uploaded.
                </p>
              ) : (
                <ul className="space-y-4 mb-4">
                  {types.lecture.map((material) => (
                    <li
                      key={material.id}
                      className="p-4 border border-gray-200 rounded-2xl bg-white shadow-md flex justify-between items-center hover:shadow-lg transition"
                    >
                      <div>
                        <strong className="text-gray-800 text-sm md:text-base">
                          {material.title}
                        </strong>
                        <br />
                        <a
                          href={material.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full shadow hover:bg-blue-200 transition"
                        >
                          View File
                        </a>
                      </div>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="text-red-600 hover:underline ml-4 text-sm"
                      >
                        🗑 Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Assignments */}
              <h4 className="text-lg font-semibold text-[#6B7280] mb-2">
                📝 Assignments
              </h4>
              {types.assignment.length === 0 ? (
                <p className="text-gray-500">No assignments uploaded.</p>
              ) : (
                <ul className="space-y-4">
                  {types.assignment.map((material) => (
                    <li
                      key={material.id}
                      className="p-4 border border-gray-200 rounded-2xl bg-white shadow-md flex justify-between items-center hover:shadow-lg transition"
                    >
                      <div>
                        <strong className="text-gray-800 text-sm md:text-base">
                          {material.title}
                        </strong>
                        <br />
                        <span className="text-sm text-gray-500">
                          Due: {material.dueDate}
                        </span>
                        <br />
                        <a
                          href={material.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full shadow hover:bg-blue-200 transition"
                        >
                          View File
                        </a>
                      </div>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="text-red-600 hover:underline ml-4 text-sm"
                      >
                        🗑 Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LectureMaterials;

// import React, { useEffect, useState } from "react";
// import { apiFetch } from "../../services/api";

// const LectureMaterials = () => {
//   const [groupedMaterials, setGroupedMaterials] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllMaterials = async () => {
//       try {
//         const response = await apiFetch("/api/teacher/materials-by-teacher");
//         const materials = response.materials ?? [];

//         const grouped = {};

//         materials.forEach((mat) => {
//           const course = mat.course || "Unknown Course";
//           const topic = mat.topic || "General";
//           const type = mat.type || "lecture";

//           if (!grouped[course]) grouped[course] = {};
//           if (!grouped[course][topic]) grouped[course][topic] = { lecture: [], assignment: [] };

//           grouped[course][topic][type].push({
//             id: mat._id,
//             title: mat.originalName,
//             fileUrl: mat.type === "assignment"
//           ? `http://localhost:5000/assignments/${mat.course}/${mat.fileName}`
//           : `http://localhost:5000/lecturematerials/${mat.course}/${mat.fileName}`,

//             dueDate: mat.dueDate ? new Date(mat.dueDate).toLocaleDateString() : null,
//           });
//         });

//         setGroupedMaterials(grouped);
//       } catch (err) {
//         alert("Failed to fetch materials: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllMaterials();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this material?")) return;

//     try {
//       const response = await apiFetch(`/api/teacher/materials/${id}`, {
//         method: "DELETE",
//       });

//       if (response.success) {
//         alert("Material deleted successfully.");
//         setGroupedMaterials((prev) => {
//           const updated = { ...prev };
//           for (const course in updated) {
//             for (const topic in updated[course]) {
//               ["lecture", "assignment"].forEach((type) => {
//                 updated[course][topic][type] = updated[course][topic][type].filter(
//                   (m) => m.id !== id
//                 );
//               });
//             }
//           }
//           return updated;
//         });
//       } else {
//         alert(response.message || "Failed to delete material.");
//       }
//     } catch (err) {
//       alert("Error deleting material: " + err.message);
//     }
//   };

//   if (loading) return <p className="p-6 text-center text-lg">Loading lecture materials...</p>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-[#800000] text-center mb-8">Lecture Materials</h1>

//       {Object.entries(groupedMaterials).map(([course, topics]) => (
//         <div key={course} className="mb-10">
//           <h2 className="text-2xl font-bold text-[#4B5563] mb-6 border-b pb-2">📚 {course}</h2>

//           {Object.entries(topics).map(([topic, types]) => (
//             <div key={topic} className="mb-6">
//               <h3 className="text-xl font-semibold text-[#374151] mb-4">🔖 Topic: {topic}</h3>

//               {/* Lecture Materials */}
//               <h4 className="text-lg font-semibold text-[#6B7280] mb-2">📘 Lecture Materials</h4>
//               {types.lecture.length === 0 ? (
//                 <p className="text-gray-500 mb-4">No lecture materials uploaded.</p>
//               ) : (
//                 <ul className="space-y-2 mb-4">
//                   {types.lecture.map((material) => (
//                     <li
//                       key={material.id}
//                       className="bg-white p-4 rounded shadow flex justify-between items-center hover:shadow-md transition"
//                     >
//                       <div>
//                         <strong>{material.title}</strong>
//                         <br />
//                         <a
//                           href={material.fileUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline"
//                         >
//                           View File
//                         </a>
//                       </div>
//                       <button
//                         onClick={() => handleDelete(material.id)}
//                         className="text-red-600 hover:underline ml-4 text-sm"
//                       >
//                         🗑 Delete
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               {/* Assignments */}
//               <h4 className="text-lg font-semibold text-[#6B7280] mb-2">📝 Assignments</h4>
//               {types.assignment.length === 0 ? (
//                 <p className="text-gray-500">No assignments uploaded.</p>
//               ) : (
//                 <ul className="space-y-2">
//                   {types.assignment.map((material) => (
//                     <li
//                       key={material.id}
//                       className="bg-white p-4 rounded shadow flex justify-between items-center hover:shadow-md transition"
//                     >
//                       <div>
//                         <strong>{material.title}</strong>
//                         <br />
//                         <span className="text-sm text-gray-500">Due: {material.dueDate}</span>
//                         <br />
//                         <a
//                           href={material.fileUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline"
//                         >
//                           View File
//                         </a>
//                       </div>
//                       <button
//                         onClick={() => handleDelete(material.id)}
//                         className="text-red-600 hover:underline ml-4 text-sm"
//                       >
//                         🗑 Delete
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LectureMaterials;
