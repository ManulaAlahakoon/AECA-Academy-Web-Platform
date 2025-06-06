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
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        value={form.name}
        required
      />
      <input
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="Email"
        value={form.email}
        required
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        value={form.password}
        required
      />
      <select name="role" onChange={handleChange} value={form.role}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
