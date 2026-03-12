# 📚 Quiz Management System - Backend

Node.js/Express backend API for Quiz Management System.

## 🚀 Quick Start

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file** (copy from `.env.example`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/quiz_management
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   ```

3. **Start MongoDB** (if running locally)

4. **Seed database**:
   ```bash
   node seedData.js
   ```

5. **Run server**:
   ```bash
   npm start          # Production mode
   npm run dev        # Development mode (with nodemon)
   ```

Server will run at: `http://localhost:5000`

## 📁 Project Structure

```
Assignment_4_SDN_Back-End/
├── controllers/       # Request handlers
├── models/           # MongoDB schemas
├── routes/           # API routes
├── middleware/       # Auth middleware
├── server.js         # Entry point
├── seedData.js       # Database seeding
└── package.json      # Dependencies
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes` - Create quiz (admin)
- `PUT /api/quizzes/:id` - Update quiz (admin)
- `DELETE /api/quizzes/:id` - Delete quiz (admin)

### Questions
- `GET /api/questions` - Get all questions (admin)
- `GET /api/questions/quiz/:quizId` - Get questions by quiz
- `POST /api/questions` - Create question (admin)
- `PUT /api/questions/:id` - Update question (admin)
- `DELETE /api/questions/:id` - Delete question (admin)

### Subjects & Difficulties
- `GET /api/subjects` - Get all subjects
- `GET /api/difficulties` - Get all difficulties

## 🔐 Login Credentials

After running `seedData.js`:
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

## 🌐 Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for deployment instructions to Render.

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **dotenv** - Environment variables
