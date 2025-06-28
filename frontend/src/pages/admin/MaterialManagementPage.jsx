// src/pages/admin/MaterialManagementPage.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

const MaterialManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchMaterials(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    const res = await apiFetch("/api/courses");
    setCourses(res.courses);
  };

  const fetchMaterials = async (courseName) => {
    const res = await apiFetch(`/api/admin/materials/${courseName}`);
    setMaterials(res.materials);
  };

  const handleToggle = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to toggle visibility?"
    );
    if (!confirm) return;
    try {
      await apiFetch(`/api/admin/materials/${id}/toggle`, {
        method: "PATCH",
      });
      fetchMaterials(selectedCourse);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#800000]">
        Manage Materials
      </h1>

      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="p-2 border mb-4"
      >
        <option value="">Select a course</option>
        {courses.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Uploaded By</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat._id}>
              <td className="border p-2">{mat.originalName}</td>
              <td className="border p-2">{mat.type}</td>
              <td className="border p-2">
                {mat.uploadedBy?.name || "Unknown"}
              </td>
              <td className="border p-2">
                {mat.isEnabled ? "Enabled" : "Disabled"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleToggle(mat._id)}
                  className={`px-3 py-1 rounded text-white ${
                    mat.isEnabled ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {mat.isEnabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialManagementPage;
