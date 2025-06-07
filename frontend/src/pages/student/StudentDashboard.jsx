import React from "react";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-[#800000] text-3xl font-semibold text-center">
        Welcome, {user?.name || "Student"}!
      </h1>
    </div>
  );
};

export default StudentDashboard;
