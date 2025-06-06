// src/pages/Auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../services/api";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      login({ email: form.email, token: data.token, role: data.role });
      navigate(`/${data.role}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
