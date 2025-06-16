import React, { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await apiFetch("/api/courses/enabled-courses");
      setCourses(res.courses);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmitEnrollment = async (e) => {
    e.preventDefault();
    if (!receipt) {
      alert("Please upload a receipt.");
      return;
    }
    const formData = new FormData();
    formData.append("receipt", receipt);

    try {
      await apiFetch(`/api/enrollement/${selectedCourse._id}/enroll`, {
        method: "POST",
        body: formData,
      });
      alert("Enrollment submitted! Awaiting admin approval.");
      setShowModal(false);
      setReceipt(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#800000]">
        Available Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded shadow p-4 flex flex-col"
          >
            <img
              src={course.image || "https://via.placeholder.com/300x200"}
              alt={course.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold text-[#800000] mb-1">
              {course.name}
            </h2>
            <p className="text-gray-600 mb-2">
              {course.assignedTeacher
                ? `Instructor: ${course.assignedTeacher.name}`
                : "Instructor: TBD"}
            </p>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <button
              onClick={() => handleEnrollClick(course)}
              className="bg-[#800000] hover:bg-[#660000] text-white py-2 rounded font-semibold mt-auto"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* Enrollment Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-[#800000]">
              Enroll in {selectedCourse.name}
            </h2>
            <p className="mb-4">
              Monthly Fee:{" "}
              <span className="font-semibold">
                ${selectedCourse.monthlyFee}
              </span>
            </p>
            <form onSubmit={handleSubmitEnrollment}>
              <input
                type="file"
                name="receipt"
                accept="image/*,application/pdf"
                required
                className="mb-4 w-full"
                onChange={handleFileChange}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#800000] hover:bg-[#660000] text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
