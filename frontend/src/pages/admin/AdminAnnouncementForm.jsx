// src/pages/admin/AdminAnnouncementForm.jsx
import { useState } from "react";
import { apiFetch } from "../../services/api";

const AdminAnnouncementForm = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/api/admin/announcement", {
        method: "POST",
        body: JSON.stringify({ message }),
      });
      setSuccess("Announcement published!");
      setMessage("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-[#800000]">
        Publish Public Announcement
      </h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your announcement..."
          required
          className="w-full p-3 border border-gray-300 rounded mb-4"
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-[#800000] text-white py-2 rounded font-semibold hover:bg-[#660000]"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default AdminAnnouncementForm;
