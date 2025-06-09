// src/pages/teacher/StudentSubmissions.jsx
import React, { useState } from "react";

const mockSubmissions = [
  {
    id: 1,
    studentName: "Lakshan Perera",
    course: "IELTS",
    assignment: "Essay Writing - Week 2",
    fileName: "lakshan_essay.pdf",
    submittedAt: "2025-06-05",
    grade: null,
  },
  {
    id: 2,
    studentName: "Nimali Fernando",
    course: "PTE",
    assignment: "Listening Practice 1",
    fileName: "nimali_audio.mp3",
    submittedAt: "2025-06-06",
    grade: null,
  },
];

const StudentSubmissions = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);

  const handleGradeChange = (id, grade) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, grade } : s))
    );
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-maroon-700 mb-6">
        Student Submissions
      </h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead className="bg-maroon-700 text-white">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Assignment</th>
                <th className="p-3 text-left">File</th>
                <th className="p-3 text-left">Submitted At</th>
                <th className="p-3 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-t">
                  <td className="p-3">{sub.studentName}</td>
                  <td className="p-3">{sub.course}</td>
                  <td className="p-3">{sub.assignment}</td>
                  <td className="p-3 text-blue-600 underline cursor-pointer">
                    {sub.fileName}
                  </td>
                  <td className="p-3">{sub.submittedAt}</td>
                  <td className="p-3">
                    <input
                      type="text"
                      placeholder="A+ / B / 90%"
                      className="border px-2 py-1 rounded text-sm"
                      value={sub.grade || ""}
                      onChange={(e) =>
                        handleGradeChange(sub.id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentSubmissions;
