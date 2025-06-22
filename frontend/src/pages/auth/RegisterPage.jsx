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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};

    if (!form.name.trim() || form.name.trim().length < 3) {
      errs.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      errs.email = "Invalid email address";
    }

    // Password validation: min 6 chars, uppercase, special symbol
    if (!form.password) {
      errs.password = "Password is required";
    } else {
      if (form.password.length < 6) {
        errs.password = "Password must be at least 6 characters";
      } else if (!/[A-Z]/.test(form.password)) {
        errs.password = "Password must contain at least one uppercase letter";
      } else if (!/[^A-Za-z0-9]/.test(form.password)) {
        errs.password = "Password must contain at least one special character";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input
              name="name"
              onChange={handleChange}
              value={form.name}
              placeholder="Name"
              className={`w-full p-3 border rounded focus:outline-none focus:border-[#660000] ${
                errors.name ? "border-red-500" : "border-[#800000]"
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={form.email}
              placeholder="Email"
              className={`w-full p-3 border rounded focus:outline-none focus:border-[#660000] ${
                errors.email ? "border-red-500" : "border-[#800000]"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
              placeholder="Password"
              className={`w-full p-3 border rounded focus:outline-none focus:border-[#660000] ${
                errors.password ? "border-red-500" : "border-[#800000]"
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

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
