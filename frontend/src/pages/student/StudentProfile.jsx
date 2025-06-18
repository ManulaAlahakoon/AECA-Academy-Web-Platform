import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch("/api/profile");
        setUserData((prev) => ({
          ...prev,
          name: res.name
        }));
      } catch (error) {
        alert("Failed to load profile data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const updateData = {
      name: userData.name
    };

    if (userData.currentPassword && userData.newPassword) {
      updateData.currentPassword = userData.currentPassword;
      updateData.newPassword = userData.newPassword;
    }

    try {
      setLoading(true);
      await apiFetch("/api/profile", "PUT", updateData);
      alert("Profile updated successfully");
      setIsEditing(false);
      setUserData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  if (loading) {
    return <div className="text-center mt-8">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h2>
          <p className="text-sm text-gray-500 mb-4">Leave blank to keep current password</p>

          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={userData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              minLength="8"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              minLength="8"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
