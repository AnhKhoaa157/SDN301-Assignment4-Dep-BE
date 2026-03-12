const express = require('express');
const router = express.Router();
const {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getAllQuizzes)
  .post(protect, authorize('admin'), createQuiz);

router.route('/:id')
  .get(getQuiz)
  .put(protect, authorize('admin'), updateQuiz)
  .delete(protect, authorize('admin'), deleteQuiz);

module.exports = router;
