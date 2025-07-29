const Coursecategory = require('../models/Coursecategory'); // Your model file

// Create Coursecategory
exports.createCoursecategory = async (req, res) => {
  try {
    const newCoursecategory = await Coursecategory.create(req.body);
    res.json({ success: true, data: newCoursecategory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Coursecategorys
exports.getCoursecategorys = async (req, res) => {
  try {
    const Coursecategorys = await Coursecategory.findAll();
    res.json({ success: true, data: Coursecategorys });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get Coursecategory by ID
exports.getCoursecategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const coursecategory = await Coursecategory.findByPk(id); // Or custom method

    if (!coursecategory) {
      return res.status(404).json({
        message: "Coursecategory not found",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Coursecategory fetched successfully",
      data: coursecategory,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching Coursecategory:", error);
    res.status(400).json({
      message: "Error fetching Coursecategory by ID",
      error: error.message,
      success: false,
    });
  }
};

// Update Coursecategory
exports.updateCoursecategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Coursecategory first
    const coursecategory = await Coursecategory.findByPk(id);

    if (!coursecategory) {
      return res.status(404).json({
        success: false,
        message: "Coursecategory not found",
      });
    }

    // Update with request body
    await coursecategory.update(req.body);

    res.json({
      success: true,
      message: "Coursecategory updated successfully",
      data: coursecategory,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Coursecategory
exports.deleteCoursecategory = async (req, res) => {
  try {
    const { id } = req.params;

    const coursecategory = await Coursecategory.findByPk(id);
    if (!coursecategory) {
      return res.status(404).json({
        success: false,
        message: "Coursecategory not found",
      });
    }

    await coursecategory.destroy();

    res.json({
      success: true,
      message: "Coursecategory deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};