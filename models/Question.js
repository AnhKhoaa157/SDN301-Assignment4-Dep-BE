const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: [true, 'Please provide quiz ID']
  },
  questionText: {
    type: String,
    required: [true, 'Please provide question text'],
    trim: true
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'true-false'],
    default: 'multiple-choice'
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  explanation: {
    type: String,
    default: ''
  },
  points: {
    type: Number,
    default: 1,
    min: 1
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure at least one correct answer
questionSchema.pre('save', function(next) {
  const hasCorrectAnswer = this.options.some(opt => opt.isCorrect);
  if (!hasCorrectAnswer) {
    return next(new Error('Question must have at least one correct answer'));
  }
  next();
});

module.exports = mongoose.model('Question', questionSchema);
