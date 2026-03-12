const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ MongoDB connected');
  
  try {
    // Drop the username index if it exists
    await mongoose.connection.db.collection('users').dropIndex('username_1');
    console.log('✅ Dropped username_1 index');
  } catch (error) {
    if (error.codeName === 'IndexNotFound') {
      console.log('ℹ️  Index username_1 does not exist');
    } else {
      console.error('❌ Error dropping index:', error.message);
    }
  }
  
  mongoose.disconnect();
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
