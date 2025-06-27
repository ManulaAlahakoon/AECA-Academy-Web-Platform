// src/pages/Auth/RegisterPage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiFetch } from "../../services/api";

// src/pages/Auth/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    dateOfBirth: "",
    phone: "",
    address: "",
    country: "",
    occupation: "",
    bio: "",
    profilePicture: null,
  });
  const [showMore, setShowMore] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      const file = e.target.files[0];
      setForm({ ...form, profilePicture: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      await apiFetch("/api/user/register", {
        method: "POST",
        body: formData,
      });
      alert("Registered successfully.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
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

          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={form.confirmPassword}
            placeholder="Confirm Password"
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
            required
          />
          {/* <select
            name="role"
            onChange={handleChange}
            value={form.role}
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select> */}

          <input
            name="phone"
            type="tel"
            pattern="[0-9]{10,15}" // adjust range as needed
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
            required
          />

          <input
            name="address"
            onChange={handleChange}
            value={form.address}
            placeholder="Address"
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
          />
          <input
            name="country"
            onChange={handleChange}
            value={form.country}
            placeholder="Country"
            className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
          />

          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="text-[#800000] font-semibold hover:underline"
            >
              {showMore ? "Hide Additional Details" : "Add More Details"}
            </button>
          </div>

          {showMore && (
            <>
              <input
                name="dateOfBirth"
                type="date"
                onChange={handleChange}
                value={form.dateOfBirth}
                placeholder="Date of Birth"
                className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
              />
              <input
                name="occupation"
                onChange={handleChange}
                value={form.occupation}
                placeholder="Occupation"
                className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
              />
              <textarea
                name="bio"
                onChange={handleChange}
                value={form.bio}
                placeholder="Short Bio"
                className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
              />
              <div>
                <label className="block text-[#800000] font-semibold">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="mt-3 w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#800000]"
                  />
                )}
              </div>
            </>
          )}
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

// const RegisterPage = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await apiFetch("/api/user/register", {
//         method: "POST",
//         body: JSON.stringify(form),
//       });
//       alert("Registered successfully.");
//       navigate("/login");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-[#800000]">
//           Register New User
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="name"
//             onChange={handleChange}
//             value={form.name}
//             placeholder="Name"
//             className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
//             required
//           />
//           <input
//             name="email"
//             type="email"
//             onChange={handleChange}
//             value={form.email}
//             placeholder="Email"
//             className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             onChange={handleChange}
//             value={form.password}
//             placeholder="Password"
//             className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
//             required
//           />
//           <select
//             name="role"
//             onChange={handleChange}
//             value={form.role}
//             className="w-full p-3 border border-[#800000] rounded focus:outline-none focus:border-[#660000]"
//           >
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//             <option value="admin">Admin</option>
//           </select>
//           <button
//             type="submit"
//             className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded font-semibold"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
