import React, { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";

const StudentProfile = () => {
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await apiFetch("/api/profile");
        setName(user.name);
      } catch (err) {
        setMessage("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { name };
      if (currentPassword && newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }

      const res = await apiFetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });

      setMessage(res.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.message || "Update failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#800000]">My Profile</h2>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button
          type="submit"
          className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
