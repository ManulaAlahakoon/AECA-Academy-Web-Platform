// src/pages/teacher/CourseFeedback.jsx
import React, { useState } from "react";

// Mock feedback data with sentiment
const mockFeedback = [
  {
    id: 1,
    student: "Nimal Rajapakse",
    course: "IELTS",
    message: "The assignment was very helpful and clear. Thank you!",
    sentiment: "Positive",
    submittedAt: "2025-06-04",
  },
  {
    id: 2,
    student: "Harsha Nadeeka",
    course: "PTE",
    message: "It was confusing. Please explain better next time.",
    sentiment: "Negative",
    submittedAt: "2025-06-05",
  },
  {
    id: 3,
    student: "Isuri Madushani",
    course: "IELTS",
    message: "Good session, nothing much to add.",
    sentiment: "Neutral",
    submittedAt: "2025-06-06",
  },
];

const sentimentColor = {
  Positive: "text-green-600",
  Negative: "text-red-600",
  Neutral: "text-yellow-600",
};

const CourseFeedback = () => {
  const [feedbacks] = useState(mockFeedback);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-maroon-700 mb-6">Course Feedback</h1>

      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback available yet.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((fb) => (
            <li
              key={fb.id}
              className="border bg-gray-50 p-4 rounded shadow-sm space-y-1"
            >
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{fb.student} • {fb.course}</span>
                <span>{fb.submittedAt}</span>
              </div>
              <p className="text-gray-800">{fb.message}</p>
              <p className={`font-semibold ${sentimentColor[fb.sentiment]}`}>
                Sentiment: {fb.sentiment}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseFeedback;
