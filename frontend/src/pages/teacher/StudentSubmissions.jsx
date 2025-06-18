import React, { useEffect, useState } from "react";

const StudentSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Simulate backend fetch
    setSubmissions([
      {
        id: 1,
        studentName: "Lakshan Perera",
        course: "IELTS",
        assignment: "Essay Writing - Week 2",
        fileName: "lakshan_essay.pdf",
        submittedAt: "2025-06-05",
        grade: "",
        submitted: false,
      },
      {
        id: 2,
        studentName: "Nimali Fernando",
        course: "PTE",
        assignment: "Listening Practice 1",
        fileName: "nimali_audio.mp3",
        submittedAt: "2025-06-06",
        grade: "",
        submitted: false,
      },
    ]);
  }, []);

  const handleGradeChange = (id, grade) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, grade } : s))
    );
  };

  const handleGradeSubmit = (id) => {
    // In real case, you'd call API to update backend
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, submitted: true } : s
      )
    );
    alert("Grade submitted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-[#800000] mb-6">
        Student Submissions
      </h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <>
          {/* Table view for screens >= 680px (approx 17cm) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-[#800000] text-white">
                <tr>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Assignment</th>
                  <th className="p-3 text-left">File</th>
                  <th className="p-3 text-left">Submitted At</th>
                  <th className="p-3 text-left">Grade</th>
                  <th className="p-3 text-left">Action</th>
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
                        placeholder="A+ / 90%"
                        className="border px-2 py-1 rounded text-sm w-24"
                        value={sub.grade}
                        onChange={(e) =>
                          handleGradeChange(sub.id, e.target.value)
                        }
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleGradeSubmit(sub.id)}
                        disabled={!sub.grade || sub.submitted}
                        className={`px-3 py-1 rounded text-white text-sm ${
                          sub.submitted
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-[#800000] hover:bg-maroon-800"
                        }`}
                      >
                        {sub.submitted ? "Submitted" : "Submit Grade"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card layout below 680px */}
          <div className="sm:hidden space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="border rounded p-4 shadow-sm bg-gray-50"
              >
                <p><strong>Student:</strong> {sub.studentName}</p>
                <p><strong>Course:</strong> {sub.course}</p>
                <p><strong>Assignment:</strong> {sub.assignment}</p>
                <p>
                  <strong>File:</strong>{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    {sub.fileName}
                  </span>
                </p>
                <p><strong>Submitted:</strong> {sub.submittedAt}</p>
                <div className="mt-2">
                  <label className="text-sm font-semibold block mb-1">
                    Grade:
                  </label>
                  <input
                    type="text"
                    placeholder="A+ / 90%"
                    className="border px-2 py-1 rounded w-full"
                    value={sub.grade}
                    onChange={(e) =>
                      handleGradeChange(sub.id, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleGradeSubmit(sub.id)}
                    disabled={!sub.grade || sub.submitted}
                    className={`mt-2 w-full py-2 rounded text-white text-sm ${
                      sub.submitted
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-[#800000] hover:bg-maroon-800"
                    }`}
                  >
                    {sub.submitted ? "Submitted" : "Submit Grade"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentSubmissions;
