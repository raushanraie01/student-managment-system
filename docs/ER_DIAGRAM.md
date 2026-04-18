# Entity-Relationship Diagram

## Student Management Portal Database Schema

### Overview

The database consists of 15 main entities with various relationships to manage students, teachers, courses, attendance, marks, and other academic activities.

## Database Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          STUDENT MANAGEMENT SYSTEM                           │
│                            DATABASE ER DIAGRAM                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│     User     │         │   Student    │         │   Teacher    │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)      │────┐    │ id (PK)      │    ┌───│ id (PK)      │
│ email        │    │    │ userId (FK)  │────┘   │ userId (FK)  │────┐
│ password     │    │    │ enrollmentNo │        │ employeeId   │    │
│ role (ENUM)  │    │    │ firstName    │        │ firstName    │    │
│ isActive     │    │    │ lastName     │        │ lastName     │    │
│ createdAt    │    │    │ dateOfBirth  │        │ dateOfBirth  │    │
│ updatedAt    │    │    │ gender       │        │ gender       │    │
└──────────────┘    │    │ phone        │        │ phone        │    │
      │             │    │ address      │        │ qualification│    │
      │             │    │ city         │        │ experience   │    │
      │             │    │ state        │        │ joiningDate  │    │
      │             │    │ pincode      │        └──────────────┘    │
      │             └────│ parentName   │              │             │
      │                  │ parentPhone  │              │             │
      │                  │ bloodGroup   │              │             │
      │                  │ classId (FK) │──┐           │             │
      │                  │ createdAt    │  │           │             │
      │                  │ updatedAt    │  │           │             │
      │                  └──────────────┘  │           │             │
      │                         │          │           │             │
      │                         │          │           │             │
      ▼                         ▼          ▼           ▼             │
┌──────────────┐         ┌──────────────┐       ┌──────────────┐   │
│ActivityLog   │         │     Mark     │       │    Class     │   │
├──────────────┤         ├──────────────┤       ├──────────────┤   │
│ id (PK)      │         │ id (PK)      │       │ id (PK)      │   │
│ userId (FK)  │         │ studentId(FK)│       │ name         │   │
│ action       │         │ subjectId(FK)│       │ section      │   │
│ entity       │         │ teacherId(FK)│       │ semester     │   │
│ entityId     │         │ examType     │       │ academicYear │   │
│ description  │         │ totalMarks   │       │ courseId(FK) │───┐
│ ipAddress    │         │ obtainedMarks│       │ teacherId(FK)│   │
│ userAgent    │         │ grade        │       │ isActive     │   │
│ createdAt    │         │ remarks      │       │ createdAt    │   │
└──────────────┘         │ academicYear │       │ updatedAt    │   │
                         │ semester     │       └──────────────┘   │
                         │ createdAt    │             │            │
┌──────────────┐         │ updatedAt    │             │            │
│RefreshToken  │         └──────────────┘             │            │
├──────────────┤               │                      │            │
│ id (PK)      │               │                      │            │
│ userId (FK)  │               │                      │            │
│ token        │               └──────────┐           │            │
│ expiresAt    │                          │           │            │
│ createdAt    │                          │           │            │
└──────────────┘                          ▼           ▼            ▼
                                    ┌──────────────┐  ┌──────────────┐
                                    │   Subject    │  │   Course     │
                                    ├──────────────┤  ├──────────────┤
                                    │ id (PK)      │  │ id (PK)      │
                                    │ name         │  │ name         │
                                    │ code         │  │ code         │
                                    │ description  │  │ description  │
                                    │ credits      │  │ duration     │
                                    │ semester     │  │ isActive     │
                                    │ courseId(FK) │──│ createdAt    │
                                    │ teacherId(FK)│  │ updatedAt    │
                                    │ isActive     │  └──────────────┘
                                    │ createdAt    │
                                    │ updatedAt    │
                                    └──────────────┘
                                          │
                         ┌────────────────┴────────────────┐
                         ▼                                 ▼
                  ┌──────────────┐              ┌──────────────┐
                  │ Assignment   │              │  Material    │
                  ├──────────────┤              ├──────────────┤
                  │ id (PK)      │              │ id (PK)      │
                  │ title        │              │ title        │
                  │ description  │              │ description  │
                  │ dueDate      │              │ fileUrl      │
                  │ totalMarks   │              │ fileType     │
                  │ subjectId(FK)│              │ fileSize     │
                  │ teacherId(FK)│              │ subjectId(FK)│
                  │ attachments  │              │ createdAt    │
                  │ createdAt    │              │ updatedAt    │
                  │ updatedAt    │              └──────────────┘
                  └──────────────┘
                         │
                         ▼
            ┌──────────────────────┐
            │AssignmentSubmission  │
            ├──────────────────────┤
            │ id (PK)              │
            │ assignmentId (FK)    │
            │ studentId (FK)       │
            │ status (ENUM)        │
            │ submittedAt          │
            │ attachments          │
            │ remarks              │
            │ obtainedMarks        │
            │ feedback             │
            │ gradedAt             │
            │ createdAt            │
            │ updatedAt            │
            └──────────────────────┘

┌──────────────┐                    ┌──────────────┐
│ Attendance   │                    │Announcement  │
├──────────────┤                    ├──────────────┤
│ id (PK)      │                    │ id (PK)      │
│ studentId(FK)│                    │ title        │
│ classId (FK) │                    │ content      │
│ teacherId(FK)│                    │ priority     │
│ date         │                    │ targetRole   │
│ status (ENUM)│                    │ teacherId(FK)│
│ remarks      │                    │ expiresAt    │
│ createdAt    │                    │ attachments  │
│ updatedAt    │                    │ createdAt    │
└──────────────┘                    │ updatedAt    │
                                    └──────────────┘

┌──────────────┐
│  Timetable   │
├──────────────┤
│ id (PK)      │
│ classId (FK) │
│ dayOfWeek    │
│ startTime    │
│ endTime      │
│ subjectCode  │
│ room         │
│ createdAt    │
│ updatedAt    │
└──────────────┘
```

## Entity Descriptions

### Core Entities

#### 1. User
- **Purpose**: Authentication and authorization
- **Relationships**:
  - One-to-One with Student or Teacher
  - One-to-Many with ActivityLog
  - One-to-Many with RefreshToken

#### 2. Student
- **Purpose**: Store student information
- **Relationships**:
  - Many-to-One with User
  - Many-to-One with Class
  - One-to-Many with Mark
  - One-to-Many with Attendance
  - One-to-Many with AssignmentSubmission

#### 3. Teacher
- **Purpose**: Store teacher information
- **Relationships**:
  - Many-to-One with User
  - One-to-Many with Subject
  - One-to-Many with Class (as class teacher)
  - One-to-Many with Mark
  - One-to-Many with Attendance
  - One-to-Many with Assignment
  - One-to-Many with Announcement

### Academic Entities

#### 4. Course
- **Purpose**: Define degree programs
- **Relationships**:
  - One-to-Many with Subject
  - One-to-Many with Class

#### 5. Subject
- **Purpose**: Define subjects/courses within a program
- **Relationships**:
  - Many-to-One with Course
  - Many-to-One with Teacher
  - One-to-Many with Mark
  - One-to-Many with Assignment
  - One-to-Many with Material

#### 6. Class
- **Purpose**: Group students by semester/section
- **Relationships**:
  - Many-to-One with Course
  - Many-to-One with Teacher (class teacher)
  - One-to-Many with Student
  - One-to-Many with Attendance
  - One-to-Many with Timetable

### Academic Records

#### 7. Mark
- **Purpose**: Store examination marks/grades
- **Relationships**:
  - Many-to-One with Student
  - Many-to-One with Subject
  - Many-to-One with Teacher

#### 8. Attendance
- **Purpose**: Track student attendance
- **Relationships**:
  - Many-to-One with Student
  - Many-to-One with Class
  - Many-to-One with Teacher

#### 9. Assignment
- **Purpose**: Manage assignments
- **Relationships**:
  - Many-to-One with Subject
  - Many-to-One with Teacher
  - One-to-Many with AssignmentSubmission

#### 10. AssignmentSubmission
- **Purpose**: Track student assignment submissions
- **Relationships**:
  - Many-to-One with Assignment
  - Many-to-One with Student

### Communication & Resources

#### 11. Announcement
- **Purpose**: Broadcast notices and announcements
- **Relationships**:
  - Many-to-One with Teacher

#### 12. Material
- **Purpose**: Store study materials
- **Relationships**:
  - Many-to-One with Subject

#### 13. Timetable
- **Purpose**: Class schedules
- **Relationships**:
  - Many-to-One with Class

### System Entities

#### 14. ActivityLog
- **Purpose**: Audit trail of system activities
- **Relationships**:
  - Many-to-One with User

#### 15. RefreshToken
- **Purpose**: JWT token management
- **Relationships**:
  - Many-to-One with User

## Enumerations

### Role
```
ADMIN
TEACHER
STUDENT
```

### Gender
```
MALE
FEMALE
OTHER
```

### AttendanceStatus
```
PRESENT
ABSENT
LATE
EXCUSED
```

### AssignmentStatus
```
PENDING
SUBMITTED
GRADED
LATE
```

## Indexes

### Primary Keys
- All tables have `id` as UUID primary key

### Unique Constraints
- User: `email`
- Student: `enrollmentNo`, `userId`
- Teacher: `employeeId`, `userId`
- Course: `code`
- Subject: `code`
- Class: `courseId + section + semester + academicYear`
- Mark: `studentId + subjectId + examType + academicYear + semester`
- Attendance: `studentId + classId + date`
- AssignmentSubmission: `assignmentId + studentId`
- RefreshToken: `token`

### Foreign Key Constraints
- All foreign keys have `ON DELETE CASCADE` or `ON DELETE SET NULL` based on business logic

## Database Statistics (Sample Data)

| Entity | Estimated Rows |
|--------|---------------|
| Users | 500+ |
| Students | 400+ |
| Teachers | 50+ |
| Courses | 10+ |
| Subjects | 100+ |
| Classes | 30+ |
| Marks | 5000+ |
| Attendance | 10000+ |
| Assignments | 200+ |
| Announcements | 100+ |

## Cardinality

```
User          1:1         Student/Teacher
User          1:N         ActivityLog
User          1:N         RefreshToken
Student       N:1         Class
Student       1:N         Mark
Student       1:N         Attendance
Teacher       1:N         Subject
Teacher       1:N         Class
Course        1:N         Subject
Course        1:N         Class
Subject       1:N         Mark
Subject       1:N         Assignment
Subject       1:N         Material
Class         1:N         Student
Class         1:N         Attendance
Assignment    1:N         AssignmentSubmission
```

## Database Size Estimates

- **Development**: ~50 MB
- **Production (1000 students)**: ~500 MB - 1 GB
- **Production (5000 students)**: ~2 GB - 5 GB

---

**Note**: This ER diagram represents the logical structure. The actual physical implementation uses Prisma ORM with PostgreSQL.
