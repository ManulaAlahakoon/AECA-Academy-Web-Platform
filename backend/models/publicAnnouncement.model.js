// models/publicAnnouncement.model.js
import mongoose from 'mongoose';

const publicAnnouncementSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.model('PublicAnnouncement', publicAnnouncementSchema);
