import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../../services/api";

const StudentMaterials = () => {
  const { courseName } = useParams(); // ✅ Make sure the route passes courseName param
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await apiFetch(
          `/api/student/materials/course/${courseName}`
        );
        console.log("Fetched materials:", response);

        setMaterials(response.materials || []);
      } catch (err) {
        console.error("Fetch failed", err);
        alert("Failed to fetch materials");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [courseName]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Materials</h1>
      {materials.length === 0 ? (
        <p>No materials available for this course.</p>
      ) : (
        <ul className="space-y-4">
          {materials.map((mat, index) => (
            <li
              key={`${mat._id}-${index}`}
              className="bg-white shadow p-4 rounded"
            >
              <strong>{mat.originalName}</strong>
              <br />
              <a
                href={`http://localhost:5000/LectureMaterials/${mat.course}/${mat.fileName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentMaterials;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { apiFetch } from "../../services/api";

// const StudentMaterials = () => {
//   const { courseName } = useParams(); // ✅ Make sure the route passes courseName param
//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMaterials = async () => {
//       console.log("Course name from URL:", courseName);

//       try {
//         const response = await apiFetch(`/api/student/materials/course/${courseName}`); // ✅ updated route matches backend
//         console.log("Fetched materials:", response);
//         setMaterials(response.materials || []);
//       } catch (err) {
//         console.error("Fetch failed", err);
//         alert("Failed to fetch materials");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMaterials(); // ✅ avoid triggering with undefined param
//   }, [courseName]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Course Materials</h1>
//       {materials.length === 0 ? (
//         <p>No materials available for this course.</p>
//       ) : (
//         <ul className="space-y-4">
//           {materials.map((mat,index) => (
//             <li key={`${mat._id}-${index}`} className="bg-white shadow p-4 rounded">
//     <strong>{mat.originalName}</strong>
//     <br />
//     <a
//       href={`http://localhost:5000/LectureMaterials/${mat.course}/${mat.fileName}`}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//                 View File
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default StudentMaterials;
