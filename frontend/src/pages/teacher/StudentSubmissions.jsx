import React, { useEffect, useState } from "react";
import { apiFetch, apiPost } from "../../services/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const StudentSubmissions = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await apiFetch("/api/submissions/teacher/all-submissions");
        setAssignments(data.assignments || []);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleGradeChange = (assignmentId, studentId, grade) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.assignmentId === assignmentId
          ? {
              ...a,
              submissions: a.submissions.map((s) =>
                s.studentId._id === studentId ? { ...s, grade } : s
              ),
            }
          : a
      )
    );
  };

  const handleGradeSubmit = async (assignmentId, studentId, grade) => {
    try {
      await apiPost("/api/submissions/teacher/grade", {
        assignmentId,
        studentId,
        grade,
      });
      alert("Grade submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting grade");
    }
  };

  if (loading)
    return <p className="p-6 text-center text-lg">Loading submissions...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#800000] text-center mb-8">
        Student Submissions
      </h1>

      {assignments.length === 0 ? (
        <p className="text-gray-500 text-center">No assignments yet.</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment.assignmentId} className="mb-10">
            {/* Assignment Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {assignment.title}{" "}
              <span className="text-sm text-gray-500">
                ({assignment.course})
              </span>
            </h2>

            {/* Submissions Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Student</th>
                    <th className="px-4 py-3 text-left font-medium">File</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Submitted At
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Grade</th>
                    <th className="px-4 py-3 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignment.submissions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        No submissions yet.
                      </td>
                    </tr>
                  ) : (
                    assignment.submissions.map((submission, idx) => {
                      const onTime =
                        new Date(submission.submittedAt) <=
                        new Date(assignment.dueDate);

                      return (
                        <tr
                          key={submission._id}
                          className={`${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-purple-50 transition`}
                        >
                          {/* Student */}
                          <td className="px-4 py-3 text-gray-800 font-medium">
                            {submission.studentId?.name || "Unknown"}
                          </td>

                          {/* File */}
                          <td className="px-4 py-3">
                            <a
                              href={`${BASE_URL}/submissions/${submission.filePath
                                .replace(/\\/g, "/")
                                .replace(
                                  /^backend\/uploads\/submissions\//,
                                  ""
                                )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition"
                            >
                              {submission.originalName}
                            </a>
                          </td>

                          {/* Submitted At */}
                          <td className="px-4 py-3 text-gray-600">
                            {new Date(submission.submittedAt).toLocaleString()}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                onTime
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {onTime ? "On Time" : "Late"}
                            </span>
                          </td>

                          {/* Grade Input Dropdown */}
                          <td className="px-4 py-3">
                            <select
                              value={submission.grade || "Pending"}
                              onChange={(e) =>
                                handleGradeChange(
                                  assignment.assignmentId,
                                  submission.studentId._id,
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-lg p-2 w-24 text-sm shadow-sm bg-white"
                            >
                              <option value="Pending">Pending</option>
                              <option value="A+">A+</option>
                              <option value="A">A</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B">B</option>
                              <option value="B-">B-</option>
                              <option value="C+">C+</option>
                              <option value="C">C</option>
                              <option value="E">E</option>
                            </select>
                          </td>

                          {/* Action Button */}
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                handleGradeSubmit(
                                  assignment.assignmentId,
                                  submission.studentId._id,
                                  submission.grade
                                )
                              }
                              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs shadow-sm transition"
                            >
                              Submit
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentSubmissions;

// import React, { useEffect, useState } from "react";

// const StudentSubmissions = () => {
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     // Simulate backend fetch
//     setSubmissions([
//       {
//         id: 1,
//         studentName: "Lakshan Perera",
//         course: "IELTS",
//         assignment: "Essay Writing - Week 2",
//         fileName: "lakshan_essay.pdf",
//         submittedAt: "2025-06-05",
//         grade: "",
//         submitted: false,
//       },
//       {
//         id: 2,
//         studentName: "Nimali Fernando",
//         course: "PTE",
//         assignment: "Listening Practice 1",
//         fileName: "nimali_audio.mp3",
//         submittedAt: "2025-06-06",
//         grade: "",
//         submitted: false,
//       },
//     ]);
//   }, []);

//   const handleGradeChange = (id, grade) => {
//     setSubmissions((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, grade } : s))
//     );
//   };

//   const handleGradeSubmit = (id) => {
//     // In real case, you'd call API to update backend
//     setSubmissions((prev) =>
//       prev.map((s) =>
//         s.id === id ? { ...s, submitted: true } : s
//       )
//     );
//     alert("Grade submitted successfully!");
//   };

//   return (
//     <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">
//       <h1 className="text-2xl font-semibold text-[#800000] mb-6">
//         Student Submissions
//       </h1>

//       {submissions.length === 0 ? (
//         <p className="text-gray-500">No submissions yet.</p>
//       ) : (
//         <>
//           {/* Table view for screens >= 680px (approx 17cm) */}
//           <div className="hidden sm:block overflow-x-auto">
//             <table className="min-w-full border">
//               <thead className="bg-[#800000] text-white">
//                 <tr>
//                   <th className="p-3 text-left">Student</th>
//                   <th className="p-3 text-left">Course</th>
//                   <th className="p-3 text-left">Assignment</th>
//                   <th className="p-3 text-left">File</th>
//                   <th className="p-3 text-left">Submitted At</th>
//                   <th className="p-3 text-left">Grade</th>
//                   <th className="p-3 text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((sub) => (
//                   <tr key={sub.id} className="border-t">
//                     <td className="p-3">{sub.studentName}</td>
//                     <td className="p-3">{sub.course}</td>
//                     <td className="p-3">{sub.assignment}</td>
//                     <td className="p-3 text-blue-600 underline cursor-pointer">
//                       {sub.fileName}
//                     </td>
//                     <td className="p-3">{sub.submittedAt}</td>
//                     <td className="p-3">
//                       <input
//                         type="text"
//                         placeholder="A+ / 90%"
//                         className="border px-2 py-1 rounded text-sm w-24"
//                         value={sub.grade}
//                         onChange={(e) =>
//                           handleGradeChange(sub.id, e.target.value)
//                         }
//                       />
//                     </td>
//                     <td className="p-3">
//                       <button
//                         onClick={() => handleGradeSubmit(sub.id)}
//                         disabled={!sub.grade || sub.submitted}
//                         className={`px-3 py-1 rounded text-white text-sm ${
//                           sub.submitted
//                             ? "bg-green-500 cursor-not-allowed"
//                             : "bg-[#800000] hover:bg-maroon-800"
//                         }`}
//                       >
//                         {sub.submitted ? "Submitted" : "Submit Grade"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile card layout below 680px */}
//           <div className="sm:hidden space-y-4">
//             {submissions.map((sub) => (
//               <div
//                 key={sub.id}
//                 className="border rounded p-4 shadow-sm bg-gray-50"
//               >
//                 <p><strong>Student:</strong> {sub.studentName}</p>
//                 <p><strong>Course:</strong> {sub.course}</p>
//                 <p><strong>Assignment:</strong> {sub.assignment}</p>
//                 <p>
//                   <strong>File:</strong>{" "}
//                   <span className="text-blue-600 underline cursor-pointer">
//                     {sub.fileName}
//                   </span>
//                 </p>
//                 <p><strong>Submitted:</strong> {sub.submittedAt}</p>
//                 <div className="mt-2">
//                   <label className="text-sm font-semibold block mb-1">
//                     Grade:
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="A+ / 90%"
//                     className="border px-2 py-1 rounded w-full"
//                     value={sub.grade}
//                     onChange={(e) =>
//                       handleGradeChange(sub.id, e.target.value)
//                     }
//                   />
//                   <button
//                     onClick={() => handleGradeSubmit(sub.id)}
//                     disabled={!sub.grade || sub.submitted}
//                     className={`mt-2 w-full py-2 rounded text-white text-sm ${
//                       sub.submitted
//                         ? "bg-green-500 cursor-not-allowed"
//                         : "bg-[#800000] hover:bg-maroon-800"
//                     }`}
//                   >
//                     {sub.submitted ? "Submitted" : "Submit Grade"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StudentSubmissions;
