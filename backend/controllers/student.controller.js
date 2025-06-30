import LectureMaterial from "../models/lectureMaterial.model.js";

// student.controller.js
export const getLectureMaterialsForStudents = async (req, res) => {
  try {
    const { courseName } = req.params;

    const materials = await LectureMaterial.find({ course: courseName, isEnabled:true }).sort({ uploadedAt: -1 });
    console.log("Found materials for course:", courseName, materials);
    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Error fetching student materials:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

