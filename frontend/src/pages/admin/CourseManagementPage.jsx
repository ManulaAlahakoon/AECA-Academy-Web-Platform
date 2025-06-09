import React, { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";
import { FaChalkboardTeacher } from "react-icons/fa"; // University-themed icon

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    assignedTeacher: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  // Fetch courses and teachers on component mount
  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await apiFetch("/api/courses");
      setCourses(res.courses);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await apiFetch("/api/user?role=teacher");
      setTeachers(res);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await apiFetch(`/api/courses/${editCourseId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        alert("Course updated successfully!");
      } else {
        await apiFetch("/api/courses/create-course", {
          method: "POST",
          body: JSON.stringify(form),
        });
        alert("Course added successfully!");
      }

      setForm({
        name: "",
        description: "",
        image: "",
        assignedTeacher: "",
      });
      setIsEditing(false);
      setEditCourseId(null);
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      await apiFetch(`/api/courses/${id}/toggle`, {
        method: "PATCH",
      });
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (course) => {
    setForm({
      name: course.name,
      description: course.description,
      image: course.image,
      assignedTeacher: course.assignedTeacher?._id || "",
    });
    setEditCourseId(course._id);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header with illustration */}
      <div className="flex flex-col items-center mb-6">
        <FaChalkboardTeacher className="text-5xl text-[#800000] mb-2" />
        <h1 className="text-3xl font-bold text-[#800000] text-center">
          Course Management
        </h1>
        <p className="text-gray-600 text-center max-w-xl">
          Manage your courses and assign them to teachers. Toggle their status
          and keep everything up to date with ease.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Course" : "Add Course"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow mb-8"
        >
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Course Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Assigned Teacher</label>
            <select
              name="assignedTeacher"
              value={form.assignedTeacher}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded font-semibold"
          >
            {isEditing ? "Save Changes" : "Add Course"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditCourseId(null);
                setForm({
                  name: "",
                  description: "",
                  image: "",
                  assignedTeacher: "",
                });
              }}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded font-semibold mt-2"
            >
              Cancel
            </button>
          )}
        </form>

        <h2 className="text-2xl font-bold mb-4">Courses List</h2>
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-[#800000] text-white">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Teacher</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="border p-2 break-words">{course.name}</td>
                <td className="border p-2">
                  {course.assignedTeacher ? course.assignedTeacher.name : "N/A"}
                </td>
                <td className="border p-2">
                  {course.isEnabled ? "Enabled" : "Disabled"}
                </td>
                <td className="border p-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggle(course._id)}
                      className="w-24 bg-[#800000] hover:bg-[#660000] text-white px-3 py-1 rounded font-semibold"
                    >
                      {course.isEnabled ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => handleEdit(course)}
                      className="w-24 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManagementPage;
