const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');
const Subject = require('./models/Subject');
const Difficulty = require('./models/Difficulty');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Quiz.deleteMany({});
    await Question.deleteMany({});
    await Subject.deleteMany({});
    await Difficulty.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create Users
    const adminUser = await User.create({
      name: 'Admin User',
      username: 'admin',
      email: 'admin@quiz.com',
      password: 'admin123',
      role: 'admin'
    });

    const normalUser = await User.create({
      name: 'John Doe',
      username: 'user',
      email: 'user@quiz.com',
      password: 'user123',
      role: 'user'
    });

    console.log('✅ Created users');

    // Create Subjects
    const subjects = await Subject.insertMany([
      { name: 'JavaScript', description: 'Programming language for web development', icon: '💻' },
      { name: 'Python', description: 'General-purpose programming language', icon: '🐍' },
      { name: 'React', description: 'JavaScript library for building user interfaces', icon: '⚛️' },
      { name: 'Node.js', description: 'JavaScript runtime environment', icon: '🟢' },
      { name: 'MongoDB', description: 'NoSQL database', icon: '🍃' },
      { name: 'General Knowledge', description: 'General knowledge quiz', icon: '🌍' }
    ]);

    console.log('✅ Created subjects');

    // Create Difficulty Levels
    const difficulties = await Difficulty.insertMany([
      { name: 'Easy', level: 1, description: 'Beginner level', color: '#4CAF50' },
      { name: 'Medium', level: 2, description: 'Intermediate level', color: '#FF9800' },
      { name: 'Hard', level: 3, description: 'Advanced level', color: '#F44336' },
      { name: 'Expert', level: 4, description: 'Expert level', color: '#9C27B0' }
    ]);

    console.log('✅ Created difficulty levels');

    // Create Quizzes
    const quizzes = await Quiz.insertMany([
      {
        title: 'JavaScript Fundamentals',
        description: 'Test your knowledge of JavaScript basics including variables, data types, and functions',
        subject: subjects[0]._id,
        difficulty: difficulties[0]._id,
        timeLimit: 15,
        passingScore: 70,
        isPublished: true,
        createdBy: adminUser._id
      },
      {
        title: 'React Hooks Deep Dive',
        description: 'Advanced quiz on React Hooks including useState, useEffect, and custom hooks',
        subject: subjects[2]._id,
        difficulty: difficulties[2]._id,
        timeLimit: 25,
        passingScore: 75,
        isPublished: true,
        createdBy: adminUser._id
      },
      {
        title: 'Python Data Structures',
        description: 'Comprehensive quiz on Python lists, dictionaries, sets, and tuples',
        subject: subjects[1]._id,
        difficulty: difficulties[1]._id,
        timeLimit: 20,
        passingScore: 70,
        isPublished: true,
        createdBy: adminUser._id
      },
      {
        title: 'Node.js Fundamentals',
        description: 'Test your understanding of Node.js core concepts and modules',
        subject: subjects[3]._id,
        difficulty: difficulties[0]._id,
        timeLimit: 15,
        passingScore: 70,
        isPublished: true,
        createdBy: adminUser._id
      },
      {
        title: 'MongoDB Queries',
        description: 'Master MongoDB queries, aggregation, and indexing',
        subject: subjects[4]._id,
        difficulty: difficulties[2]._id,
        timeLimit: 30,
        passingScore: 75,
        isPublished: true,
        createdBy: adminUser._id
      }
    ]);

    console.log('✅ Created quizzes');

    // Create Questions for JavaScript Fundamentals Quiz
    const jsQuestions = await Question.insertMany([
      {
        quiz: quizzes[0]._id,
        questionText: 'What is the correct way to declare a variable in JavaScript?',
        questionType: 'multiple-choice',
        options: [
          { text: 'var myVar = 5;', isCorrect: true },
          { text: 'variable myVar = 5;', isCorrect: false },
          { text: 'v myVar = 5;', isCorrect: false },
          { text: 'declare myVar = 5;', isCorrect: false }
        ],
        explanation: 'JavaScript uses var, let, or const keywords to declare variables.',
        points: 1,
        order: 1
      },
      {
        quiz: quizzes[0]._id,
        questionText: 'Which of the following is NOT a JavaScript data type?',
        questionType: 'multiple-choice',
        options: [
          { text: 'String', isCorrect: false },
          { text: 'Boolean', isCorrect: false },
          { text: 'Float', isCorrect: true },
          { text: 'Undefined', isCorrect: false }
        ],
        explanation: 'JavaScript uses Number type for both integers and floating-point numbers.',
        points: 1,
        order: 2
      },
      {
        quiz: quizzes[0]._id,
        questionText: 'What does "===" operator do in JavaScript?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Assigns a value', isCorrect: false },
          { text: 'Compares values and types', isCorrect: true },
          { text: 'Compares only values', isCorrect: false },
          { text: 'Creates a variable', isCorrect: false }
        ],
        explanation: 'The === operator checks for both value and type equality (strict equality).',
        points: 1,
        order: 3
      },
      {
        quiz: quizzes[0]._id,
        questionText: 'Is JavaScript a case-sensitive language?',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        explanation: 'JavaScript is case-sensitive. "myVar" and "myvar" are different variables.',
        points: 1,
        order: 4
      },
      {
        quiz: quizzes[0]._id,
        questionText: 'Which keyword is used to create a function in JavaScript?',
        questionType: 'multiple-choice',
        options: [
          { text: 'func', isCorrect: false },
          { text: 'function', isCorrect: true },
          { text: 'def', isCorrect: false },
          { text: 'method', isCorrect: false }
        ],
        explanation: 'The "function" keyword is used to define functions in JavaScript.',
        points: 1,
        order: 5
      }
    ]);

    // Create Questions for React Hooks Quiz
    const reactQuestions = await Question.insertMany([
      {
        quiz: quizzes[1]._id,
        questionText: 'What hook would you use to manage state in a functional component?',
        questionType: 'multiple-choice',
        options: [
          { text: 'useEffect', isCorrect: false },
          { text: 'useState', isCorrect: true },
          { text: 'useContext', isCorrect: false },
          { text: 'useReducer', isCorrect: false }
        ],
        explanation: 'useState is the primary hook for managing state in functional components.',
        points: 1,
        order: 1
      },
      {
        quiz: quizzes[1]._id,
        questionText: 'When does useEffect run by default?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Before render', isCorrect: false },
          { text: 'After every render', isCorrect: true },
          { text: 'Only on mount', isCorrect: false },
          { text: 'Never', isCorrect: false }
        ],
        explanation: 'useEffect runs after every render by default, unless dependencies are specified.',
        points: 1,
        order: 2
      },
      {
        quiz: quizzes[1]._id,
        questionText: 'Can you call hooks conditionally?',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        explanation: 'Hooks must be called at the top level and cannot be conditional.',
        points: 1,
        order: 3
      }
    ]);

    // Create Questions for Python Quiz
    const pythonQuestions = await Question.insertMany([
      {
        quiz: quizzes[2]._id,
        questionText: 'Which data structure is mutable in Python?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Tuple', isCorrect: false },
          { text: 'String', isCorrect: false },
          { text: 'List', isCorrect: true },
          { text: 'Integer', isCorrect: false }
        ],
        explanation: 'Lists are mutable, meaning they can be modified after creation.',
        points: 1,
        order: 1
      },
      {
        quiz: quizzes[2]._id,
        questionText: 'What method adds an item to the end of a list?',
        questionType: 'multiple-choice',
        options: [
          { text: 'add()', isCorrect: false },
          { text: 'append()', isCorrect: true },
          { text: 'insert()', isCorrect: false },
          { text: 'push()', isCorrect: false }
        ],
        explanation: 'The append() method adds an element to the end of a list.',
        points: 1,
        order: 2
      }
    ]);

    console.log('✅ Created questions');
    console.log('\n🎉 Database seeded successfully!\n');
    console.log('Login credentials:');
    console.log('Admin: admin@quiz.com / admin123');
    console.log('User: user@quiz.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
