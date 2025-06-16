import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const StudentCourseDetail = () => {
  const { id,name } = useParams(); // course ID
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#800000]">
          Course Detail - {id}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Materials</h2>
        <ul className="list-disc pl-6 text-blue-700">
          <li>
            <a href="#" className="underline">
              Lecture 1 - Intro to Topic
            </a>
          </li>
          <li>
            <a href="#" className="underline">
              PDF: Notes & Readings
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Assignments</h2>
        <ul className="list-disc pl-6 text-blue-700">
          <li>
            <a href="#" className="underline">
              Assignment 1 - Due next week
            </a>
          </li>
          <li>
            <a href="#" className="underline">
              Project Brief
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentCourseDetail;
