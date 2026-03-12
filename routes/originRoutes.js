const express = require('express');
const router = express.Router();
const {
  getAllOrigins,
  createOrigin,
  updateOrigin,
  deleteOrigin
} = require('../controllers/originController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getAllOrigins)
  .post(protect, authorize('admin'), createOrigin);

router.route('/:id')
  .put(protect, authorize('admin'), updateOrigin)
  .delete(protect, authorize('admin'), deleteOrigin);

module.exports = router;
