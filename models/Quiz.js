const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide quiz title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide quiz description'],
    trim: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Please provide subject']
  },
  difficulty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Difficulty',
    required: [true, 'Please provide difficulty level']
  },
  timeLimit: {
    type: Number, // in minutes
    default: 30
  },
  passingScore: {
    type: Number, // percentage
    default: 70,
    min: 0,
    max: 100
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

// Virtual for questions count
quizSchema.virtual('questionCount', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'quiz',
  count: true
});

// Update the updatedAt timestamp before saving
quizSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Quiz', quizSchema);
