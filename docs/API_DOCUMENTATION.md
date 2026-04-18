# API Documentation

## Student Management Portal REST API

Base URL: `http://localhost:3001/api` (Development)  
Production: `https://your-domain.com/api`

**Interactive Documentation**: Visit `/api/docs` for Swagger UI

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Token Refresh

Access tokens expire in 15 minutes. Use the refresh token to get a new access token.

## API Endpoints

### Authentication Endpoints

#### 1. Register User

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password@123",
  "role": "STUDENT"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "STUDENT",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2. Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "admin@smp.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "admin@smp.com",
    "role": "ADMIN",
    "profile": null
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### 3. Refresh Token

```http
POST /api/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### 4. Logout

```http
POST /api/auth/logout
🔒 Requires Authentication
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### 5. Change Password

```http
POST /api/auth/change-password
🔒 Requires Authentication
```

**Request Body:**
```json
{
  "oldPassword": "OldPassword@123",
  "newPassword": "NewPassword@123"
}
```

#### 6. Forgot Password

```http
POST /api/auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### 7. Reset Password

```http
POST /api/auth/reset-password
```

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "NewPassword@123"
}
```

---

### Student Endpoints

#### 1. Get All Students

```http
GET /api/students?page=1&limit=10&search=john&classId=uuid
🔒 Requires Authentication (ADMIN, TEACHER)
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by name or enrollment number
- `classId` (optional): Filter by class ID

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "enrollmentNo": "BCA20240001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "gender": "MALE",
      "phone": "+91-9876543210",
      "class": {
        "id": "uuid",
        "name": "BCA Third Year",
        "section": "A"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### 2. Get Student by ID

```http
GET /api/students/:id
🔒 Requires Authentication
```

**Response:**
```json
{
  "id": "uuid",
  "enrollmentNo": "BCA20240001",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2003-01-15T00:00:00.000Z",
  "gender": "MALE",
  "phone": "+91-9876543210",
  "email": "john@example.com",
  "address": "123 Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "parentName": "Parent Name",
  "parentPhone": "+91-9876543211",
  "bloodGroup": "O+",
  "class": {
    "id": "uuid",
    "name": "BCA Third Year",
    "section": "A",
    "course": {
      "name": "Bachelor of Computer Applications"
    }
  },
  "marks": [],
  "attendance": []
}
```

#### 3. Create Student

```http
POST /api/students
🔒 Requires Authentication (ADMIN only)
```

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "Student@123",
  "enrollmentNo": "BCA20240001",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2003-01-15",
  "gender": "MALE",
  "phone": "+91-9876543210",
  "address": "123 Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "parentName": "Parent Name",
  "parentPhone": "+91-9876543211",
  "parentEmail": "parent@example.com",
  "bloodGroup": "O+",
  "classId": "uuid"
}
```

#### 4. Update Student

```http
PATCH /api/students/:id
🔒 Requires Authentication (ADMIN only)
```

**Request Body:** (All fields optional)
```json
{
  "firstName": "Updated Name",
  "phone": "+91-9876543299",
  "classId": "new-class-uuid"
}
```

#### 5. Delete Student

```http
DELETE /api/students/:id
🔒 Requires Authentication (ADMIN only)
```

---

### Teacher Endpoints

#### 1. Get All Teachers

```http
GET /api/teachers?page=1&limit=10
🔒 Requires Authentication (ADMIN)
```

#### 2. Create Teacher

```http
POST /api/teachers
🔒 Requires Authentication (ADMIN only)
```

**Request Body:**
```json
{
  "email": "teacher@example.com",
  "password": "Teacher@123",
  "employeeId": "T001",
  "firstName": "Jane",
  "lastName": "Smith",
  "dateOfBirth": "1990-05-20",
  "gender": "FEMALE",
  "phone": "+91-9876543210",
  "address": "456 Avenue",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400002",
  "qualification": "M.Tech",
  "experience": 5,
  "joiningDate": "2020-08-01"
}
```

---

### Marks Endpoints

#### 1. Get Marks

```http
GET /api/marks?studentId=uuid&subjectId=uuid&semester=3
🔒 Requires Authentication
```

**Query Parameters:**
- `studentId` (optional): Filter by student
- `subjectId` (optional): Filter by subject
- `semester` (optional): Filter by semester
- `examType` (optional): Filter by exam type

#### 2. Create Marks

```http
POST /api/marks
🔒 Requires Authentication (TEACHER only)
```

**Request Body:**
```json
{
  "studentId": "uuid",
  "subjectId": "uuid",
  "examType": "Mid-Term",
  "totalMarks": 50,
  "obtainedMarks": 45,
  "grade": "A",
  "remarks": "Excellent performance",
  "academicYear": "2024-25",
  "semester": 3
}
```

---

### Attendance Endpoints

#### 1. Get Attendance

```http
GET /api/attendance?studentId=uuid&classId=uuid&date=2024-01-01
🔒 Requires Authentication
```

#### 2. Mark Attendance

```http
POST /api/attendance
🔒 Requires Authentication (TEACHER only)
```

**Request Body:**
```json
{
  "studentId": "uuid",
  "classId": "uuid",
  "date": "2024-01-01",
  "status": "PRESENT",
  "remarks": "On time"
}
```

**Status values:** `PRESENT`, `ABSENT`, `LATE`, `EXCUSED`

---

### Assignment Endpoints

#### 1. Get Assignments

```http
GET /api/assignments?subjectId=uuid
🔒 Requires Authentication
```

#### 2. Create Assignment

```http
POST /api/assignments
🔒 Requires Authentication (TEACHER only)
```

**Request Body:**
```json
{
  "title": "Data Structures Project",
  "description": "Implement Binary Search Tree",
  "dueDate": "2024-12-31",
  "totalMarks": 20,
  "subjectId": "uuid",
  "attachments": []
}
```

#### 3. Submit Assignment

```http
POST /api/assignments/:id/submit
🔒 Requires Authentication (STUDENT only)
```

**Request Body:**
```json
{
  "remarks": "Completed assignment",
  "attachments": ["file1.pdf", "file2.pdf"]
}
```

---

### Announcement Endpoints

#### 1. Get Announcements

```http
GET /api/announcements
🔒 Requires Authentication
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Important Notice",
      "content": "Classes will be held online tomorrow",
      "priority": "high",
      "targetRole": "STUDENT",
      "teacher": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "expiresAt": "2024-12-31T23:59:59.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2. Create Announcement

```http
POST /api/announcements
🔒 Requires Authentication (TEACHER, ADMIN)
```

**Request Body:**
```json
{
  "title": "Important Notice",
  "content": "Classes will be held online tomorrow",
  "priority": "high",
  "targetRole": "STUDENT",
  "expiresAt": "2024-12-31",
  "attachments": []
}
```

---

### Course & Subject Endpoints

#### 1. Get Courses

```http
GET /api/courses
🔒 Requires Authentication
```

#### 2. Create Course

```http
POST /api/courses
🔒 Requires Authentication (ADMIN only)
```

**Request Body:**
```json
{
  "name": "Bachelor of Computer Applications",
  "code": "BCA",
  "description": "Three year undergraduate program",
  "duration": 6
}
```

#### 3. Get Subjects

```http
GET /api/subjects?courseId=uuid&semester=3
🔒 Requires Authentication
```

---

### Reports Endpoints

#### 1. Get Student Report

```http
GET /api/reports/student/:studentId
🔒 Requires Authentication (ADMIN, TEACHER, Student themselves)
```

**Response:**
```json
{
  "student": {
    "enrollmentNo": "BCA20240001",
    "name": "John Doe",
    "class": "BCA Third Year A"
  },
  "attendance": {
    "total": 100,
    "present": 90,
    "absent": 8,
    "late": 2,
    "percentage": 90
  },
  "marks": [
    {
      "subject": "Data Structures",
      "examType": "Mid-Term",
      "obtained": 45,
      "total": 50,
      "percentage": 90,
      "grade": "A+"
    }
  ],
  "overallPerformance": {
    "totalMarks": 500,
    "obtainedMarks": 450,
    "percentage": 90,
    "grade": "A+",
    "rank": 2
  }
}
```

---

## Error Responses

### Standard Error Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### Common HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Header**: `X-RateLimit-Remaining`

---

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response Format:**
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

## Filtering & Searching

Many endpoints support filtering via query parameters:

```http
GET /api/students?search=john&classId=uuid&page=1&limit=10
```

---

## File Uploads

File upload endpoints accept `multipart/form-data`:

```http
POST /api/materials/upload
Content-Type: multipart/form-data

file: [binary]
title: "Lecture Notes"
subjectId: "uuid"
```

**Supported formats:** PDF, DOC, DOCX, PPT, PPTX  
**Max file size:** 5MB

---

## WebSocket Events (Future Enhancement)

```javascript
// Connect to WebSocket
const socket = io('ws://localhost:3001');

// Listen for new announcements
socket.on('announcement:new', (data) => {
  console.log('New announcement:', data);
});

// Listen for grade updates
socket.on('marks:updated', (data) => {
  console.log('Marks updated:', data);
});
```

---

## SDK / Client Libraries

### JavaScript/TypeScript

```typescript
import apiClient from './lib/api-client';

// Login
const { data } = await apiClient.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});

// Get students
const students = await apiClient.get('/students', {
  params: { page: 1, limit: 10 }
});
```

---

## Postman Collection

Import the API collection: [Download Postman Collection](./postman_collection.json)

---

**For detailed implementation examples, see the `/docs/examples` directory.**
