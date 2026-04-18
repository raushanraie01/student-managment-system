# Student Management Portal

> **Complete Full-Stack Web Application for Educational Institutions**  
> Final Year BCA Project - Production-Grade Implementation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The **Student Management Portal** is a comprehensive, production-ready full-stack web application designed to streamline educational institution management. Built with modern technologies and industry best practices, it provides role-based access control for Administrators, Teachers, and Students.

### Key Highlights

- ✅ **Full-Stack TypeScript** - End-to-end type safety
- ✅ **Role-Based Access Control** - Admin, Teacher, Student roles
- ✅ **RESTful API** - Clean, documented API with Swagger/OpenAPI
- ✅ **Real-time Updates** - Dynamic data management
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Secure Authentication** - JWT with refresh tokens
- ✅ **Production Ready** - Docker, CI/CD, monitoring
- ✅ **Well Documented** - Complete API and user documentation

## 🎯 Features

### For Administrators

- 👥 **User Management** - Create, update, delete users (students, teachers)
- 📚 **Course Management** - Manage courses, subjects, and classes
- 📊 **Analytics Dashboard** - View attendance trends, performance metrics
- 📝 **Reports Generation** - Generate PDF reports for students
- 🔔 **Announcements** - Broadcast important notices
- 📈 **Activity Logs** - Track all system activities

### For Teachers

- 📝 **Mark Management** - Upload and manage student marks
- ✅ **Attendance Tracking** - Record and manage attendance
- 📚 **Assignment Management** - Create and grade assignments
- 📄 **Material Upload** - Share study materials (PDFs, documents)
- 💬 **Announcements** - Post class/subject announcements
- 📊 **Performance Analytics** - View student performance trends

### For Students

- 📊 **Dashboard** - Personalized dashboard with key metrics
- 📋 **View Marks** - Access grades and examination results
- ✅ **Attendance Records** - View attendance history
- 📚 **Assignments** - View and submit assignments
- 📥 **Download Materials** - Access study materials
- 🆔 **ID Card Generation** - Download digital ID card
- 📢 **View Announcements** - Stay updated with notices

## 🛠 Technology Stack

### Backend

- **Runtime**: Node.js 20+
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **Authentication**: JWT (Access + Refresh Tokens)
- **Validation**: class-validator, Zod
- **Documentation**: Swagger/OpenAPI
- **Email**: Nodemailer
- **PDF Generation**: PDFKit
- **File Upload**: Multer

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React

### DevOps & Tools

- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky + Commitlint
- **Testing**: Jest, Supertest
- **Deployment**: Vercel (Frontend), Render/Railway (Backend)

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Next.js 14 (React + TypeScript + TailwindCSS)      │   │
│  │  - Admin Dashboard                                    │   │
│  │  - Teacher Dashboard                                  │   │
│  │  - Student Dashboard                                  │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS/REST API
                         │ JWT Authentication
┌────────────────────────▼────────────────────────────────────┐
│                     API Gateway Layer                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          NestJS Application Server                   │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Auth Module │ Guards │ Interceptors         │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Business Logic Modules                      │  │   │
│  │  │  - Students   - Teachers   - Courses         │  │   │
│  │  │  - Marks      - Attendance - Assignments     │  │   │
│  │  │  - Announcements - Materials - Reports       │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ Prisma ORM
┌────────────────────────▼────────────────────────────────────┐
│                     Data Layer                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PostgreSQL Database                     │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Tables: users, students, teachers,          │  │   │
│  │  │  courses, subjects, classes, marks,          │  │   │
│  │  │  attendance, assignments, announcements      │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Installation

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 16
- Docker & Docker Compose (optional)

### Method 1: Local Development Setup

#### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd StudentManagement
\`\`\`

#### 2. Install Dependencies

\`\`\`bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

#### 3. Set Up Environment Variables

\`\`\`bash
# Copy example environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
\`\`\`

**Backend (.env)**:
\`\`\`env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/student_management"
JWT_ACCESS_SECRET="your-super-secret-access-key-min-32-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-chars"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_USER="your-email@gmail.com"
MAIL_PASSWORD="your-app-password"
NODE_ENV="development"
PORT=3001
FRONTEND_URL="http://localhost:3000"
\`\`\`

**Frontend (.env.local)**:
\`\`\`env
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
\`\`\`

#### 4. Set Up Database

\`\`\`bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database with sample data
npm run prisma:seed
\`\`\`

#### 5. Start Development Servers

\`\`\`bash
# From root directory - runs both backend and frontend
npm run dev

# Or separately:
# Backend (http://localhost:3001)
cd backend && npm run start:dev

# Frontend (http://localhost:3000)
cd frontend && npm run dev
\`\`\`

### Method 2: Docker Setup

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
\`\`\`

## ⚙️ Configuration

### Database Configuration

The application uses PostgreSQL. Configure the connection string in `backend/.env`:

\`\`\`env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
\`\`\`

### Email Configuration

For password reset and notifications, configure email settings:

\`\`\`env
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_USER="your-email@gmail.com"
MAIL_PASSWORD="your-app-password"  # Use App Password for Gmail
\`\`\`

### JWT Configuration

Generate strong secrets for JWT tokens:

\`\`\`bash
# Generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

## 🚀 Usage

### Default Credentials

After seeding the database, use these credentials:

| Role     | Email                 | Password     |
|----------|-----------------------|--------------|
| Admin    | admin@smp.com         | Admin@123    |
| Teacher  | john.doe@smp.com      | Teacher@123  |
| Student  | student1@smp.com      | Student@123  |

### Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Documentation**: http://localhost:3001/api/docs
- **Prisma Studio**: `npm run prisma:studio` (from backend folder)

### Common Tasks

\`\`\`bash
# Run tests
npm run test

# Run linter
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Start production build
npm start
\`\`\`

## 📚 API Documentation

### Interactive API Docs

Access the Swagger UI documentation at:
- **Development**: http://localhost:3001/api/docs
- **Production**: https://your-api-domain.com/api/docs

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

#### Students (Admin/Teacher)
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student (Admin only)
- `PATCH /api/students/:id` - Update student (Admin only)
- `DELETE /api/students/:id` - Delete student (Admin only)

#### Teachers (Admin)
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create teacher
- `PATCH /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

#### Marks (Teacher/Student)
- `GET /api/marks` - Get marks
- `POST /api/marks` - Create marks (Teacher only)
- `PATCH /api/marks/:id` - Update marks (Teacher only)

#### Attendance (Teacher/Student)
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance (Teacher only)

#### Assignments
- `GET /api/assignments` - Get assignments
- `POST /api/assignments` - Create assignment (Teacher only)
- `POST /api/assignments/:id/submit` - Submit assignment (Student)

For complete API reference, see [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)

## 🌐 Deployment

### Frontend Deployment (Vercel)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
\`\`\`

### Backend Deployment (Render/Railway)

#### Using Render

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd backend && npm install && npx prisma generate && npm run build`
   - **Start Command**: `cd backend && npm run start:prod`
4. Add environment variables
5. Add PostgreSQL database
6. Deploy

#### Using Railway

\`\`\`bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
\`\`\`

### Database Deployment

**Option 1: Neon DB (Recommended)**
- Create account at https://neon.tech
- Create new project
- Copy connection string
- Update `DATABASE_URL` in environment variables

**Option 2: Supabase**
- Create project at https://supabase.com
- Get PostgreSQL connection string
- Update environment variables

### Environment Variables for Production

Ensure all environment variables are set in production:

\`\`\`env
NODE_ENV=production
DATABASE_URL=<production-database-url>
JWT_ACCESS_SECRET=<production-secret>
JWT_REFRESH_SECRET=<production-secret>
FRONTEND_URL=<production-frontend-url>
MAIL_HOST=<email-host>
MAIL_USER=<email-user>
MAIL_PASSWORD=<email-password>
\`\`\`

## 📁 Project Structure

\`\`\`
StudentManagement/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.ts                # Database seeder
│   ├── src/
│   │   ├── auth/                  # Authentication module
│   │   ├── users/                 # Users module
│   │   ├── students/              # Students module
│   │   ├── teachers/              # Teachers module
│   │   ├── courses/               # Courses module
│   │   ├── subjects/              # Subjects module
│   │   ├── classes/               # Classes module
│   │   ├── marks/                 # Marks module
│   │   ├── attendance/            # Attendance module
│   │   ├── assignments/           # Assignments module
│   │   ├── announcements/         # Announcements module
│   │   ├── materials/             # Materials module
│   │   ├── reports/               # Reports module
│   │   ├── mail/                  # Email service
│   │   ├── activity-logs/         # Activity logging
│   │   ├── prisma/                # Prisma service
│   │   ├── app.module.ts          # Root module
│   │   └── main.ts                # Application entry
│   ├── test/                      # Tests
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/                   # Next.js App Router
│   │   │   ├── (auth)/            # Auth pages
│   │   │   ├── admin/             # Admin dashboard
│   │   │   ├── teacher/           # Teacher dashboard
│   │   │   ├── student/           # Student dashboard
│   │   │   └── layout.tsx
│   │   ├── components/            # React components
│   │   │   ├── ui/                # shadcn/ui components
│   │   │   ├── layouts/           # Layout components
│   │   │   └── features/          # Feature components
│   │   ├── lib/                   # Utilities
│   │   │   ├── api.ts             # API client
│   │   │   ├── api-client.ts      # Axios instance
│   │   │   └── utils.ts           # Helper functions
│   │   └── store/                 # Zustand stores
│   │       └── auth.ts            # Auth store
│   ├── public/                    # Static files
│   ├── package.json
│   └── tailwind.config.js
├── docs/                          # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── ER_DIAGRAM.md
│   ├── ARCHITECTURE.md
│   └── PROJECT_REPORT.md
├── .github/
│   └── workflows/
│       └── ci.yml                 # CI/CD pipeline
├── docker-compose.yml             # Docker configuration
├── .env.example                   # Environment template
├── package.json                   # Root package.json
└── README.md                      # This file
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build/tooling changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

**Final Year BCA Project Team**

## 🙏 Acknowledgments

- NestJS Team for the amazing framework
- Next.js Team for the powerful React framework
- Prisma Team for the excellent ORM
- shadcn for the beautiful UI components
- All open-source contributors

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Mobile Application (React Native)
- [ ] Real-time Chat System
- [ ] Video Conferencing Integration
- [ ] Advanced Analytics Dashboard
- [ ] Multi-language Support
- [ ] Dark Mode Enhancement
- [ ] Export to Excel/PDF
- [ ] Push Notifications
- [ ] Fee Management Module
- [ ] Library Management Module

---

**Made with ❤️ for Educational Excellence**
#   s t u d e n t - m a n a g m e n t - s y s t e m  
 