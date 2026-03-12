const Color = require('../models/Color');

// @desc    Get all colors
// @route   GET /api/colors
// @access  Public
exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: colors.length,
      data: colors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching colors',
      error: error.message
    });
  }
};

// @desc    Create color
// @route   POST /api/colors
// @access  Private (Admin only)
exports.createColor = async (req, res) => {
  try {
    const color = await Color.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Color created successfully',
      data: color
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating color',
      error: error.message
    });
  }
};

// @desc    Update color
// @route   PUT /api/colors/:id
// @access  Private (Admin only)
exports.updateColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!color) {
      return res.status(404).json({
        success: false,
        message: 'Color not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Color updated successfully',
      data: color
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating color',
      error: error.message
    });
  }
};

// @desc    Delete color
// @route   DELETE /api/colors/:id
// @access  Private (Admin only)
exports.deleteColor = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);

    if (!color) {
      return res.status(404).json({
        success: false,
        message: 'Color not found'
      });
    }

    await color.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Color deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting color',
      error: error.message
    });
  }
};
