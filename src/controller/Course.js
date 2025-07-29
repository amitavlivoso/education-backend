const Course = require('../models/Course'); // Your model file

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.json({ success: true, data: newCourse });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json({ success: true, data: courses });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id); // Or custom method

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Course fetched successfully",
      data: course,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching Course:", error);
    res.status(400).json({
      message: "Error fetching Course by ID",
      error: error.message,
      success: false,
    });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Course first
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Update with request body
    await course.update(req.body);

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.destroy();

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};