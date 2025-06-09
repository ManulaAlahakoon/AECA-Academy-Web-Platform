// src/pages/teacher/TeacherProfile.jsx
import React from "react";

const TeacherProfile = () => {
  // dummy user profile
  const teacher = {
    name: "Ms. Jane Doe",
    email: "jane@aecacademy.com",
    subject: "IELTS",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-maroon-700 mb-4">My Profile</h1>
      <p><strong>Name:</strong> {teacher.name}</p>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Subject:</strong> {teacher.subject}</p>
      {/* Optionally: Edit form later */}
    </div>
  );
};

export default TeacherProfile;
