// frontend/pages/student/StudentProfile.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

const StudentProfile = () => {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await apiFetch("/api/profile");
      setProfile(res.profile);
      setFormData(res.profile);
    } catch (err) {
      alert("Error loading profile");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/api/profile/update", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      setProfile(res.profile);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    }
  };
  const [profileImage, setProfileImage] = useState(null);
const [previewImage, setPreviewImage] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }
};

const handleImageUpload = async (e) => {
  e.preventDefault();
  if (!profileImage) return;

  const formData = new FormData();
  formData.append("profilePicture", profileImage);

  try {
    const res = await apiFetch("/api/profile/upload-picture", {
      method: "POST",
      body: formData,
      isFormData: true, // Make sure this is handled in your apiFetch function
    });

    setProfile(res.profile);
    setMessage("Profile picture updated!");
    setPreviewImage(null);
    setProfileImage(null);
  } catch (err) {
    setMessage("Failed to upload profile picture.");
  }
};


  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/api/profile/password", {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage("Failed to update password.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4 text-[#800000]">
        Student Profile
      </h1>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* Profile Picture Upload Section */}
      <div className="mb-6 text-center">
        <img
          //src={`${import.meta.env.VITE_API_BASE_URL}/${profile.profilePicture}`}
          //src={`${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/${profile.profilePicture.replace(/^\//, '')}`}
          // src={
          //   `${import.meta.env.VITE_API_BASE_URL}/${profile.profilePicture}` ||
          //   `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/${profile.profilePicture.replace(/^\//, "")}`
          // }
          src={`${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/${(profile.profilePicture || "").replace(/^\//, "")}`}
          alt="Profile"
          className="rounded-full w-32 h-32 object-cover mx-auto mb-2"
        />

        <form onSubmit={handleImageUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          <button
            type="submit"
            className="bg-[#800000] text-white px-4 py-1 rounded"
          >
            Upload
          </button>
        </form>
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          value={formData.email || ""}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth?.slice(0, 10) || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          value={formData.phone || ""}
          onChange={handleInputChange}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />
        <input
          name="address"
          value={formData.address || ""}
          onChange={handleInputChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <input
          name="country"
          value={formData.country || ""}
          onChange={handleInputChange}
          placeholder="Country"
          className="w-full p-2 border rounded"
        />
        <input
          name="occupation"
          value={formData.occupation || ""}
          onChange={handleInputChange}
          placeholder="Occupation"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={handleInputChange}
          placeholder="Bio"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-[#800000] text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>

      <hr className="my-6" />

      <form onSubmit={handlePasswordUpdate} className="space-y-4">
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-[#800000] text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
