import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import {
  FaUserGraduate,
  FaUsers,
  FaBook,
  FaClock,
  FaChalkboardTeacher,
} from "react-icons/fa";

import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";


import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";    

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);




ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [recent, setRecent] = useState(null);
  const [weeklySignups, setWeeklySignups] = useState([]);

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await apiFetch("/api/admin/weekly-signups");
        setWeeklySignups(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchWeekly();
  }, []);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await apiFetch("/api/admin/recent-activity");
        setRecent(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchRecent();
  }, []);


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

      {/* the Chart */}

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

      {/* Recent Activity Panel */}

      {recent && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#800000] mb-2">New Users</h3>
            <ul className="bg-white rounded shadow p-4 space-y-2 text-sm">
              {recent.users.map((user) => (
                <li key={user._id}>
                  {user.name} ({user.role})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#800000] mb-2">
              New Courses
            </h3>
            <ul className="bg-white rounded shadow p-4 space-y-2 text-sm">
              {recent.courses.map((course) => (
                <li key={course._id}>{course.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#800000] mb-2">
              Recent Enrollments
            </h3>
            <ul className="bg-white rounded shadow p-4 space-y-2 text-sm">
              {recent.enrollments.map((e) => (
                <li key={e._id}>
                  {e.student.name} → {e.course.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {weeklySignups.length > 0 && (
        <div className="mt-10 bg-white rounded shadow p-6 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-[#800000] mb-4 text-center">
            Weekly Student Signups
          </h2>
          <Line
            data={{
              labels: weeklySignups.map((d) => d.date),
              datasets: [
                {
                  label: "Signups",
                  data: weeklySignups.map((d) => d.count),
                  borderColor: "#800000",
                  backgroundColor: "#80000030",
                  tension: 0.3,
                  fill: true,
                },
              ],
            }}
            options={{
              scales: {
                y: { beginAtZero: true },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
