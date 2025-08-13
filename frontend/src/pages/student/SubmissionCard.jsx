import React, { useEffect, useState } from "react";
import { apiFetch, apiPost, apiDelete } from "../../services/api";
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

    console.log("Submitting with course:", assignment.course);

    try {
      setIsSubmitting(true);
      const response = await apiPost("/api/submissions/submit", formData, true);
      console.log("Submitted successfully:", response);
      await fetchSubmission();
    } catch (err) {
      const fullError = await err?.response?.text?.() || err.message || err.toString();
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
    <div className="p-4 border border-gray-300 rounded mb-4 bg-white shadow">
      <p><strong>Topic:</strong> {assignment.topic}</p>
      <p><strong>Due:</strong> {assignment.dueDate ? dayjs(assignment.dueDate).format("YYYY-MM-DD HH:mm") : "No due date"}</p>

      {submission ? (
        <>
          <p><strong>Submitted At:</strong> {dayjs(submission.submittedAt).format("YYYY-MM-DD HH:mm")}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={deadlinePassed ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
              {deadlinePassed ? "Late Submission" : "On Time"}
            </span>
          </p>

          <p>
            <strong>File:</strong>{" "}
            <a
              className="text-blue-500 underline"
              href={`${BASE_URL}/submissions/${assignment.course}/${submission.fileName}`}
              target="_blank"
              rel="noreferrer"
            >
              {submission.originalName}
            </a>
          </p>

          <p><strong>Grade:</strong> {submission.grade || "Waiting for grade"}</p>

          <div className="mt-2 space-x-2">
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
              Remove Submission
            </button>

            <label className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded">
              Edit
              <input
                type="file"
                hidden
                onChange={handleFileReplace} //  auto upload
              />
            </label>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3">
          <input
            name="file"
            type="file"
            required
            className="mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
