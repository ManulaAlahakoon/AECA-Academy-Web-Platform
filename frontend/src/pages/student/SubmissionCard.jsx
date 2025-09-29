import React, { useEffect, useState } from "react";
import { apiFetch, apiPostPost, apiDelete } from "../../services/api";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const SubmissionCard = ({ assignment }) => {
  const [submission, setSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSubmission = async () => {
    try {
      const res = await apiFetch(`/api/submissions/${assignment._id}`);
      setSubmission(res.submission);
    } catch (err) {
      console.error("Failed to fetch submission:", err.message);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, [assignment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.file?.files[0];
    if (!file) return alert("Please select a file");

    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("course", assignment.course);
    formData.append("assignmentId", assignment._id);
    formData.append("file", file);

    try {
      setIsSubmitting(true);
      const response = await apiPostPost("/api/submissions/submit", formData, true);
      console.log("Submitted successfully:", response);
      await fetchSubmission();
    } catch (err) {
      const fullError =
        (await err?.response?.text?.()) || err.message || err.toString();
      console.error("Submission failed:", fullError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileReplace = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file); // Auto-upload
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this submission?"
    );
    if (!confirmed) return;

    try {
      await apiDelete(`/api/submissions/${submission._id}`);
      setSubmission(null);
      await fetchSubmission();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const deadlinePassed =
    assignment.dueDate && submission?.submittedAt
      ? dayjs(submission.submittedAt).isAfter(assignment.dueDate)
      : false;

  return (
    <div className="p-6 border border-gray-200 rounded-2xl mb-6 bg-white shadow-md transition hover:shadow-lg">
      {/* Assignment Title */}
      <h3 className="text-xl font-semibold text-purple-700 mb-3">
        📘 {assignment.topic}
      </h3>

      {/* Due Date */}
      <p className="text-sm text-gray-700 mb-2">
        <strong className="text-gray-900">Due:</strong>{" "}
        {assignment.dueDate
          ? dayjs(assignment.dueDate).format("YYYY-MM-DD HH:mm")
          : "No due date"}
      </p>

      {/* Teacher's Assignment File */}
      {assignment.fileName && (
        <p className="mb-4">
          <span className="text-gray-900 font-medium">Assignment File:</span>{" "}
          <a
            className="inline-block px-3 py-1 text-blue-700 text-sm underline hover:text-blue-900 transition"
            href={`http://localhost:5000/assignments/${assignment.course}/${assignment.fileName}`}
            target="_blank"
            rel="noreferrer"
          >
            {assignment.originalName || "Assignment File"}
          </a>
        </p>
      )}

      {/* If already submitted */}
      {submission ? (
        <>
          <p className="text-sm text-gray-700 mb-1">
            <strong className="text-gray-900">Submitted At:</strong>{" "}
            {dayjs(submission.submittedAt).format("YYYY-MM-DD HH:mm")}
          </p>

          <p className="text-sm mb-1">
            <strong className="text-gray-900">Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                deadlinePassed
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {deadlinePassed ? "Late Submission" : "On Time"}
            </span>
          </p>

          <p className="mb-2 text-sm">
            <strong className="text-gray-900">Uploaded File:</strong>{" "}
            <a
              className="inline-block px-3 py-1 text-blue-700 text-sm underline hover:text-blue-900 transition"
              href={`${BASE_URL}/submissions/${assignment.course}/${submission.fileName}`}
              target="_blank"
              rel="noreferrer"
            >
              {submission.originalName || "View File"}
            </a>
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <strong className="text-gray-900">Grade:</strong>{" "}
            <span className="font-medium text-purple-700">
              {submission.grade || "Waiting for grade"}
            </span>
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            <button
              onClick={handleDelete}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-sm transition"
            >
              ❌ Remove Submission
            </button>

            <label className="cursor-pointer bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm shadow-sm transition">
              ✏️ Edit
              <input type="file" hidden onChange={handleFileReplace} />
            </label>
          </div>
        </>
      ) : (
        /* If not submitted yet */
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            name="file"
            type="file"
            required
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm bg-white shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm shadow transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </form>
      )}
    </div>
  );
};

export default SubmissionCard;

// import React, { useEffect, useState } from "react";
// import { apiFetch, apiPost, apiDelete } from "../../services/api";
// import dayjs from "dayjs";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// const SubmissionCard = ({ assignment }) => {
//   const [submission, setSubmission] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const fetchSubmission = async () => {
//     try {
//       const res = await apiFetch(`/api/submissions/${assignment._id}`);
//       setSubmission(res.submission);
//     } catch (err) {
//       console.error("Failed to fetch submission:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchSubmission();
//   }, [assignment]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const file = e.target.file?.files[0];
//     if (!file) return alert("Please select a file");

//     await uploadFile(file);
//   };

//   const uploadFile = async (file) => {
//     const formData = new FormData();
//     formData.append("course", assignment.course);
//     formData.append("assignmentId", assignment._id);
//     formData.append("file", file);

//     console.log("Submitting with course:", assignment.course);

//     try {
//       setIsSubmitting(true);
//       const response = await apiPost("/api/submissions/submit", formData, true);
//       console.log("Submitted successfully:", response);
//       await fetchSubmission();
//     } catch (err) {
//       const fullError = await err?.response?.text?.() || err.message || err.toString();
//       console.error("Submission failed:", fullError);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleFileReplace = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       uploadFile(file); // Auto-upload
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await apiDelete(`/api/submissions/${submission._id}`);
//       setSubmission(null);
//       await fetchSubmission();
//     } catch (err) {
//       console.error("Delete failed:", err.message);
//     }
//   };

//   const deadlinePassed =
//     assignment.dueDate && submission?.submittedAt
//       ? dayjs(submission.submittedAt).isAfter(assignment.dueDate)
//       : false;

//   return (
//     <div className="p-4 border border-gray-300 rounded mb-4 bg-white shadow">
//       <p><strong>Topic:</strong> {assignment.topic}</p>
//       <p><strong>Due:</strong> {assignment.dueDate ? dayjs(assignment.dueDate).format("YYYY-MM-DD HH:mm") : "No due date"}</p>

//       {submission ? (
//         <>
//           <p><strong>Submitted At:</strong> {dayjs(submission.submittedAt).format("YYYY-MM-DD HH:mm")}</p>
//           <p>
//             <strong>Status:</strong>{" "}
//             <span className={deadlinePassed ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
//               {deadlinePassed ? "Late Submission" : "On Time"}
//             </span>
//           </p>

//           <p>
//             <strong>File:</strong>{" "}
//             <a
//               className="text-blue-500 underline"
//               href={`${BASE_URL}/submissions/${assignment.course}/${submission.fileName}`}
//               target="_blank"
//               rel="noreferrer"
//             >
//               {submission.originalName}
//             </a>
//           </p>

//           <p><strong>Grade:</strong> {submission.grade || "Waiting for grade"}</p>

//           <div className="mt-2 space-x-2">
//             <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
//               Remove Submission
//             </button>

//             <label className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded">
//               Edit
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleFileReplace} //  auto upload
//               />
//             </label>
//           </div>
//         </>
//       ) : (
//         <form onSubmit={handleSubmit} className="mt-3">
//           <input
//             name="file"
//             type="file"
//             required
//             className="mb-2"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Assignment"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default SubmissionCard;
