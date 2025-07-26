const Assignment = require('../models/Assignment'); // Your model file

// Create Assignment
exports.createAssignment = async (req, res) => {
  try {
    const newAssignment = await Assignment.create(req.body);
    res.json({ success: true, data: newAssignment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.json({ success: true, data: assignments });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get Assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.getById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Assignment fetched successfully",
      data: assignment,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching assignment by ID",
      error: error.message,
      success: false,
    });
  }
};

// Update Assignment
exports.updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Assignment.updateById(id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    await Assignment.deleteById(id);
    res.json({ success: true, message: "Assignment deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
