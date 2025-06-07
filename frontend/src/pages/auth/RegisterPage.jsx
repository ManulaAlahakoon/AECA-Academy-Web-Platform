// src/pages/Auth/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      alert("Registered successfully.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#800000]">
          Register New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            onChange={handleChange}
            value={form.name}
            placeholder="Name"
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
            required
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={form.email}
            placeholder="Email"
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
            required
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
            required
          />
          <select
            name="role"
            onChange={handleChange}
            value={form.role}
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
