import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import {
  FaUserGraduate,
  FaUsers,
  FaBook,
  FaClock,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await apiFetch("/api/admin/enrollment-chart");
        setChartData(res.data);
      } catch (err) {
        console.error("Chart error:", err.message);
      }
    };

    fetchChartData();
  }, []);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiFetch("/api/admin/dashboard");
        setStats(res.stats);
      } catch (err) {
        alert("Failed to load dashboard data: " + err.message);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon, label, value }) => (
    <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
      <div className="text-2xl text-[#800000]">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-[#800000] mb-6">
        Admin Dashboard
      </h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard
            icon={<FaUsers />}
            label="Total Users"
            value={stats.totalUsers}
          />
          {/* <StatCard
            icon={<FaChalkboardTeacher />}
            label="Total Teachers"
            value={stats.totalTeachers}
          /> */}
          <StatCard
            icon={<FaUserGraduate />}
            label="Total Students"
            value={stats.totalStudents}
          />
          {/* <StatCard
            icon={<FaBook />}
            label="Total Courses"
            value={stats.totalCourses}
          /> */}
          <StatCard
            icon={<FaClock />}
            label="Pending Enrollments"
            value={stats.pendingEnrollments}
          />
        </div>
      )}
      {chartData && (
        <div className="bg-white shadow p-6 mt-10 rounded max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Enrollment per Course
          </h2>
          <Bar
            data={{
              labels: chartData.map((item) => item.courseName),
              datasets: [
                {
                  label: "Students Enrolled",
                  data: chartData.map((item) => item.count),
                  backgroundColor: "transparent", // Transparent fill
                  borderColor: "#800000", // Maroon border
                  borderWidth: 2,
                  hoverBackgroundColor: "#80000020", // Optional hover effect
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#333", // dark gray labels
                    font: { size: 12 },
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: "#333",
                    stepSize: 1,
                    precision: 0,
                  },
                  grid: {
                    color: "#e5e5e5", // light gray lines
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
