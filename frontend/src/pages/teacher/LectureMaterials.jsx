// src/pages/teacher/LectureMaterials.jsx
import React, { useState } from "react";

const LectureMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !title) return;

    const newMaterial = {
      id: Date.now(),
      title,
      fileName: file.name,
    };

    setMaterials([newMaterial, ...materials]);
    setTitle("");
    setFile(null);
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-maroon-700 mb-4">Lecture Materials</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g., Week 1 - Introduction to IELTS"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-maroon-700 text-white px-4 py-2 rounded hover:bg-maroon-800 transition"
        >
          Upload
        </button>
      </form>

      {/* List of Materials */}
      <h2 className="text-lg font-medium text-maroon-600 mb-2">Uploaded Materials</h2>
      {materials.length === 0 ? (
        <p className="text-gray-500">No materials uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {materials.map((material) => (
            <li
              key={material.id}
              className="bg-gray-50 border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{material.title}</p>
                <p className="text-sm text-gray-500">{material.fileName}</p>
              </div>
              <button
                onClick={() => handleDelete(material.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LectureMaterials;
