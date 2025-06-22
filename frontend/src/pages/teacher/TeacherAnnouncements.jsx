// src/pages/teacher/TeacherAnnouncements.jsx
import React, { useState } from "react";

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (!message || !course) return;

    const newAnnouncement = {
      id: Date.now(),
      course,
      message,
      date: new Date(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setMessage("");
    setCourse("");
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  // Sort all posts by date (newest first)
  const sortedPosts = [...announcements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const today = new Date().toDateString();
  const recentPosts = sortedPosts.filter(
    (a) => new Date(a.date).toDateString() === today
  );
  const previousPosts = sortedPosts.filter(
    (a) => new Date(a.date).toDateString() !== today
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-maroon-700 mb-6">
        Post Course Announcements
      </h1>

      {/* Form */}
      <form onSubmit={handlePost} className="space-y-4 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Course
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Choose Course --</option>
            <option value="IELTS">IELTS</option>
            <option value="PTE">PTE</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Announcement
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., Class postponed due to power outage..."
          />
        </div>

        <button
          type="submit"
          className="bg-[#800000] hover:bg-[#990000] text-white font-plain px-4 py-2 rounded shadow transition"
        >Post</button>
      </form>

      {/* Recent Announcements */}
      <h2 className="text-lg font-medium text-maroon-700 mb-3">
        Recent Announcements
      </h2>
      {recentPosts.length === 0 ? (
        <p className="text-gray-500 mb-6">No recent announcements.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {recentPosts.map((ann) => (
            <li
              key={ann.id}
              className="bg-gray-50 border p-4 rounded relative shadow-sm"
            >
              <p className="text-sm text-maroon-800 font-semibold">
                {ann.course} • {new Date(ann.date).toLocaleString()}
              </p>
              <p className="text-gray-700 mt-1">{ann.message}</p>
              <button
                onClick={() => handleDelete(ann.id)}
                className="absolute top-2 right-2 text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Previous Announcements */}
      <h2 className="text-lg font-medium text-maroon-600 mb-3">
        Previous Posts
      </h2>
      {previousPosts.length === 0 ? (
        <p className="text-gray-500">No previous announcements.</p>
      ) : (
        <ul className="space-y-4">
          {previousPosts.map((ann) => (
            <li
              key={ann.id}
              className="bg-gray-100 border p-4 rounded relative shadow-sm"
            >
              <p className="text-sm text-maroon-800 font-semibold">
                {ann.course} • {new Date(ann.date).toLocaleString()}
              </p>
              <p className="text-gray-700 mt-1">{ann.message}</p>
              <button
                onClick={() => handleDelete(ann.id)}
                className="absolute top-2 right-2 text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherAnnouncements;
