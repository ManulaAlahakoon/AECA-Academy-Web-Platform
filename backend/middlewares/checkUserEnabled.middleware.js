import User from "../models/user.model.js";

export const checkUserEnabled = async (req, res, next) => {
  try {
    // Ensure req.user contains the user ID
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Invalid user." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.isEnabled) {
      return res
        .status(403)
        .json({ message: "Your account has been disabled.Please contact Admin" });
    }

    next();
  } catch (error) {
    console.error("Error checking user enabled status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
