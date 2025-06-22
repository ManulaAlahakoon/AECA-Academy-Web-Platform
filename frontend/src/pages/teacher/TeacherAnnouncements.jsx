// src/pages/teacher/TeacherAnnouncements.jsx
import React, { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);

  // Fetch assigned+enabled courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiFetch("/api/teacher/courses");
        if (res.success && res.courses) {
          setCourses(res.courses);
        }
      } catch (error) {
        console.error("Failed to fetch teacher courses:", error);
      }
    };

    fetchCourses();
  }, []);
  useEffect(() => {
  const fetchMyAnnouncements = async () => {
    try {
      const res = await apiFetch("/api/teacher/announcements"); // 👈 Make sure token is passed
      if (res.success && res.announcements) {
        setAnnouncements(res.announcements);
      }
    } catch (error) {
      console.error("Failed to fetch my announcements:", error);
    }
  };

  fetchMyAnnouncements();
}, []);

const handlePost = async (e) => {
  e.preventDefault();
  if (!message || !course) return;

  try {
    // Send to DB via backend
    const res = await apiFetch("/api/teacher/announcements", {
      method: "POST",
      body: JSON.stringify({ course, message }),
    });

    const newAnnouncement = res.announcement; // saved from DB response

    // Add it to state to update UI
    setAnnouncements((prev) => [newAnnouncement, ...prev]);

    // Clear form
    setMessage("");
    setCourse("");
  } catch (error) {
    console.error("Failed to post announcement:", error);
    alert("Failed to post announcement: " + error.message);
  }
};

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };
const today = new Date().toDateString();
const sortedPosts = [...announcements].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

const todayPosts = sortedPosts.filter(
  (a) => new Date(a.date).toDateString() === today
);
const recentPosts = todayPosts.slice(0, 5); // Only the 5 most recent from today
const overflowToday = todayPosts.slice(5);

const previousPosts = [
  ...overflowToday,
  ...sortedPosts.filter(
    (a) => new Date(a.date).toDateString() !== today
  ),
];

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
            {courses.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
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
        >
          Post
        </button>
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
