import Course from '../models/course.model.js';
import User from '../models/user.model.js';

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { name, description, image, assignedTeacher } = req.body;

    if (!name || !assignedTeacher) {
      return res.status(400).json({ success: false, message: 'Name and assigned teacher are required' });
    }

    const teacher = await User.findById(assignedTeacher);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({ success: false, message: 'Invalid teacher ID' });
    }

    const newCourse = new Course({
      name,
      description,
      image,
      assignedTeacher
    });

    await newCourse.save();
    res.status(201).json({ success: true, message: 'Course created', course: newCourse });
  } catch (error) {
    console.error("Error in createCourse: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('assignedTeacher', 'name email')
      .populate('enrolledStudents', 'name email');
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error in getCourses: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, assignedTeacher, isEnabled } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (assignedTeacher) {
      const teacher = await User.findById(assignedTeacher);
      if (!teacher || teacher.role !== 'teacher') {
        return res.status(400).json({ success: false, message: 'Invalid teacher ID' });
      }
      course.assignedTeacher = assignedTeacher;
    }

    course.name = name ?? course.name;
    course.description = description ?? course.description;
    course.image = image ?? course.image;
    course.isEnabled = isEnabled ?? course.isEnabled;

    await course.save();
    res.status(200).json({ success: true, message: 'Course updated', course });
  } catch (error) {
    console.error("Error in updateCourse: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Toggle course enable/disable
export const toggleCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {    
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    course.isEnabled = !course.isEnabled;
    await course.save();
    res.status(200).json({ success: true, message: `Course ${course.isEnabled ? 'enabled' : 'disabled'}` });
  } catch (error) {
    console.error("Error in toggleCourse: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
