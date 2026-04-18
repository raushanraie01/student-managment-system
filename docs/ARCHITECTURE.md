# System Architecture Diagram

## Student Management Portal - Architecture Documentation

### 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                         STUDENT MANAGEMENT PORTAL                            │
│                          SYSTEM ARCHITECTURE                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │
│  │   Desktop    │    │   Tablet     │    │   Mobile     │                 │
│  │   Browser    │    │   Browser    │    │   Browser    │                 │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘                 │
│         │                   │                    │                          │
│         └───────────────────┴────────────────────┘                          │
│                             │                                                │
│                    HTTPS / TLS 1.3                                          │
│                             │                                                │
└─────────────────────────────┼────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                                       │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Next.js 14 Frontend Application                   │    │
│  │                         (Vercel Deployment)                          │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                       │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │    │
│  │  │   Pages      │  │ Components   │  │    Layouts   │             │    │
│  │  │              │  │              │  │              │             │    │
│  │  │ • Login      │  │ • Navbar     │  │ • Dashboard  │             │    │
│  │  │ • Dashboard  │  │ • Sidebar    │  │ • Auth       │             │    │
│  │  │ • Students   │  │ • DataTable  │  │ • Admin      │             │    │
│  │  │ • Teachers   │  │ • Forms      │  │ • Teacher    │             │    │
│  │  │ • Marks      │  │ • Charts     │  │ • Student    │             │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘             │    │
│  │                                                                       │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │              State Management (Zustand)                       │  │    │
│  │  │  • Auth Store    • User Store    • UI Store                  │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  │                                                                       │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │              HTTP Client (Axios)                             │  │    │
│  │  │  • Request Interceptor (Add JWT Token)                       │  │    │
│  │  │  • Response Interceptor (Handle 401, Refresh Token)          │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  │                                                                       │    │
│  └───────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└───────────────────────────────┬───────────────────────────────────────────────┘
                                │
                    REST API (JSON over HTTPS)
                    JWT Bearer Authentication
                                │
┌───────────────────────────────▼───────────────────────────────────────────────┐
│                       APPLICATION LAYER                                        │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐    │
│  │              NestJS Backend Application                              │    │
│  │              (Render / Railway Deployment)                           │    │
│  ├──────────────────────────────────────────────────────────────────────┤    │
│  │                                                                        │    │
│  │  ┌────────────────────────────────────────────────────────────────┐  │    │
│  │  │                    API Gateway Layer                           │  │    │
│  │  │                                                                 │  │    │
│  │  │  • CORS Configuration                                          │  │    │
│  │  │  • Rate Limiting                                               │  │    │
│  │  │  • Request Validation (class-validator)                        │  │    │
│  │  │  • Global Exception Filter                                     │  │    │
│  │  │  • Swagger Documentation (/api/docs)                           │  │    │
│  │  │                                                                 │  │    │
│  │  └────────────────────────────────────────────────────────────────┘  │    │
│  │                                                                        │    │
│  │  ┌────────────────────────────────────────────────────────────────┐  │    │
│  │  │              Authentication & Authorization                     │  │    │
│  │  │                                                                 │  │    │
│  │  │  ┌──────────────────────┐  ┌──────────────────────┐           │  │    │
│  │  │  │   JWT Auth Guard     │  │   Roles Guard        │           │  │    │
│  │  │  │  • Validate Token    │  │  • Check User Role   │           │  │    │
│  │  │  │  • Extract User      │  │  • RBAC Logic        │           │  │    │
│  │  │  └──────────────────────┘  └──────────────────────┘           │  │    │
│  │  │                                                                 │  │    │
│  │  │  ┌─────────────────────────────────────────────────────────┐  │  │    │
│  │  │  │            Passport Strategies                          │  │  │    │
│  │  │  │  • JWT Strategy (Access Token)                          │  │  │    │
│  │  │  │  • JWT Refresh Strategy                                 │  │  │    │
│  │  │  └─────────────────────────────────────────────────────────┘  │  │    │
│  │  │                                                                 │  │    │
│  │  └────────────────────────────────────────────────────────────────┘  │    │
│  │                                                                        │    │
│  │  ┌────────────────────────────────────────────────────────────────┐  │    │
│  │  │                 Business Logic Layer                           │  │    │
│  │  │                                                                 │  │    │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │  │    │
│  │  │  │   Auth      │  │  Students   │  │  Teachers   │           │  │    │
│  │  │  │   Module    │  │   Module    │  │   Module    │           │  │    │
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘           │  │    │
│  │  │                                                                 │  │    │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │  │    │
│  │  │  │   Marks     │  │ Attendance  │  │ Assignments │           │  │    │
│  │  │  │   Module    │  │   Module    │  │   Module    │           │  │    │
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘           │  │    │
│  │  │                                                                 │  │    │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │  │    │
│  │  │  │Announcements│  │  Materials  │  │   Reports   │           │  │    │
│  │  │  │   Module    │  │   Module    │  │   Module    │           │  │    │
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘           │  │    │
│  │  │                                                                 │  │    │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │  │    │
│  │  │  │    Mail     │  │ ActivityLog │  │   Courses   │           │  │    │
│  │  │  │   Module    │  │   Module    │  │   Module    │           │  │    │
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘           │  │    │
│  │  │                                                                 │  │    │
│  │  │  Each Module Contains:                                         │  │    │
│  │  │  • Controller (HTTP Routes)                                    │  │    │
│  │  │  • Service (Business Logic)                                    │  │    │
│  │  │  • DTOs (Data Transfer Objects)                                │  │    │
│  │  │  • Validators (Input Validation)                               │  │    │
│  │  │                                                                 │  │    │
│  │  └────────────────────────────────────────────────────────────────┘  │    │
│  │                                                                        │    │
│  │  ┌────────────────────────────────────────────────────────────────┐  │    │
│  │  │              Data Access Layer (Prisma ORM)                     │  │    │
│  │  │                                                                 │  │    │
│  │  │  • PrismaService (Singleton)                                   │  │    │
│  │  │  • Type-safe Database Queries                                  │  │    │
│  │  │  • Transaction Management                                      │  │    │
│  │  │  • Connection Pooling                                          │  │    │
│  │  │  • Migration Management                                        │  │    │
│  │  │                                                                 │  │    │
│  │  └────────────────────────────────────────────────────────────────┘  │    │
│  │                                                                        │    │
│  └────────────────────────────────────────────────────────────────────────┘    │
│                                                                                │
└────────────────────────────────┬───────────────────────────────────────────────┘
                                 │
                      SQL Queries / TCP Connection
                                 │
┌────────────────────────────────▼───────────────────────────────────────────────┐
│                          DATA LAYER                                            │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐    │
│  │            PostgreSQL Database (Neon / Supabase)                     │    │
│  ├──────────────────────────────────────────────────────────────────────┤    │
│  │                                                                        │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │    │
│  │  │     User       │  │    Student     │  │    Teacher     │         │    │
│  │  │    Schema      │  │     Schema     │  │     Schema     │         │    │
│  │  └────────────────┘  └────────────────┘  └────────────────┘         │    │
│  │                                                                        │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │    │
│  │  │    Course      │  │    Subject     │  │     Class      │         │    │
│  │  │    Schema      │  │     Schema     │  │     Schema     │         │    │
│  │  └────────────────┘  └────────────────┘  └────────────────┘         │    │
│  │                                                                        │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │    │
│  │  │     Mark       │  │   Attendance   │  │   Assignment   │         │    │
│  │  │    Schema      │  │     Schema     │  │     Schema     │         │    │
│  │  └────────────────┘  └────────────────┘  └────────────────┘         │    │
│  │                                                                        │    │
│  │  ┌────────────────────────────────────────────────────────────────┐  │    │
│  │  │              Database Features                                 │  │    │
│  │  │  • ACID Transactions                                           │  │    │
│  │  │  • Foreign Key Constraints                                     │  │    │
│  │  │  • Indexes (B-Tree, Unique)                                    │  │    │
│  │  │  • Full-Text Search                                            │  │    │
│  │  │  • Connection Pooling                                          │  │    │
│  │  │  • Automated Backups                                           │  │    │
│  │  └────────────────────────────────────────────────────────────────┘  │    │
│  │                                                                        │    │
│  └────────────────────────────────────────────────────────────────────────┘    │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                       EXTERNAL SERVICES                                         │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐        │
│  │  Email Service   │    │  File Storage    │    │   Monitoring     │        │
│  │                  │    │                  │    │                  │        │
│  │  • SMTP Server   │    │  • AWS S3        │    │  • Error Tracking│        │
│  │  • Nodemailer    │    │  • Cloudinary    │    │  • Performance   │        │
│  │  • Templates     │    │  • Local Storage │    │  • Logs          │        │
│  └──────────────────┘    └──────────────────┘    └──────────────────┘        │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

### 2. Authentication Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                       AUTHENTICATION FLOW                                     │
└──────────────────────────────────────────────────────────────────────────────┘

  ┌─────────┐                ┌──────────┐                ┌──────────┐
  │ Client  │                │  Backend │                │ Database │
  └────┬────┘                └─────┬────┘                └─────┬────┘
       │                           │                           │
       │  1. POST /auth/login      │                           │
       │  (email, password)        │                           │
       │──────────────────────────>│                           │
       │                           │                           │
       │                           │  2. Find user by email    │
       │                           │──────────────────────────>│
       │                           │                           │
       │                           │  3. Return user data      │
       │                           │<──────────────────────────│
       │                           │                           │
       │                           │  4. Validate password     │
       │                           │     (bcrypt.compare)      │
       │                           │                           │
       │                           │  5. Create refresh token  │
       │                           │──────────────────────────>│
       │                           │                           │
       │                           │  6. Store refresh token   │
       │                           │<──────────────────────────│
       │                           │                           │
       │                           │  7. Generate JWT tokens   │
       │                           │     • Access Token (15min)│
       │                           │     • Refresh Token (7d)  │
       │                           │                           │
       │  8. Response              │                           │
       │  {                        │                           │
       │    accessToken,           │                           │
       │    refreshToken,          │                           │
       │    user { ... }           │                           │
       │  }                        │                           │
       │<──────────────────────────│                           │
       │                           │                           │
       │  9. Store tokens          │                           │
       │     (localStorage)        │                           │
       │                           │                           │
       │  10. Subsequent requests  │                           │
       │  Authorization: Bearer    │                           │
       │  <accessToken>            │                           │
       │──────────────────────────>│                           │
       │                           │                           │
       │                           │  11. Validate token       │
       │                           │      (JWT strategy)       │
       │                           │                           │
       │  12. Response with data   │                           │
       │<──────────────────────────│                           │
       │                           │                           │
       │  13. Access token expired │                           │
       │  401 Unauthorized         │                           │
       │<──────────────────────────│                           │
       │                           │                           │
       │  14. POST /auth/refresh   │                           │
       │  (refreshToken)           │                           │
       │──────────────────────────>│                           │
       │                           │                           │
       │                           │  15. Validate refresh     │
       │                           │      token                │
       │                           │──────────────────────────>│
       │                           │                           │
       │                           │  16. Check if valid       │
       │                           │<──────────────────────────│
       │                           │                           │
       │                           │  17. Generate new tokens  │
       │                           │                           │
       │  18. New tokens           │                           │
       │<──────────────────────────│                           │
       │                           │                           │
       │  19. Retry original       │                           │
       │      request              │                           │
       │──────────────────────────>│                           │
       │                           │                           │
       │  20. Success response     │                           │
       │<──────────────────────────│                           │
       │                           │                           │
  ┌────▼────┐                ┌─────▼────┐                ┌─────▼────┐
  │ Client  │                │  Backend │                │ Database │
  └─────────┘                └──────────┘                └──────────┘
```

### 3. Request/Response Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     API REQUEST/RESPONSE FLOW                                 │
└──────────────────────────────────────────────────────────────────────────────┘

  Client                   Frontend               Backend               Database
    │                         │                      │                      │
    │  User Action            │                      │                      │
    │────────────────────────>│                      │                      │
    │                         │                      │                      │
    │                         │  API Call (Axios)    │                      │
    │                         │─────────────────────>│                      │
    │                         │                      │                      │
    │                         │                      │  1. CORS Check       │
    │                         │                      │                      │
    │                         │                      │  2. Rate Limiting    │
    │                         │                      │                      │
    │                         │                      │  3. JWT Guard        │
    │                         │                      │                      │
    │                         │                      │  4. Roles Guard      │
    │                         │                      │                      │
    │                         │                      │  5. Validation       │
    │                         │                      │     (class-validator)│
    │                         │                      │                      │
    │                         │                      │  6. Controller       │
    │                         │                      │                      │
    │                         │                      │  7. Service          │
    │                         │                      │                      │
    │                         │                      │  8. Prisma Query     │
    │                         │                      │─────────────────────>│
    │                         │                      │                      │
    │                         │                      │  9. Result Set       │
    │                         │                      │<─────────────────────│
    │                         │                      │                      │
    │                         │                      │  10. Transform Data  │
    │                         │                      │                      │
    │                         │                      │  11. Activity Log    │
    │                         │                      │─────────────────────>│
    │                         │                      │                      │
    │                         │  12. JSON Response   │                      │
    │                         │<─────────────────────│                      │
    │                         │                      │                      │
    │                         │  13. Update State    │                      │
    │                         │      (Zustand)       │                      │
    │                         │                      │                      │
    │  14. UI Update          │                      │                      │
    │<────────────────────────│                      │                      │
    │                         │                      │                      │
```

### 4. Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT ARCHITECTURE                                │
└──────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                       │
└────────────────┬──────────────────────┬────────────────────────────────────┘
                 │                      │
        DNS: smp.com              DNS: api.smp.com
                 │                      │
┌────────────────▼──────────┐  ┌────────▼──────────────────────────────────┐
│      Vercel CDN            │  │      Render / Railway                      │
│  ┌──────────────────────┐  │  │  ┌──────────────────────────────────┐    │
│  │  Frontend Static     │  │  │  │   Docker Container               │    │
│  │  Assets              │  │  │  │  ┌────────────────────────────┐  │    │
│  │  • HTML/CSS/JS       │  │  │  │  │  NestJS Application       │  │    │
│  │  • Images            │  │  │  │  │  • Node.js 20             │  │    │
│  │  • Fonts             │  │  │  │  │  • Environment Variables   │  │    │
│  └──────────────────────┘  │  │  │  │  • Health Checks          │  │    │
│                             │  │  │  └────────────────────────────┘  │    │
│  ┌──────────────────────┐  │  │  │                                  │    │
│  │  Next.js SSR         │  │  │  │  ┌────────────────────────────┐  │    │
│  │  • Server Functions  │  │  │  │  │  Monitoring                │  │    │
│  │  • API Routes        │  │  │  │  │  • Logs                    │  │    │
│  │  • Edge Functions    │  │  │  │  │  • Metrics                 │  │    │
│  └──────────────────────┘  │  │  │  │  • Alerts                  │  │    │
│                             │  │  │  └────────────────────────────┘  │    │
│  ┌──────────────────────┐  │  │  └──────────────────────────────────┘    │
│  │  Auto Scaling        │  │  │                                           │
│  │  • Edge Network      │  │  │  ┌──────────────────────────────────┐    │
│  │  • Load Balancing    │  │  │  │  Auto Scaling                    │    │
│  └──────────────────────┘  │  │  │  • Horizontal Scaling            │    │
└─────────────────────────────┘  │  │  • Load Balancing                │    │
                                 │  └──────────────────────────────────┘    │
                                 └──────────────────┬───────────────────────┘
                                                    │
                                          PostgreSQL Connection
                                                    │
                                 ┌──────────────────▼───────────────────────┐
                                 │      Neon / Supabase PostgreSQL          │
                                 │  ┌────────────────────────────────────┐  │
                                 │  │  Database Cluster                  │  │
                                 │  │  • Primary Instance                │  │
                                 │  │  • Read Replicas                   │  │
                                 │  │  • Connection Pooling (PgBouncer)  │  │
                                 │  └────────────────────────────────────┘  │
                                 │                                           │
                                 │  ┌────────────────────────────────────┐  │
                                 │  │  Automated Backups                 │  │
                                 │  │  • Daily Backups                   │  │
                                 │  │  • Point-in-time Recovery          │  │
                                 │  │  • 7-day Retention                 │  │
                                 │  └────────────────────────────────────┘  │
                                 │                                           │
                                 │  ┌────────────────────────────────────┐  │
                                 │  │  High Availability                 │  │
                                 │  │  • 99.95% Uptime SLA               │  │
                                 │  │  • Automatic Failover              │  │
                                 │  └────────────────────────────────────┘  │
                                 └───────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL INTEGRATIONS                               │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                │
│  │   SMTP       │    │  File Store  │    │  Monitoring  │                │
│  │  (Gmail)     │    │   (S3/CDN)   │    │  (Sentry)    │                │
│  └──────────────┘    └──────────────┘    └──────────────┘                │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### 5. Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                          DATA FLOW DIAGRAM                                    │
└──────────────────────────────────────────────────────────────────────────────┘

Level 0: Context Diagram
─────────────────────────

                    ┌─────────────────────────┐
                    │        Student          │
                    └────────┬────────────────┘
                             │
                    View Marks, Submit Assignment
                             │
             ┌───────────────▼────────────────┐
             │                                │
    ┌────────┤  Student Management System     ├────────┐
    │        │                                │        │
    │        └───────────────▲────────────────┘        │
    │                        │                         │
  Manage                 Post Announcements,       View Reports,
  Students              Enter Marks, Mark          Manage Users
    │                    Attendance                    │
    │                        │                         │
┌───▼──────────┐    ┌────────┴───────────┐    ┌──────▼────────┐
│   Admin      │    │      Teacher       │    │   Database    │
└──────────────┘    └────────────────────┘    └───────────────┘


Level 1: Process Diagram
─────────────────────────

┌────────────┐  Login         ┌──────────────┐
│   User     │───────────────>│   1.0        │
│            │                │ Authenticate │
│            │<───────────────│   User       │
└────────────┘   JWT Token    └──────────────┘
                                      │
                              ┌───────┴────────┐
                              │                │
                      ┌───────▼────────┐  ┌────▼──────────┐
                      │     2.0        │  │     3.0       │
                      │  Manage        │  │  Manage       │
                      │  Students      │  │  Teachers     │
                      └───────┬────────┘  └────┬──────────┘
                              │                │
                       ┌──────┴────────────────┴──────┐
                       │                               │
              ┌────────▼────────┐           ┌─────────▼────────┐
              │      4.0        │           │       5.0        │
              │   Manage        │           │    Manage        │
              │   Marks         │           │   Attendance     │
              └────────┬────────┘           └─────────┬────────┘
                       │                              │
                       └──────────┬───────────────────┘
                                  │
                          ┌───────▼────────┐
                          │      6.0       │
                          │   Generate     │
                          │   Reports      │
                          └───────┬────────┘
                                  │
                          ┌───────▼────────┐
                          │   Database     │
                          └────────────────┘
```

### 6. Component Interaction Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    COMPONENT INTERACTION DIAGRAM                              │
└──────────────────────────────────────────────────────────────────────────────┘

Frontend Components                    Backend Modules
───────────────────                    ───────────────

┌─────────────────┐                    ┌─────────────────┐
│  Login Page     │───POST /login─────>│  Auth Module    │
└─────────────────┘                    └─────────────────┘
                                              │
┌─────────────────┐                           │
│  Dashboard      │                           │
│  • Admin        │<──────────────────────────┘
│  • Teacher      │
│  • Student      │
└────────┬────────┘
         │
    ┌────┴────────────────────────────────┐
    │                                     │
┌───▼───────────┐                    ┌────▼──────────┐
│ Students List │                    │ Teachers List │
└───┬───────────┘                    └────┬──────────┘
    │                                     │
    │ GET /students                       │ GET /teachers
    │                                     │
    ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│ Students Module │                  │ Teachers Module │
│  • Controller   │                  │  • Controller   │
│  • Service      │                  │  • Service      │
│  • DTOs         │                  │  • DTOs         │
└────────┬────────┘                  └────────┬────────┘
         │                                    │
         ▼                                    ▼
    ┌─────────────────────────────────────────┐
    │          Prisma Service                  │
    │  • findMany()                           │
    │  • findUnique()                         │
    │  • create()                             │
    │  • update()                             │
    │  • delete()                             │
    └─────────────┬───────────────────────────┘
                  │
                  ▼
         ┌────────────────┐
         │   PostgreSQL   │
         │    Database    │
         └────────────────┘


Cross-Cutting Concerns
──────────────────────

┌─────────────────────────────────────────────────────────────┐
│                    Middleware Stack                          │
│                                                              │
│  Request                                                     │
│    │                                                         │
│    ▼                                                         │
│  ┌──────────────┐                                           │
│  │ CORS Handler │                                           │
│  └──────┬───────┘                                           │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │Rate Limiter  │                                           │
│  └──────┬───────┘                                           │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │  JWT Guard   │────────Error────> Global Exception Filter│
│  └──────┬───────┘                                           │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ Roles Guard  │                                           │
│  └──────┬───────┘                                           │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │  Validation  │                                           │
│  └──────┬───────┘                                           │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │  Controller  │                                           │
│  └──────┬───────┘                                           │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │Activity Log  │                                           │
│  └──────┬───────┘                                           │
│         ▼                                                    │
│  Response                                                    │
└─────────────────────────────────────────────────────────────┘
```

### 7. Database Schema Visualization

```
For detailed database schema, see ER_DIAGRAM.md
```

---

## Technology Decisions

### Frontend Technology Choices

**Next.js 14 (App Router)**
- ✅ Server-side rendering for better SEO
- ✅ File-based routing
- ✅ Built-in optimizations
- ✅ TypeScript support
- ✅ Easy deployment to Vercel

**TailwindCSS**
- ✅ Utility-first CSS
- ✅ Responsive design
- ✅ Small bundle size
- ✅ Easy customization

**Zustand**
- ✅ Lightweight state management
- ✅ Simple API
- ✅ No boilerplate
- ✅ TypeScript support

### Backend Technology Choices

**NestJS**
- ✅ TypeScript-first
- ✅ Modular architecture
- ✅ Built-in dependency injection
- ✅ Extensive documentation
- ✅ Enterprise-ready

**Prisma ORM**
- ✅ Type-safe database client
- ✅ Auto-generated types
- ✅ Migration management
- ✅ Excellent DX (Developer Experience)

**PostgreSQL**
- ✅ ACID compliant
- ✅ Advanced features (JSON, Full-text search)
- ✅ Excellent performance
- ✅ Strong community

### DevOps Choices

**Docker**
- ✅ Consistent environments
- ✅ Easy deployment
- ✅ Portability

**GitHub Actions**
- ✅ Integrated with GitHub
- ✅ Free for public repos
- ✅ Easy configuration

---

## Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Load balancing across multiple instances
- Database connection pooling
- CDN for static assets

### Vertical Scaling
- Increase server resources as needed
- Database optimization
- Query optimization
- Caching strategies (Redis)

### Performance Optimizations
- Database indexing
- Query optimization
- Lazy loading
- Code splitting
- Image optimization
- Gzip compression

---

## Security Measures

### Authentication & Authorization
- JWT with short-lived access tokens
- Refresh token rotation
- Role-based access control (RBAC)
- Password hashing (bcrypt)

### Data Protection
- HTTPS only
- SQL injection prevention (Prisma)
- XSS protection
- CSRF tokens
- Rate limiting
- Input validation

### Infrastructure Security
- Environment variables for secrets
- Regular dependency updates
- Security headers (Helmet.js)
- Database backups
- Activity logging

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Maintained By**: Development Team
