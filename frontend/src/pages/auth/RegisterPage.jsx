// src/pages/Auth/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RegisterImage from "../../assets/register.png";

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
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-white pt-58 px-4 md:px-8">
        {/* Left Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center mb-8 md:mb-0 md:justify-end md:pr-6">
          <img
            src={RegisterImage}
            alt="Register"
            className="max-w-[350px] w-full h-auto object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full flex items-center justify-center md:justify-start">
          <div className="w-full max-w-sm px-2">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#800000]">
              Register
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                type="text"
                onChange={handleChange}
                value={form.name}
                placeholder="Name"
                className="w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:border-b-2 focus:border-[#800000] placeholder-gray-500"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm -mt-4">{errors.name}</p>
              )}

              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Email"
                className="w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:border-b-2 focus:border-[#800000] placeholder-gray-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm -mt-4">{errors.email}</p>
              )}

              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Password"
                className="w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:border-b-2 focus:border-[#800000] placeholder-gray-500"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm -mt-4">{errors.password}</p>
              )}

              <select
                name="role"
                onChange={handleChange}
                value={form.role}
                className="w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:border-b-2 focus:border-[#800000]"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded text-lg font-semibold transition duration-300"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
