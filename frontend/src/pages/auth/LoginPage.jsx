import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../services/api";
import LoginImage from "../../assets/login.png";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RECAPTCHA_SITE_KEY = "6LcUXGorAAAAAHUQob5OIWHsgTfBXpHu2-ZlpvvM";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const data = await apiFetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      login({
        email: form.email,
        token: data.token,
        role: data.role,
        name: data.name,
      });

      navigate(`/${data.role}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      {/* Very large padding-top to fully clear navbar */}
      <div className="flex flex-col md:flex-row min-h-screen bg-white pt-56 px-4 md:px-8">
        {/* Left Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center mb-8 md:mb-0 md:justify-end md:pr-6">
          <img
            src={LoginImage}
            alt="Login"
            className="max-w-[350px] w-full h-auto object-contain"
          />
        </div>

        {/* Right Login Form */}
        <div className="md:w-1/2 w-full flex items-center justify-center md:justify-start">
          <div className="w-full max-w-sm px-2">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#800000]">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Email"
                className="w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:border-b-2 focus:border-[#800000] placeholder-gray-500"
                required
              />
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Password"
                className="w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:border-b-2 focus:border-[#800000] placeholder-gray-500"
                required
              />

              {/* Centered "Forgot Password?" */}
              <div className="text-center mt-1">
                <button
                  type="button"
                  className="text-sm text-[#800000] hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center">
                <div className="w-full max-w-[304px]">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(token) => setRecaptchaToken(token)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded text-lg font-semibold transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;

