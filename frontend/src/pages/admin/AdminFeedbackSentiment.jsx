// src/pages/admin/AdminFeedbackSentiment.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { FaComments, FaSmile, FaFrown } from "react-icons/fa";

const AdminFeedbackSentiment = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [summary, setSummary] = useState({ POSITIVE: 0, NEGATIVE: 0 });
  const [loading, setLoading] = useState(false);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiFetch("/api/admin/courses");
        setCourses(res.courses);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Fetch feedbacks + sentiment
  useEffect(() => {
    if (!selectedCourseId) return;
    setLoading(true);

    const fetchFeedbacks = async () => {
      try {
        const res = await apiFetch(`/api/admin/feedbacks/${selectedCourseId}`);
        setFeedbacks(res.feedbacks);
        setSummary(res.summary);
      } catch (err) {
        console.error("Failed to load feedbacks:", err);
        setFeedbacks([]);
        setSummary({ POSITIVE: 0, NEGATIVE: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [selectedCourseId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-[#800000] mb-8 flex items-center justify-center gap-2">
        <FaComments className="text-[#800000]" /> Admin Feedback Sentiment
      </h1>

      {/* Course Selector */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">
          Select Course
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] transition"
        >
          <option value="">-- Choose a course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Feedback Summary */}
      {loading ? (
        <p className="text-center text-gray-500">Loading feedbacks...</p>
      ) : selectedCourseId ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center shadow-sm">
              <FaSmile className="text-green-600 text-xl mx-auto mb-2" />
              <p className="text-green-700 font-semibold">
                Positive: {summary.POSITIVE}%
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center shadow-sm">
              <FaFrown className="text-red-600 text-xl mx-auto mb-2" />
              <p className="text-red-700 font-semibold">
                Negative: {summary.NEGATIVE}%
              </p>
            </div>
          </div>

          {/* Feedback List */}
          {feedbacks.length === 0 ? (
            <p className="text-center text-gray-500">
              No feedbacks available for this course.
            </p>
          ) : (
            <ul className="space-y-4">
              {feedbacks.map((f, idx) => (
                <li
                  key={idx}
                  className="bg-white shadow-md border rounded-lg p-4 transition hover:shadow-lg"
                >
                  <p className="text-gray-800 text-base">{f.feedback}</p>
                  <span
                    className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full ${
                      f.sentiment === "POSITIVE"
                        ? "bg-green-100 text-green-700"
                        : f.sentiment === "NEGATIVE"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {f.sentiment}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">
          Please select a course to view feedbacks.
        </p>
      )}
    </div>
  );
};

export default AdminFeedbackSentiment;
