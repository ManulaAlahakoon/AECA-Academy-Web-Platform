import React, { useState } from "react";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState({
    name: "Ms. Jane Doe",
    email: "jane@aecacademy.com",
    subject: "IELTS",
    profilePic: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(teacher);
  const [previewPic, setPreviewPic] = useState(null);

  const handleEditClick = () => {
    setFormData(teacher);
    setPreviewPic(null);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setTeacher(formData);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setPreviewPic(null);
  };

  const getProfileImage = () => {
    if (previewPic) return previewPic;
    if (teacher.profilePic instanceof File)
      return URL.createObjectURL(teacher.profilePic);
    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#800000] mb-4">My Profile</h1>

      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <img
          src={getProfileImage()}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-2 border-[#800000]"
        />
      </div>

      <p><strong>Name:</strong> {teacher.name}</p>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Subject:</strong> {teacher.subject}</p>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleEditClick}
          className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#990000]"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold text-[#800000] mb-4">Update Profile</h2>

            {/* Profile Picture Input */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={previewPic || getProfileImage()}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full border-2 border-[#800000] mb-2"
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            {/* Input Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleSave}
                className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#990000]"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
