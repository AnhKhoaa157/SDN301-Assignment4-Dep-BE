const Difficulty = require('../models/Difficulty');

// @desc    Get all difficulty levels
// @route   GET /api/difficulties
// @access  Public
exports.getAllDifficulties = async (req, res) => {
  try {
    const difficulties = await Difficulty.find().sort({ level: 1 });

    res.status(200).json({
      success: true,
      count: difficulties.length,
      data: difficulties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching difficulty levels',
      error: error.message
    });
  }
};

// @desc    Create difficulty level
// @route   POST /api/difficulties
// @access  Private (Admin only)
exports.createDifficulty = async (req, res) => {
  try {
    const difficulty = await Difficulty.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Difficulty level created successfully',
      data: difficulty
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating difficulty level',
      error: error.message
    });
  }
};

// @desc    Update difficulty level
// @route   PUT /api/difficulties/:id
// @access  Private (Admin only)
exports.updateDifficulty = async (req, res) => {
  try {
    const difficulty = await Difficulty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!difficulty) {
      return res.status(404).json({
        success: false,
        message: 'Difficulty level not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Difficulty level updated successfully',
      data: difficulty
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating difficulty level',
      error: error.message
    });
  }
};

// @desc    Delete difficulty level
// @route   DELETE /api/difficulties/:id
// @access  Private (Admin only)
exports.deleteDifficulty = async (req, res) => {
  try {
    const difficulty = await Difficulty.findById(req.params.id);

    if (!difficulty) {
      return res.status(404).json({
        success: false,
        message: 'Difficulty level not found'
      });
    }

    await difficulty.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Difficulty level deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting difficulty level',
      error: error.message
    });
  }
};
