const express = require('express');
const router = express.Router();
const {
  getAllOrchids,
  getOrchid,
  createOrchid,
  updateOrchid,
  deleteOrchid
} = require('../controllers/orchidController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getAllOrchids)
  .post(protect, authorize('admin'), createOrchid);

router.route('/:id')
  .get(getOrchid)
  .put(protect, authorize('admin'), updateOrchid)
  .delete(protect, authorize('admin'), deleteOrchid);

module.exports = router;
