// controllers/teacherAnnouncement.controller.js
import TeacherAnnouncement from "../models/teacherAnnouncement.model.js";

export const postAnnouncement = async (req, res) => {
  try {
    const { course, message } = req.body;

    if (!course || !message) {
      return res.status(400).json({ success: false, message: "Course and message are required." });
    }

    const announcement = new TeacherAnnouncement({
      teacher: req.user.id,
      course,
      message,
    });

    await announcement.save();

    res.status(201).json({ success: true, announcement });
  } catch (err) {
    console.error("Error posting announcement:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTeacherAnnouncements = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const announcements = await TeacherAnnouncement.find({ teacher: teacherId }).sort({ date: -1 });

    res.status(200).json({ success: true, announcements });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// For Student Dashboard (all announcements or by course)
export const getAnnouncementsByCourse = async (req, res) => {
  try {
    const course = req.query.course; // Optional

    const filter = course ? { course } : {};

    const announcements = await TeacherAnnouncement.find(filter)
      .sort({ date: -1 })
      .populate("teacher", "name email");

    res.status(200).json({ success: true, announcements });
  } catch (err) {
    console.error("Error getting course announcements:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTeacherAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.user?.id;

    if (!teacherId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No teacher ID." });
    }

    const deleted = await TeacherAnnouncement.findOneAndDelete({
      _id: id,
      teacher: teacherId,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Announcement not found or not authorized." });
    }

    res.status(200).json({ success: true, message: "Announcement deleted successfully." });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ success: false, message: "Server error while deleting announcement." });
  }
};
