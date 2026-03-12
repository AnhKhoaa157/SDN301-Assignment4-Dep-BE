const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('subject', 'name icon')
      .populate('difficulty', 'name level color')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    // Add question count for each quiz
    const quizzesWithCount = await Promise.all(
      quizzes.map(async (quiz) => {
        const questionCount = await Question.countDocuments({ quiz: quiz._id });
        return {
          ...quiz.toObject(),
          questionCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: quizzesWithCount.length,
      data: quizzesWithCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quizzes',
      error: error.message
    });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('subject', 'name description icon')
      .populate('difficulty', 'name level description color')
      .populate('createdBy', 'name email');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const questionCount = await Question.countDocuments({ quiz: quiz._id });

    res.status(200).json({
      success: true,
      data: {
        ...quiz.toObject(),
        questionCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz',
      error: error.message
    });
  }
};

// @desc    Create quiz
// @route   POST /api/quizzes
// @access  Private (Admin only)
exports.createQuiz = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    const quiz = await Quiz.create(req.body);

    const populatedQuiz = await Quiz.findById(quiz._id)
      .populate('subject', 'name icon')
      .populate('difficulty', 'name level color')
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: populatedQuiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating quiz',
      error: error.message
    });
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Admin only)
exports.updateQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('subject', 'name icon')
      .populate('difficulty', 'name level color')
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Quiz updated successfully',
      data: quiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating quiz',
      error: error.message
    });
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Admin only)
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Delete all questions associated with this quiz
    await Question.deleteMany({ quiz: quiz._id });

    await quiz.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Quiz and associated questions deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting quiz',
      error: error.message
    });
  }
};
