// src/pages/Admin/TeacherRegistrationPage.jsx
import { useState } from "react";
import { apiFetch } from "../../services/api";
import { FaUserPlus } from "react-icons/fa";

const TeacherRegistrationPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/api/admin/teacher-registration", {
        method: "POST",
        body: JSON.stringify(form),
      });
      alert("Teacher registered successfully. Credentials sent via email.");
      setForm({ name: "", email: "" });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Illustration / Sidebar */}
        <div className="bg-[#800000] text-white flex flex-col items-center justify-center p-8 md:w-1/2">
          <FaUserPlus className="text-6xl mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-center">
            Add a New Teacher
          </h2>
          <p className="text-center">
            Use the form on the right to add a teacher and send credentials.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-[#800000] mb-4">
            Teacher Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded font-semibold"
            >
              Register Teacher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistrationPage;
