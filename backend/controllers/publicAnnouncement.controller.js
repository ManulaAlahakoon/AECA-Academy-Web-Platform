// controllers/publicAnnouncement.controller.js
import PublicAnnouncement from '../models/publicAnnouncement.model.js';
import User from '../models/user.model.js';

// Create a public announcement
export const createPublicAnnouncement = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const admin = await User.findById(req.user.id);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const newAnnouncement = new PublicAnnouncement({
      message,
      admin: req.user.id,
    });

    await newAnnouncement.save();
    res.status(201).json({ success: true, announcement: newAnnouncement });
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all public announcements
export const getPublicAnnouncements = async (req, res) => {
  try {
    const announcements = await PublicAnnouncement.find()
      .populate("admin", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, announcements });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
