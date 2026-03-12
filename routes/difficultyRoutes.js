const express = require('express');
const router = express.Router();
const {
  getAllDifficulties,
  createDifficulty,
  updateDifficulty,
  deleteDifficulty
} = require('../controllers/difficultyController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getAllDifficulties)
  .post(protect, authorize('admin'), createDifficulty);

router.route('/:id')
  .put(protect, authorize('admin'), updateDifficulty)
  .delete(protect, authorize('admin'), deleteDifficulty);

module.exports = router;
