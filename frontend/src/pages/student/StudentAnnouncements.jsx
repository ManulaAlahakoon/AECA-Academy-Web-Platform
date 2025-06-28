// src/pages/student/StudentAnnouncements.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchAnnouncements = async () => {
  //     try {
  //       const res = await apiFetch("/api/student/announcements");
  //       if (res.success) {
  //         setAnnouncements(res.announcements);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching student announcements:", err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnnouncements();
  // }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const [res1, res2] = await Promise.all([
          apiFetch("/api/student/announcements"),
          apiFetch("/api/student/public-announcements"),
        ]);

        const all = [
          ...(res1?.announcements || []),
          ...(res2?.announcements.map((a) => ({
            ...a,
            teacher: a.admin, // unify field for rendering
            course: "Public Announcement",
          })) || []),
        ];

        setAnnouncements(all);
      } catch (err) {
        console.error("Error fetching announcements:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);
  

  // Sort & Separate
  const sortedPosts = [...announcements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const recentPosts = sortedPosts.slice(0, 5);
  const previousPosts = sortedPosts.slice(5);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-[#800000] mb-6">
        Announcements
      </h1>

      {/* 🆕 Recent Announcements */}
      <h2 className="text-lg font-medium text-maroon-700 mb-3">
        Recent Announcements
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : recentPosts.length === 0 ? (
        <p className="text-gray-500 mb-6">No recent announcements.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {recentPosts.map((ann) => (
            <li
              key={ann._id}
              className="bg-gray-50 border p-4 rounded relative shadow-sm"
            >
              <p className="text-sm text-maroon-800 font-semibold">
                {ann.course} • {new Date(ann.date).toLocaleString()}
              </p>
              <p className="text-gray-700 mt-1">{ann.message}</p>
              <div className="text-xs text-gray-500 mt-1">
                Posted by: {ann.teacher?.name || "Unknown"}
              </div>
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
              key={ann._id}
              className="bg-gray-100 border p-4 rounded relative shadow-sm"
            >
              <p className="text-sm text-maroon-800 font-semibold">
                {ann.course} • {new Date(ann.date).toLocaleString()}
              </p>
              <p className="text-gray-700 mt-1">{ann.message}</p>
              <div className="text-xs text-gray-500 mt-1">
                Posted by: {ann.teacher?.name || "Unknown"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentAnnouncements;
