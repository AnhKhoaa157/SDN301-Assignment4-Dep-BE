const Origin = require('../models/Origin');

// @desc    Get all origins
// @route   GET /api/origins
// @access  Public
exports.getAllOrigins = async (req, res) => {
  try {
    const origins = await Origin.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: origins.length,
      data: origins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching origins',
      error: error.message
    });
  }
};

// @desc    Create origin
// @route   POST /api/origins
// @access  Private (Admin only)
exports.createOrigin = async (req, res) => {
  try {
    const origin = await Origin.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Origin created successfully',
      data: origin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating origin',
      error: error.message
    });
  }
};

// @desc    Update origin
// @route   PUT /api/origins/:id
// @access  Private (Admin only)
exports.updateOrigin = async (req, res) => {
  try {
    const origin = await Origin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!origin) {
      return res.status(404).json({
        success: false,
        message: 'Origin not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Origin updated successfully',
      data: origin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating origin',
      error: error.message
    });
  }
};

// @desc    Delete origin
// @route   DELETE /api/origins/:id
// @access  Private (Admin only)
exports.deleteOrigin = async (req, res) => {
  try {
    const origin = await Origin.findById(req.params.id);

    if (!origin) {
      return res.status(404).json({
        success: false,
        message: 'Origin not found'
      });
    }

    await origin.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Origin deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting origin',
      error: error.message
    });
  }
};
