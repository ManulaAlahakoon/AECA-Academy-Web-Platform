import { useState } from "react";
import { apiFetch } from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await apiFetch("/api/user/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage("Check your mails.");
    } catch (err) {
      setError("Failed to send reset instructions.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 px-4 md:px-8 bg-white">
        <div className="w-full max-w-sm mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#800000]">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:border-b-2 focus:border-[#800000] placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded text-lg font-semibold transition duration-300"
            >
              Send Reset Link
            </button>
          </form>
          {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
