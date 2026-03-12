const mongoose = require('mongoose');

const originSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide origin name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Origin', originSchema);
