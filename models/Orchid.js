const mongoose = require('mongoose');

const orchidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide orchid name'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Please provide image URL'],
    default: 'https://via.placeholder.com/300x300?text=Orchid'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  isNatural: {
    type: Boolean,
    default: true
  },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Origin',
    required: [true, 'Please provide origin']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide category']
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color',
    required: [true, 'Please provide color']
  },
  description: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
orchidSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Orchid', orchidSchema);
