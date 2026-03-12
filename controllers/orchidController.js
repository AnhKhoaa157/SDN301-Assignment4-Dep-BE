const Orchid = require('../models/Orchid');

// @desc    Get all orchids
// @route   GET /api/orchids
// @access  Public
exports.getAllOrchids = async (req, res) => {
  try {
    const orchids = await Orchid.find()
      .populate('origin', 'name')
      .populate('category', 'name')
      .populate('color', 'name hexCode')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orchids.length,
      data: orchids
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orchids',
      error: error.message
    });
  }
};

// @desc    Get single orchid
// @route   GET /api/orchids/:id
// @access  Public
exports.getOrchid = async (req, res) => {
  try {
    const orchid = await Orchid.findById(req.params.id)
      .populate('origin', 'name description')
      .populate('category', 'name description')
      .populate('color', 'name hexCode')
      .populate('createdBy', 'name email');

    if (!orchid) {
      return res.status(404).json({
        success: false,
        message: 'Orchid not found'
      });
    }

    res.status(200).json({
      success: true,
      data: orchid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orchid',
      error: error.message
    });
  }
};

// @desc    Create orchid
// @route   POST /api/orchids
// @access  Private (Admin only)
exports.createOrchid = async (req, res) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const orchid = await Orchid.create(req.body);

    const populatedOrchid = await Orchid.findById(orchid._id)
      .populate('origin', 'name')
      .populate('category', 'name')
      .populate('color', 'name hexCode')
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Orchid created successfully',
      data: populatedOrchid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating orchid',
      error: error.message
    });
  }
};

// @desc    Update orchid
// @route   PUT /api/orchids/:id
// @access  Private (Admin only)
exports.updateOrchid = async (req, res) => {
  try {
    let orchid = await Orchid.findById(req.params.id);

    if (!orchid) {
      return res.status(404).json({
        success: false,
        message: 'Orchid not found'
      });
    }

    orchid = await Orchid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('origin', 'name')
      .populate('category', 'name')
      .populate('color', 'name hexCode')
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Orchid updated successfully',
      data: orchid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating orchid',
      error: error.message
    });
  }
};

// @desc    Delete orchid
// @route   DELETE /api/orchids/:id
// @access  Private (Admin only)
exports.deleteOrchid = async (req, res) => {
  try {
    const orchid = await Orchid.findById(req.params.id);

    if (!orchid) {
      return res.status(404).json({
        success: false,
        message: 'Orchid not found'
      });
    }

    await orchid.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Orchid deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting orchid',
      error: error.message
    });
  }
};
