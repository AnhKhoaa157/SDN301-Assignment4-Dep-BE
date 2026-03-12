const express = require('express');
const router = express.Router();
const {
  getAllQuestions,
  getQuestionsByQuiz,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questionController');
const { protect, authorize } = require('../middleware/auth');

// Admin: Get all questions
router.route('/')
  .get(protect, authorize('admin'), getAllQuestions)
  .post(protect, authorize('admin'), createQuestion);

// Get questions by quiz ID
router.route('/quiz/:quizId')
  .get(getQuestionsByQuiz);

// Single question operations
router.route('/:id')
  .get(getQuestion)
  .put(protect, authorize('admin'), updateQuestion)
  .delete(protect, authorize('admin'), deleteQuestion);

module.exports = router;
