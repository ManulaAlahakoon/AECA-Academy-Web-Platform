// src/pages/Admin/TeacherRegistrationPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

const TeacherRegistrationPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

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
      setForm({ name: "", email: "" }); // Reset form
      // Optionally navigate back to user management page:
      // navigate("/admin/manage-users");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register New Teacher</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Register Teacher
        </button>
      </form>
    </div>
  );
};

export default TeacherRegistrationPage;
