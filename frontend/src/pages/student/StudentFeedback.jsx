// File: src/pages/student/StudentFeedback.jsx
import React, { useState, useEffect } from "react";
import { apiFetch } from "../../services/api"; // Make sure this exists

const StudentFeedback = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await apiFetch("/api/student/feedback/enrolled-courses");
      setCourses(res.courses || []); //  pick only the array
      console.log("Courses fetched:", res.courses);
    } catch (err) {
      console.log("Failed to load courses", err);
    }
  };
  fetchCourses();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId || !feedback.trim()) {
      return setStatusMessage("Please select a course and enter feedback.");
    }

    try {
      const res = await apiFetch(
        "/api/student/feedback/submit-feedback",
        {
          method: "POST",
          body: JSON.stringify({ courseId: selectedCourseId, feedback }),
          headers: { "Content-Type": "application/json" },
        }
      );

      setStatusMessage(res.message || "Feedback submitted successfully.");
      setFeedback("");
      setSelectedCourseId("");
    } catch (err) {
      setStatusMessage("Error submitting feedback.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4 text-[#800000]">Feedback Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Course
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">-- Choose a course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="w-full border rounded px-3 py-2"
            placeholder="Write your thoughts here..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#800000] hover:bg-[#a00000] text-white px-5 py-2 rounded shadow"
        >
          Submit Feedback
        </button>
      </form>

      {statusMessage && (
        <p className="mt-4 text-center text-sm text-green-700 font-medium">
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default StudentFeedback;
