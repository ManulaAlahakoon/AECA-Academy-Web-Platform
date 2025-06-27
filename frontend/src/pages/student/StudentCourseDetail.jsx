import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

const StudentCourseDetail = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await apiFetch(`/api/student/materials/course/${name}`);
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
  const assignmentMaterials = materials.filter((mat) => mat.type === "assignment");

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#800000]">Course Detail - {name}</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      {loading ? (
        <p>Loading materials...</p>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Lecture Materials</h2>
            {lectureMaterials.length === 0 ? (
              <p>No lecture materials available.</p>
            ) : (
              <ul className="list-disc pl-6 text-blue-700 space-y-2">
                {lectureMaterials.map((mat, index) => (
                  <li key={`${mat._id}-${index}`}>
                    <a
                      href={`http://localhost:5000/LectureMaterials/${mat.course}/${mat.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {mat.originalName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Assignments</h2>
            {assignmentMaterials.length === 0 ? (
              <p>No assignments available.</p>
            ) : (
              <ul className="list-disc pl-6 text-blue-700 space-y-2">
                {assignmentMaterials.map((mat, index) => (
                  <li key={`${mat._id}-${index}`}>
                    <a
                      href={`http://localhost:5000/${mat.type === 'assignment' ? 'assignments' : 'LectureMaterials'}/${mat.course}/${mat.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {mat.originalName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentCourseDetail;
