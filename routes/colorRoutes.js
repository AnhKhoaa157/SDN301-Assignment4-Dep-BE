const express = require('express');
const router = express.Router();
const {
  getAllColors,
  createColor,
  updateColor,
  deleteColor
} = require('../controllers/colorController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getAllColors)
  .post(protect, authorize('admin'), createColor);

router.route('/:id')
  .put(protect, authorize('admin'), updateColor)
  .delete(protect, authorize('admin'), deleteColor);

module.exports = router;
