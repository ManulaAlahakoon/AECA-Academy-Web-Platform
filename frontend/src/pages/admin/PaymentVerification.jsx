import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

const PaymentVerification = () => {
  const [enrollments, setEnrollments] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [modal, setModal] = useState({ show: false, type: "", id: null });

  useEffect(() => {
    fetchPendingEnrollments();
  }, []);

  const fetchPendingEnrollments = async () => {
    try {
      const res = await apiFetch("/api/enrollment/pending");
      setEnrollments(res.enrollments);
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmAction = async () => {
    try {
      if (modal.type === "approve") {
        await apiFetch(`/api/enrollment/${modal.id}/approve`, {
          method: "PATCH",
        });
        alert("Enrollment approved and email sent.");
      } else if (modal.type === "reject") {
        await apiFetch(`/api/enrollment/${modal.id}/reject`, {
          method: "PATCH",
        });
        alert("Enrollment rejected and email sent.");
      }
      setModal({ show: false, type: "", id: null });
      fetchPendingEnrollments();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelModal = () => setModal({ show: false, type: "", id: null });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#800000]">
        Pending Enrollments
      </h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Student</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Fee</th>
            <th className="border p-2">Receipt</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment._id}>
              <td className="border p-2">{enrollment.student.name}</td>
              <td className="border p-2">{enrollment.student.email}</td>
              <td className="border p-2">{enrollment.course.name}</td>
              <td className="border p-2">${enrollment.course.monthlyFee}</td>
              <td className="border p-2">
                <a
                  href={`${BASE_URL}/${enrollment.receipt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Receipt
                </a>
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() =>
                    setModal({
                      show: true,
                      type: "approve",
                      id: enrollment._id,
                    })
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    setModal({ show: true, type: "reject", id: enrollment._id })
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-[#800000]">
              {modal.type === "approve"
                ? "Approve Enrollment"
                : "Reject Enrollment"}
            </h2>
            <p className="mb-4">
              Are you sure you want to{" "}
              <span className="font-semibold text-[#800000]">{modal.type}</span>{" "}
              this enrollment?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmAction}
                className={`${
                  modal.type === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white px-4 py-2 rounded`}
              >
                Yes, {modal.type}
              </button>
              <button
                onClick={cancelModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentVerification;
