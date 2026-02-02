# StackIt - Modern Q&A Platform 🚀

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Akash4701/OdooHackathon?style=for-the-badge&logo=github&color=yellow)
![GitHub forks](https://img.shields.io/github/forks/Akash4701/OdooHackathon?style=for-the-badge&logo=github&color=blue)
![GitHub issues](https://img.shields.io/github/issues/Akash4701/OdooHackathon?style=for-the-badge&logo=github&color=red)
![GitHub license](https://img.shields.io/github/license/Akash4701/OdooHackathon?style=for-the-badge&logo=github&color=green)
![GitHub last commit](https://img.shields.io/github/last-commit/Akash4701/OdooHackathon?style=for-the-badge&logo=github&color=orange)
![GitHub code size](https://img.shields.io/github/languages/code-size/Akash4701/OdooHackathon?style=for-the-badge&logo=github&color=purple)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)

**A modern, lightweight Q&A platform built for the Odoo Hackathon**

[Demo Video](#-project-demo) • [Features](#-features) • [Getting Started](#️-getting-started) • [Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Team Members](#-team-members)
- [Project Demo](#-project-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Future Roadmap](#-future-roadmap)
- [License](#-license)

---

## 🚀 Overview

**StackIt** is a lightweight, modern question-and-answer platform inspired by Stack Overflow, built during the Odoo Hackathon.  
It's designed for structured knowledge sharing, collaborative learning, and fostering a focused community around asking & answering questions.

### Why StackIt?

- 🎯 **Purpose-Built**: Focused on core Q&A functionality without unnecessary complexity
- 🚀 **Modern Stack**: Built with cutting-edge technologies for optimal performance
- 💡 **User-Centric**: Clean, intuitive interface with smooth animations and interactions
- 🔒 **Secure**: JWT-based authentication with bcrypt password hashing
- 📱 **Responsive**: Works seamlessly across desktop, tablet, and mobile devices
- ⚡ **Real-time Ready**: Socket.IO integration for future live features
- 🎨 **Beautiful UI**: Tailwind CSS with custom gradients and Framer Motion animations

Designed to be minimal yet powerful, StackIt keeps the core interactions simple, fast, and visually appealing while maintaining extensibility for future enhancements.

---

## 👥 Team Members

<table>
  <tr>
    <td align="center">
      <strong>Pritam Chakraborty</strong><br>
      📧 <a href="mailto:pc2617@it.jgec.ac.in">pc2617@it.jgec.ac.in</a>
    </td>
    <td align="center">
      <strong>Saikat Bera</strong><br>
      📧 <a href="mailto:berasaikat729@gmail.com">berasaikat729@gmail.com</a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Subhadro Samaddar</strong><br>
      📧 <a href="mailto:subhadrosamaddar@gmail.com">subhadrosamaddar@gmail.com</a>
    </td>
    <td align="center">
      <strong>🏆 Akash Saha (Team Leader)</strong><br>
      📧 <a href="mailto:saha.akash4701@gmail.com">saha.akash4701@gmail.com</a>
    </td>
  </tr>
</table>

---

## 🎥 Project Demo

▶️ **Watch our full walkthrough video on Loom:**  
[https://www.loom.com/share/6fac7964ec30438497afb8709da8bbc3?sid=2eb5b929-ce2f-4cdb-9850-9e78b62133c1](https://www.loom.com/share/6fac7964ec30438497afb8709da8bbc3?sid=2eb5b929-ce2f-4cdb-9850-9e78b62133c1)

### Key Highlights
- 🎯 User Authentication Flow
- 📝 Question Creation & Management
- 💬 Answer System with Rich Text Editor
- 🔍 Search & Filter Functionality
- 👍 Voting System
- 🔔 Notification System
- 🎨 Beautiful UI/UX Animations

---

## ✨ Features

### Core Features

✅ **JWT Authentication** — Secure signup & login with bcrypt password encryption  
✅ **Ask & Browse Questions** — Create detailed posts, view community queries  
✅ **Rich Text Editor** — TipTap editor with markdown support, code highlighting, images  
✅ **Answer System** — Post comprehensive answers with formatting support  
✅ **Search & Filters** — Easily find topics by title, tags, and content  
✅ **Voting System** — Upvote/downvote questions and answers  
✅ **Reputation System** — Earn reputation points based on community engagement  
✅ **Tags & Categories** — Organize questions with relevant tags  
✅ **User Profiles** — Track user reputation, questions, and answers  
✅ **Comments** — Add comments to questions and answers  
✅ **Notifications** — Real-time notification system for activities  
✅ **Badge System** — Earn badges (Gold, Silver, Bronze) for achievements  
✅ **Pagination** — Navigate large question sets smoothly  

### UI/UX Features

✨ **Sticky Navbar** — Keeps primary actions always accessible  
✨ **Floating Background Effects** — Beautiful animated gradients  
✨ **Framer Motion Animations** — Subtle entrance & hover effects  
✨ **Responsive Design** — Mobile-first approach with Tailwind CSS  
✨ **Dark Theme** — Modern dark theme for comfortable viewing  
✨ **Loading States** — Smooth loading indicators  
✨ **Error Handling** — User-friendly error messages with react-hot-toast  

### Technical Features

⚙️ **Socket.IO Integration** — Prepared for real-time features  
⚙️ **Prisma ORM** — Type-safe database queries with migrations  
⚙️ **TypeScript** — Full type safety across frontend and backend  
⚙️ **API Routes** — RESTful API design  
⚙️ **Middleware** — Authentication, authorization, and error handling  
⚙️ **Zod Validation** — Runtime type checking and validation  

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 19.1.0 |
| **TypeScript** | Type Safety | 5.8.3 |
| **Vite** | Build Tool | 7.0.4 |
| **TailwindCSS** | Styling | 4.1.11 |
| **Framer Motion** | Animations | 12.23.3 |
| **TipTap** | Rich Text Editor | 2.26.1 |
| **Axios** | HTTP Client | 1.10.0 |
| **React Router** | Routing | 7.6.3 |
| **Lucide React** | Icons | 0.525.0 |
| **React Hot Toast** | Notifications | 2.5.2 |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | Latest LTS |
| **Express** | Web Framework | 5.1.0 |
| **TypeScript** | Type Safety | 5.8.3 |
| **Prisma** | ORM | 6.11.1 |
| **PostgreSQL** | Database | Latest |
| **JWT** | Authentication | 9.0.2 |
| **Bcryptjs** | Password Hashing | 3.0.2 |
| **Socket.IO** | Real-time | 4.8.1 |
| **Zod** | Validation | 4.0.5 |
| **BullMQ** | Job Queue | 5.56.4 |
| **Redis** | Cache & Queue | via IORedis 5.6.1 |

---

## 🏗 Architecture

```
┌─────────────────┐
│   React SPA     │  ← Frontend (Vite + React + TypeScript)
│  (Port: 5173)   │
└────────┬────────┘
         │
         │ HTTP/HTTPS + WebSocket
         │
┌────────▼────────┐
│  Express API    │  ← Backend (Node.js + Express)
│  (Port: 8001)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──┐
│ Prisma│ │Redis│  ← Data Layer
│  ORM  │ │Queue│
└───┬───┘ └─────┘
    │
┌───▼────────┐
│ PostgreSQL │  ← Database
└────────────┘
```

### Key Components

1. **Frontend (React SPA)**
   - Single Page Application with React Router
   - Component-based architecture
   - State management with React hooks
   - API communication via Axios

2. **Backend (Express API)**
   - RESTful API endpoints
   - Middleware for auth, validation, error handling
   - Controller-based request handling
   - Socket.IO for real-time features

3. **Database (PostgreSQL + Prisma)**
   - Relational database with Prisma ORM
   - Type-safe database queries
   - Automated migrations

4. **Cache & Queue (Redis + BullMQ)**
   - Job queue for background tasks
   - Caching layer for performance

---

## ⚙️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)
- **Redis** (Optional, for queue features) - [Download](https://redis.io/download)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Akash4701/OdooHackathon.git
cd OdooHackathon
```

#### 2. Setup Backend

```bash
cd Backend
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma db push

# Optional: Seed sample data
npm run seed
```

#### 3. Setup Frontend

```bash
cd ../Frontend
npm install
```

### Running the Application

#### Start Backend Server

```bash
cd Backend
npm run dev
```

The backend server will start on [http://localhost:8001](http://localhost:8001)

#### Start Frontend Development Server

```bash
cd Frontend
npm run dev
```

The frontend will start on [http://localhost:5173](http://localhost:5173)

#### Access the Application

Open your browser and navigate to:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8001/api/v1](http://localhost:8001/api/v1)

---

## 📚 API Documentation

### Base URL

```
http://localhost:8001/api/v1
```

### Authentication Endpoints

#### Register a New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "reputation": 0
  }
}
```

### Question Endpoints

#### Get All Questions
```http
GET /question?page=1&limit=10
```

**Response:**
```json
{
  "data": [
    {
      "id": "question_id",
      "title": "How to use Prisma with PostgreSQL?",
      "description": "I'm having trouble...",
      "author": {
        "id": "user_id",
        "name": "John Doe",
        "reputation": 150
      },
      "tags": [
        {
          "id": "tag_id",
          "tag": {
            "name": "prisma"
          }
        }
      ],
      "answers": [],
      "votes": [],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

#### Create a Question
```http
POST /question
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "How to use Prisma with PostgreSQL?",
  "description": "I'm having trouble setting up...",
  "tags": ["prisma", "postgresql", "typescript"]
}
```

#### Get User's Questions
```http
GET /question/user?page=1&limit=10
Authorization: Bearer <token>
```

### Answer Endpoints

#### Post an Answer
```http
POST /answer/:questionId
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "<p>Here's how you can do it...</p>"
}
```

#### Get Answers for a Question
```http
GET /answer/:questionId
```

### Vote Endpoints

#### Vote on a Question
```http
POST /vote/question/:questionId
Authorization: Bearer <token>
Content-Type: application/json

{
  "value": 1  // 1 for upvote, -1 for downvote
}
```

#### Vote on an Answer
```http
POST /vote/answer/:answerId
Authorization: Bearer <token>
Content-Type: application/json

{
  "value": 1
}
```

### Notification Endpoints

#### Get User Notifications
```http
GET /notification
Authorization: Bearer <token>
```

#### Mark Notification as Read
```http
PATCH /notification/:notificationId/read
Authorization: Bearer <token>
```

---

## 🗄 Database Schema

### Core Models

#### User
```prisma
model User {
  id            String         @id @default(cuid())
  name          String
  email         String         @unique
  password      String
  role          Role           @default(USER)
  reputation    Int            @default(0)
  questions     Question[]
  answers       Answer[]
  comments      Comment[]
  votes         Vote[]
  badges        UserBadge[]
  notifications Notification[]
  createdAt     DateTime       @default(now())
}
```

#### Question
```prisma
model Question {
  id          String        @id @default(cuid())
  title       String
  description String
  author      User          @relation(fields: [authorId], references: [id])
  authorId    String
  answers     Answer[]
  tags        QuestionTag[]
  votes       Vote[]
  comments    Comment[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}
```

#### Answer
```prisma
model Answer {
  id         String    @id @default(cuid())
  content    String
  author     User      @relation(fields: [authorId], references: [id])
  authorId   String
  question   Question  @relation(fields: [questionId], references: [id])
  questionId String
  votes      Vote[]
  comments   Comment[]
  isAccepted Boolean   @default(false)
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}
```

### Relationships

- Users can create multiple Questions and Answers
- Questions can have multiple Answers, Comments, Tags, and Votes
- Answers can have multiple Comments and Votes
- Users earn reputation through Votes and accepted Answers
- Users can earn Badges for achievements

### Enums

```prisma
enum Role {
  USER
  ADMIN
}

enum NotificationType {
  QUESTION_CREATED
  ANSWER_CREATED
  COMMENT_CREATED
  MENTION
  BADGE_GRANTED
}

enum BadgeType {
  GOLD
  SILVER
  BRONZE
}
```

---

## 🌳 Project Structure

```
OdooHackathon/
│
├── Frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── editor/        # TipTap rich text editor
│   │   │   └── ...
│   │   ├── pages/             # Page components
│   │   │   ├── auth/          # Authentication pages
│   │   │   ├── common/        # Common pages (Navbar, etc.)
│   │   │   ├── Home.tsx       # Main questions list
│   │   │   └── ...
│   │   ├── apifetch/          # API integration utilities
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Entry point
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── package.json           # Dependencies
│   ├── tsconfig.json          # TypeScript config
│   └── vite.config.ts         # Vite configuration
│
├── Backend/                    # Express Backend API
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── question.create.controller.ts
│   │   │   ├── getQuestion.controller.ts
│   │   │   ├── answer.controller.ts
│   │   │   ├── voteController.ts
│   │   │   └── notification.controller.ts
│   │   ├── routes/            # API routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── questionRoutes.ts
│   │   │   ├── answerRoutes.ts
│   │   │   ├── voteRoutes.ts
│   │   │   ├── notificationRoutes.ts
│   │   │   └── index.ts
│   │   ├── middlewares/       # Express middlewares
│   │   │   └── authMiddleware.ts
│   │   ├── validation/        # Zod validation schemas
│   │   ├── lib/               # Utility libraries
│   │   │   └── db.config.ts   # Prisma client
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Helper functions
│   │   ├── app.ts             # Express app setup
│   │   └── index.ts           # Server entry point
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── package.json           # Dependencies
│   └── tsconfig.json          # TypeScript config
│
└── README.md                   # This file
```

---

## 🔐 Environment Variables

### Backend Environment (.env)

Create a `.env` file in the `Backend` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/stackit_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Server Configuration
PORT=8001
NODE_ENV=development

# Redis Configuration (Optional)
REDIS_URL="redis://localhost:6379"

# CORS Configuration
ALLOWED_ORIGINS="http://localhost:5173"
```

### Frontend Environment (Optional)

Create a `.env` file in the `Frontend` directory if needed:

```env
VITE_API_URL=http://localhost:8001/api/v1
```

### Security Notes

- ⚠️ **Never commit `.env` files to version control**
- 🔒 Use strong, unique values for `JWT_SECRET` in production
- 🔐 Use environment-specific credentials
- 🛡️ Enable HTTPS in production
- 🔑 Rotate secrets regularly

---

## 🚢 Deployment

### Deploying Backend

#### Option 1: Railway / Render

1. Create a new project on [Railway](https://railway.app/) or [Render](https://render.com/)
2. Connect your GitHub repository
3. Add environment variables
4. Set start command: `npm run dev` (for development) or `npm run build && npm start` (for production)
5. Add PostgreSQL database service
6. Deploy!

#### Option 2: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create stackit-backend

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Run migrations
heroku run npx prisma db push
```

### Deploying Frontend

#### Option 1: Vercel (Recommended for Vite)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd Frontend
vercel
```

#### Option 2: Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify](https://www.netlify.com/)
3. Or use Netlify CLI:

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Production Checklist

- [ ] Update `DATABASE_URL` with production database
- [ ] Set strong `JWT_SECRET`
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Set up Redis for production (if using queue features)
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Build frontend: `npm run build`
- [ ] Update API URLs in frontend

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error:** `Can't reach database server at localhost:5432`

**Solution:**
- Ensure PostgreSQL is running: `sudo service postgresql start` (Linux) or check pg_ctl status
- Verify DATABASE_URL in `.env` file
- Check if the database exists: `psql -U postgres -l`
- Create database if needed: `createdb stackit_db`

#### 2. Prisma Migration Issues

**Error:** `Migration failed` or `Schema out of sync`

**Solution:**
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Or push schema without migrations
npx prisma db push

# Regenerate Prisma Client
npx prisma generate
```

#### 3. Port Already in Use

**Error:** `Port 8001 is already in use`

**Solution:**
```bash
# Find process using the port
lsof -i :8001  # macOS/Linux
netstat -ano | findstr :8001  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in .env
PORT=8002
```

#### 4. JWT Token Errors

**Error:** `jwt malformed` or `invalid token`

**Solution:**
- Ensure you're sending token in Authorization header: `Bearer <token>`
- Verify JWT_SECRET matches between token generation and validation
- Check token expiration
- Clear browser localStorage and login again

#### 5. CORS Errors

**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**
- Add frontend URL to ALLOWED_ORIGINS in backend `.env`
- Ensure CORS is properly configured in `app.ts`
- Check if credentials are being sent correctly

#### 6. Build Errors

**Error:** TypeScript compilation errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache (Frontend)
rm -rf .vite

# Clear TypeScript cache
rm -rf dist
```

### Getting Help

If you encounter issues not listed here:

1. Check the [Issues](https://github.com/Akash4701/OdooHackathon/issues) page
2. Search for similar problems in Stack Overflow
3. Create a new issue with:
   - Detailed description
   - Error messages
   - Steps to reproduce
   - Environment (OS, Node version, etc.)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   gh repo fork Akash4701/OdooHackathon
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Test your changes thoroughly

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Amazing new feature"
   ```

   **Commit Message Convention:**
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Remove:` for removing features
   - `Refactor:` for code refactoring

5. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes in detail
   - Link any related issues

### Contribution Guidelines

- 📝 Follow TypeScript best practices
- 🎨 Use Tailwind CSS for styling
- ✅ Test your code before submitting
- 📚 Update documentation if needed
- 🔍 Ensure no console errors or warnings
- 💬 Be respectful and constructive in discussions

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage
- 🌍 Internationalization

---

## 🚀 Future Roadmap

### Phase 1 (Current)
- ✅ JWT Authentication
- ✅ Question & Answer System
- ✅ Voting & Reputation
- ✅ Tags & Search
- ✅ Rich Text Editor
- ✅ Notifications

### Phase 2 (In Progress)
- 📝 Markdown Support in Editor
- 🖼️ Image Upload in Posts
- 👤 Enhanced User Profiles
- 📊 User Activity Timeline
- 🔍 Advanced Search Filters
- 📱 Progressive Web App (PWA)

### Phase 3 (Planned)
- 🔔 Real-time Notifications with Socket.IO
- 💬 Live Chat System
- 🏆 Leaderboards
- 📈 Trending Tags & Questions
- 👥 Following System
- 🎯 Question Bounties
- 📧 Email Notifications
- 🔄 Question Edit History

### Phase 4 (Future)
- 🤖 AI-powered Question Recommendations
- 🎨 Custom Themes
- 📊 Analytics Dashboard
- 🌐 Multi-language Support
- 📱 Mobile Apps (React Native)
- 🔐 OAuth Integration (Google, GitHub)
- 🎓 Gamification Elements
- 📚 Documentation Wiki

### Ideas Welcome!

Have a feature idea? [Open an issue](https://github.com/Akash4701/OdooHackathon/issues/new) with the label `enhancement`!

---

## 📊 Project Statistics

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/Akash4701/OdooHackathon?style=flat-square)
![GitHub language count](https://img.shields.io/github/languages/count/Akash4701/OdooHackathon?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/Akash4701/OdooHackathon?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/Akash4701/OdooHackathon?style=flat-square)

</div>

---

## 🤝 License

This project is open-source under the **MIT License**.  
Feel free to fork, use, and contribute!

See [LICENSE](LICENSE) file for more details.

---

## 🙏 Acknowledgments

- 🏆 **Odoo Hackathon** - For providing the platform to build this project
- 💡 **Stack Overflow** - For inspiration
- 🎨 **TailwindCSS** - For the amazing utility-first CSS framework
- ⚡ **Vite** - For blazing fast build tool
- 🗃️ **Prisma** - For the incredible ORM
- 📝 **TipTap** - For the powerful rich text editor
- 🎭 **Framer Motion** - For beautiful animations

---

## 📞 Contact & Support

- 📧 Email: [saha.akash4701@gmail.com](mailto:saha.akash4701@gmail.com)
- 🐙 GitHub: [@Akash4701](https://github.com/Akash4701)
- 💬 Issues: [GitHub Issues](https://github.com/Akash4701/OdooHackathon/issues)

---

<div align="center">

### ⭐ Star us on GitHub — it motivates us a lot!

**Crafted with ❤️ by Pritam, Saikat, Subhadro & Akash**

*Bringing collaborative knowledge sharing to life with StackIt*

[⬆ Back to Top](#stackit---modern-qa-platform-)

</div>
