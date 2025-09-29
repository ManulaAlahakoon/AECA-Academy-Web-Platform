import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";
import SubmissionCard from "./SubmissionCard"; // make sure path is correct

const StudentCourseDetail = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await apiFetch(
          `/api/student/materials/course/${name}`
        );
        setMaterials(response.materials || []);
      } catch (err) {
        console.error("Fetch failed", err);
        alert("Failed to fetch materials");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [name]);

  const lectureMaterials = materials.filter((mat) => mat.type === "lecture");
  const assignmentMaterials = materials.filter(
    (mat) => mat.type === "assignment"
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#800000]">
          {name} - Course Details
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow transition"
        >
          Back
        </button>
      </div>

      {loading ? (
        <p>Loading materials...</p>
      ) : (
        <>
          {/* Lecture Materials Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#800000] flex items-center gap-2">
              📘 Lecture Materials
            </h2>

            {lectureMaterials.length === 0 ? (
              <p>No lecture materials available.</p>
            ) : (
              <div className="space-y-3">
                {lectureMaterials.map((mat, index) => (
                  <div
                    key={mat._id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-800">
                      Lecture {index + 1}: {mat.topic}
                    </span>
                    <a
                      href={`http://localhost:5000/lecturematerials/${mat.course}/${mat.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition"
                    >
                      View File
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Assignment Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#800000] flex items-center gap-2">
              📝 Assignments
            </h2>

            {assignmentMaterials.length === 0 ? (
              <p>No assignments available.</p>
            ) : (
              <div className="space-y-6">
                {assignmentMaterials.map((assignment) => (
                  <SubmissionCard
                    key={assignment._id}
                    assignment={assignment}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default StudentCourseDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { apiFetch } from "../../services/api";
// import SubmissionCard from "./SubmissionCard"; // make sure path is correct

// const StudentCourseDetail = () => {
//   const { id, name } = useParams();
//   const navigate = useNavigate();
//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const response = await apiFetch(`/api/student/materials/course/${name}`);
//         setMaterials(response.materials || []);
//       } catch (err) {
//         console.error("Fetch failed", err);
//         alert("Failed to fetch materials");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMaterials();
//   }, [name]);

//   const lectureMaterials = materials.filter((mat) => mat.type === "lecture");
//   const assignmentMaterials = materials.filter((mat) => mat.type === "assignment");

//   return (
//     <div className="p-6 bg-white min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-[#800000]">{name} - Course Details</h1>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-600 text-white px-4 py-2 rounded"
//         >
//           Back
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading materials...</p>
//       ) : (
//         <>
//           <section className="mb-10">
//             <h2 className="text-2xl font-semibold mb-4">📘 Lecture Materials</h2>
//             {lectureMaterials.length === 0 ? (
//               <p>No lecture materials available.</p>
//             ) : (
//               <div className="space-y-4">
//                 {lectureMaterials.map((mat) => (
//                   <div key={mat._id} className="p-4 border rounded bg-gray-50">
//                     <p className="font-medium text-lg text-[#800000]">{mat.topic}</p>
//                     <a
//                       href={`http://localhost:5000/lecturematerials/${mat.course}/${mat.fileName}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       {mat.originalName}
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>

//           <section>
//             <h2 className="text-2xl font-semibold mb-4">📝 Assignments</h2>
//             {assignmentMaterials.length === 0 ? (
//               <p>No assignments available.</p>
//             ) : (
//               <div className="space-y-6">
//                 {assignmentMaterials.map((assignment) => (
//                   <SubmissionCard key={assignment._id} assignment={assignment} />
//                 ))}
//               </div>
//             )}
//           </section>
//         </>
//       )}
//     </div>
//   );
// };

// export default StudentCourseDetail;
