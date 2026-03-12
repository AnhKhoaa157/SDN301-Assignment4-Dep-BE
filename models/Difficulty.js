const mongoose = require('mongoose');

const difficultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide difficulty level name'],
    unique: true,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  description: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#808080'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Difficulty', difficultySchema);
