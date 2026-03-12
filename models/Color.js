const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide color name'],
    unique: true,
    trim: true
  },
  hexCode: {
    type: String,
    default: '#000000'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Color', colorSchema);
