import React from "react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Teacher Dashboard</h1>
      <p className="mb-6 text-gray-700">
        Welcome! Manage your courses, students, and materials from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile */}
        <DashboardCard 
          title="My Profile"
          description="View and update your personal details."
          link="/teacher/profile"
        />

        {/* Announcements */}
        <DashboardCard 
          title="Course Announcements"
          description="Post updates for your students."
          link="/teacher/announcements"
        />

        {/* Materials */}
        <DashboardCard 
          title="Lecture Materials"
          description="Upload or manage lectures and assignments."
          link="/teacher/materials"
        />

        {/* Submissions */}
        <DashboardCard 
          title="Student Submissions"
          description="Track and grade student work."
          link="/teacher/submissions"
        />

        {/* Feedback */}
        <DashboardCard 
          title="Course Feedback"
          description="Read feedback from students."
          link="/teacher/feedback"
        />
      </div>
    </div>
  );
};

// Reusable card component
const DashboardCard = ({ title, description, link }) => (
  <Link
    to={link}
    className="block bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
  >
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default TeacherDashboard;