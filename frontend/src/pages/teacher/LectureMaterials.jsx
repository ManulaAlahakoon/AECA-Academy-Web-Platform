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
          const type = mat.type || "lecture";

          if (!grouped[course]) {
            grouped[course] = { lecture: [], assignment: [] };
          }

          grouped[course][type].push({
            id: mat._id,
            title: mat.originalName,
            fileUrl: `http://localhost:5000/LectureMaterials/${mat.course}/${mat.fileName}`,
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
    if (!window.confirm("Are you sure you want to delete this material?")) return;

    try {
      const response = await apiFetch(`/api/teacher/materials/${id}`, {
        method: "DELETE",
      });

      if (response.success) {
        alert("Material deleted successfully.");
        setGroupedMaterials((prev) => {
          const updated = { ...prev };
          for (const course in updated) {
            ["lecture", "assignment"].forEach((type) => {
              updated[course][type] = updated[course][type].filter(
                (m) => m.id !== id
              );
            });
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

  if (loading) return <p>Loading lecture materials...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lecture Materials</h1>

      {Object.entries(groupedMaterials).map(([course, { lecture, assignment }]) => (
        <div key={course} className="mb-10">
          <h2 className="text-xl font-bold border-b pb-1 mb-3">{course}</h2>

          {/* Lecture Materials */}
          <h3 className="text-lg font-semibold mb-2">📘 Lecture Materials</h3>
          {lecture.length === 0 ? (
            <p className="text-gray-500 mb-4">No lecture materials uploaded.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {lecture.map((material) => (
                <li
                  key={material.id}
                  className="bg-white p-3 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <strong>{material.title}</strong>
                    <br />
                    <a
                      href={material.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
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
          <h3 className="text-lg font-semibold mb-2">📝 Assignments</h3>
          {assignment.length === 0 ? (
            <p className="text-gray-500">No assignments uploaded.</p>
          ) : (
            <ul className="space-y-2">
              {assignment.map((material) => (
                <li
                  key={material.id}
                  className="bg-white p-3 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <strong>{material.title}</strong>
                    <br />
                    <a
                      href={material.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
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
  );
};

export default LectureMaterials;
