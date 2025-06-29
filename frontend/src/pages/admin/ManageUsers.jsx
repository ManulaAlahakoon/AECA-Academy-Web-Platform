import React, { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";

const CourseStudents = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  // Get all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiFetch("/api/courses"); // Adjust if needed
        setCourses(res.courses);
      } catch (err) {
        alert("Error loading courses: " + err.message);
      }
    };
    fetchCourses();
  }, []);

  // Get students for selected course
  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchStudents = async () => {
      try {
        const res = await apiFetch(
          `/api/admin/course/${selectedCourseId}/enrolled-students`
        );
        setStudents(res.students);
      } catch (err) {
        alert("Error loading students: " + err.message);
      }
    };
    fetchStudents();
  }, [selectedCourseId]);

  // Toggle Student Status
  const handleToggle = async (student) => {
    setConfirmAction(student);
  };

  const confirmToggle = async () => {
    if (!confirmAction) return;

    try {
      const res = await apiFetch(
        `/api/admin/user/${confirmAction._id}/toggle-status`,
        {
          method: "PATCH",
        }
      );
      alert(`Student is now ${res.isEnabled ? "Enabled" : "Disabled"}`);
      setStudents((prev) =>
        prev.map((s) =>
          s._id === confirmAction._id ? { ...s, isEnabled: res.isEnabled } : s
        )
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setConfirmAction(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#800000]">
        Manage Enrolled Students
      </h2>

      {/*  Select Course Dropdown */}
      <div className="mt-4">
        <label className="block font-semibold text-gray-700">
          Select Course:
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full p-2 rounded border mt-1"
        >
          <option value="">-- Choose a Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Students List */}
      {selectedCourseId && (
        <>
          <table className="min-w-full mt-6 bg-white rounded shadow border">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id}>
                    <td className="p-3">
                      <span
                        className="cursor-pointer text-[#800000] hover:underline"
                        onClick={() => setSelectedStudent(student)}
                      >
                        {student.name}
                      </span>
                    </td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">
                      {student.isEnabled ? "Enabled" : "Disabled"}
                    </td>
                    <td className="p-3">
                      <button
                        className={`py-1 px-3 rounded ${student.isEnabled ? "bg-red-600" : "bg-green-600"} text-white`}
                        onClick={() => handleToggle(student)}
                      >
                        {student.isEnabled ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-gray-500" colSpan="4">
                    No students enrolled for this course.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/*  Student Profile Modal */}
      {/* {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40">
          <div className="bg-white rounded p-6 w-96 relative">
            <h2 className="text-2xl font-bold text-[#800000]">
              {selectedStudent.name}
            </h2>
            <p>Email: {selectedStudent.email}</p>
            <p>
              Account Status:{" "}
              {selectedStudent.isEnabled ? "Enabled" : "Disabled"}
            </p>
            <div className="text-right mt-4">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-gray-600 text-white rounded px-3 py-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40">
          <div className="bg-white rounded p-6 w-[400px] relative shadow-lg">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <img
               // src={`${import.meta.env.VITE_API_BASE_URL}/${selectedStudent.profilePicture}`}
                src={`${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/${selectedStudent.profilePicture.replace(/^\//, '')}`}

                //src={
                //  selectedStudent.profilePicture ||
                //  "https://via.placeholder.com/100"
                //}
                alt={selectedStudent.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-[#800000]"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#800000] text-center mt-3">
              {selectedStudent.name}
            </h2>

            <div className="mt-4 space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedStudent.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span>{" "}
                {selectedStudent.role}
              </p>
              <p>
                <span className="font-semibold">Account Status:</span>{" "}
                {selectedStudent.isEnabled ? "Enabled" : "Disabled"}
              </p>
              {selectedStudent.dateOfBirth && (
                <p>
                  <span className="font-semibold">Date of Birth:</span>{" "}
                  {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}
                </p>
              )}
              {selectedStudent.phone && (
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedStudent.phone}
                </p>
              )}
              {selectedStudent.address && (
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedStudent.address}
                </p>
              )}
              {selectedStudent.country && (
                <p>
                  <span className="font-semibold">Country:</span>{" "}
                  {selectedStudent.country}
                </p>
              )}
              {selectedStudent.occupation && (
                <p>
                  <span className="font-semibold">Occupation:</span>{" "}
                  {selectedStudent.occupation}
                </p>
              )}
              {selectedStudent.bio && (
                <p>
                  <span className="font-semibold">Bio:</span>{" "}
                  {selectedStudent.bio}
                </p>
              )}
              {selectedStudent.createdAt && (
                <p>
                  <span className="font-semibold">Signup Date:</span>{" "}
                  {new Date(selectedStudent.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="text-right mt-6">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Action Modal */}
      {confirmAction && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40">
          <div className="bg-white rounded p-6 w-80">
            <h2 className="text-xl font-bold text-[#800000]">Are you sure?</h2>
            <p>
              Do you want to {confirmAction.isEnabled ? "disable" : "enable"}{" "}
              the student "{confirmAction.name}"?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="bg-gray-600 text-white rounded px-3 py-1"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggle}
                className={`${confirmAction.isEnabled ? "bg-red-600" : "bg-green-600"} text-white rounded px-3 py-1`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseStudents;
