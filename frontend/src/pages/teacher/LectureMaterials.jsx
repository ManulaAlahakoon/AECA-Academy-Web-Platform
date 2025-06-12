import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LectureMaterials = () => {
  const { courseId } = useParams();

  // Dummy course and modules with materials
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // For uploading new material
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("lecture"); // 'lecture' or 'assignment'
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    // Simulate fetching modules and materials by courseId
    // Replace with real API calls later
    const dummyModules = [
      {
        id: "mod1",
        name: "Module 1: Introduction",
        materials: [
          {
            id: "mat1",
            title: "Lecture 1 - Basics",
            type: "lecture",
            fileUrl: "#",
          },
          {
            id: "mat2",
            title: "Assignment 1 - Basics Practice",
            type: "assignment",
            fileUrl: "#",
          },
        ],
      },
      {
        id: "mod2",
        name: "Module 2: Advanced Topics",
        materials: [
          {
            id: "mat3",
            title: "Lecture 2 - Advanced Concepts",
            type: "lecture",
            fileUrl: "#",
          },
        ],
      },
    ];

    setModules(dummyModules);
    setSelectedModuleId(dummyModules[0]?.id || "");
    setLoading(false);
  }, [courseId]);

  // Handle delete material
  const handleDeleteMaterial = (moduleId, materialId) => {
    if (
      window.confirm("Are you sure you want to delete this material/assignment?")
    ) {
      setModules((prevModules) =>
        prevModules.map((mod) =>
          mod.id === moduleId
            ? {
                ...mod,
                materials: mod.materials.filter((mat) => mat.id !== materialId),
              }
            : mod
        )
      );
    }
  };

  // Handle upload new material (dummy, just add to state)
  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedModuleId || !newTitle || !newFile) {
      alert("Please fill all fields and select a file.");
      return;
    }

    const newMaterial = {
      id: `mat${Date.now()}`, // dummy id
      title: newTitle,
      type: newType,
      fileUrl: URL.createObjectURL(newFile), // preview URL for dummy
    };

    setModules((prevModules) =>
      prevModules.map((mod) =>
        mod.id === selectedModuleId
          ? { ...mod, materials: [...mod.materials, newMaterial] }
          : mod
      )
    );

    // Reset form
    setNewTitle("");
    setNewType("lecture");
    setNewFile(null);
  };

  // Simple edit title inline (optional enhancement)
  const handleEditTitle = (moduleId, materialId, newTitle) => {
    setModules((prevModules) =>
      prevModules.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              materials: mod.materials.map((mat) =>
                mat.id === materialId ? { ...mat, title: newTitle } : mat
              ),
            }
          : mod
      )
    );
  };

  if (loading) return <p>Loading materials...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Lecture Materials & Assignments</h1>
      <h2 className="text-xl mb-4">Course ID: {courseId}</h2>

      {/* List modules and materials */}
      {modules.map((module) => (
        <div key={module.id} className="mb-8">
          <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
            {module.name}
          </h3>

          {module.materials.length === 0 ? (
            <p className="text-gray-500">No materials added yet.</p>
          ) : (
            <ul className="space-y-2">
              {module.materials.map((material) => (
                <li
                  key={material.id}
                  className="flex justify-between items-center bg-white p-3 rounded shadow"
                >
                  <div>
                    <strong>{material.title}</strong>{" "}
                    <span className="italic text-sm text-gray-600">
                      ({material.type})
                    </span>
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

                  <div className="space-x-2">
                    {/* Inline editable title example */}
                    {/* For simplicity, clicking edit will prompt to enter new title */}
                    <button
                      onClick={() => {
                        const newTitle = prompt(
                          "Edit material title:",
                          material.title
                        );
                        if (newTitle) {
                          handleEditTitle(module.id, material.id, newTitle);
                        }
                      }}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteMaterial(module.id, material.id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-4 rounded shadow max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4">Upload New Material/Assignment</h3>

        <label className="block mb-2">
          Select Module:
          <select
            value={selectedModuleId}
            onChange={(e) => setSelectedModuleId(e.target.value)}
            className="block w-full border border-gray-300 rounded px-2 py-1"
          >
            {modules.map((mod) => (
              <option key={mod.id} value={mod.id}>
                {mod.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded px-2 py-1"
          />
        </label>

        <label className="block mb-2">
          Type:
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="block w-full border border-gray-300 rounded px-2 py-1"
          >
            <option value="lecture">Lecture Material</option>
            <option value="assignment">Assignment</option>
          </select>
        </label>

        <label className="block mb-4">
          Upload File:
          <input
            type="file"
            onChange={(e) => setNewFile(e.target.files[0])}
            className="block w-full mt-1"
          />
        </label>

        <button
          type="submit"
          className="bg-[#800000] hover:bg-[#990000] text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default LectureMaterials;
