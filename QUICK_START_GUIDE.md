# Quick Start Guide - Dashboard Pages

## 🚀 How to Access the New Dashboard Pages

### Prerequisites
- Backend running on `http://localhost:3001`
- Frontend running on `http://localhost:3002`
- Database seeded with test data

### Start Servers
```bash
cd /Users/6glab/Documents/GitHub/StudentManagement
./start-fresh.sh
```

This will:
- ✅ Stop all existing processes
- ✅ Start backend on port 3001
- ✅ Start frontend on port 3002

---

## 👤 Login & Navigate

### 1. Go to Login Page
```
http://localhost:3002/login
```

### 2. Login with Test Credentials

#### **For Admin Dashboard**
```
Email: admin@smp.com
Password: Admin@123
```

**Navigate to:**
- Dashboard: http://localhost:3002/admin/dashboard
- Students: http://localhost:3002/admin/students
- Teachers: http://localhost:3002/admin/teachers
- Courses: http://localhost:3002/admin/courses
- Reports: http://localhost:3002/admin/reports

#### **For Teacher Dashboard**
```
Email: john.doe@smp.com
Password: Teacher@123
```

**Navigate to:**
- Dashboard: http://localhost:3002/teacher/dashboard
- My Classes: http://localhost:3002/teacher/classes
- Marks: http://localhost:3002/teacher/marks
- Attendance: http://localhost:3002/teacher/attendance

#### **For Student Dashboard**
```
Email: student1@smp.com
Password: Student@123
```

**Also try: student2@smp.com, student3@smp.com, student4@smp.com, student5@smp.com**

**Navigate to:**
- Dashboard: http://localhost:3002/student/dashboard
- My Courses: http://localhost:3002/student/courses
- Marks: http://localhost:3002/student/marks
- Attendance: http://localhost:3002/student/attendance

---

## 📋 Feature Checklist

### Admin Features
- ✅ View all students with pagination
- ✅ Search students by name/email/enrollment
- ✅ Add/Edit/Delete students
- ✅ View all teachers with pagination
- ✅ Search teachers by name/ID
- ✅ Add/Edit/Delete teachers
- ✅ View all courses
- ✅ Add/Edit/Delete courses
- ✅ Generate reports with export option
- ✅ View system analytics

### Teacher Features
- ✅ View assigned classes
- ✅ Manage student marks
- ✅ Search and edit marks
- ✅ Mark student attendance
- ✅ View attendance records
- ✅ Add remarks to attendance

### Student Features
- ✅ View enrolled courses
- ✅ View detailed marks with grades
- ✅ Calculate GPA/Average
- ✅ Track attendance percentage
- ✅ View attendance status (Present/Absent/Late/Excused)

---

## 🔍 Testing Pages

### Admin Pages Testing

**1. Students Page** (`/admin/students`)
- [ ] Can see list of students
- [ ] Search functionality works
- [ ] Pagination works (next/previous buttons)
- [ ] Can click View/Edit/Delete dropdown
- [ ] Add Student button visible

**2. Teachers Page** (`/admin/teachers`)
- [ ] Can see list of teachers
- [ ] Search by name/employee ID works
- [ ] Actions dropdown functional
- [ ] Add Teacher button present

**3. Courses Page** (`/admin/courses`)
- [ ] All courses displayed
- [ ] Status badges show correctly (Active/Inactive)
- [ ] Search by code/name works
- [ ] Add Course button functional

**4. Reports Page** (`/admin/reports`)
- [ ] Three report tabs visible (Academic, Attendance, Admin)
- [ ] Report cards displayed with descriptions
- [ ] View and Export buttons present

### Student Pages Testing

**1. My Courses** (`/student/courses`)
- [ ] Enrolled courses visible
- [ ] Subject list shows with credits
- [ ] Course duration displayed
- [ ] View Details button working

**2. Marks** (`/student/marks`)
- [ ] Statistics cards show (Average, Total Exams, Highest, Lowest)
- [ ] Marks table displays all records
- [ ] Percentage calculated correctly
- [ ] Grades show with color coding

**3. Attendance** (`/student/attendance`)
- [ ] Attendance percentage shows with progress bar
- [ ] Status counts show (Present, Absent, Late, Excused)
- [ ] Attendance table shows records
- [ ] Dates formatted correctly

### Teacher Pages Testing

**1. My Classes** (`/teacher/classes`)
- [ ] Assigned classes visible
- [ ] Class details shown (name, section, semester)
- [ ] Student count displayed
- [ ] View Class button functional

**2. Marks** (`/teacher/marks`)
- [ ] All marks records visible
- [ ] Search functionality works
- [ ] Status badge shows (Entered/Pending)
- [ ] Edit button functional
- [ ] Add Marks button present

**3. Attendance** (`/teacher/attendance`)
- [ ] Attendance records displayed
- [ ] Search by student name works
- [ ] Status badges color-coded correctly
- [ ] Edit and Add buttons functional

---

## 🐛 Troubleshooting

### Page Shows "Site cannot be reached"
```bash
# Check if servers are running
lsof -i :3001  # Backend
lsof -i :3002  # Frontend

# Restart servers
./start-fresh.sh
```

### Login Not Working
- Clear browser cache: Ctrl+Shift+Delete (Chrome) or Cmd+Shift+Delete (Mac)
- Check credentials match test data
- Verify backend is running: http://localhost:3001/api/docs

### Data Not Displaying
- Check browser console for errors (F12)
- Verify API responses: http://localhost:3001/api/students
- Ensure JWT token is stored (check localStorage in DevTools)

### Pagination Not Working
- Verify API returns totalPages field
- Check pagination params in API calls
- Ensure limit=10 is being sent

---

## 📊 Data Visible in Each Page

### Students Page
```
✓ Total: 5 students
✓ Fields: Enrollment#, Name, Email, Phone, City, Class, Joined Date
✓ Search: By name, enrollment number, or email
✓ Pagination: 10 per page (you may see "Previous" disabled)
```

### Teachers Page
```
✓ Total: 1+ teachers
✓ Fields: Employee ID, Name, Phone, City, Qualification, Joined Date
✓ Search: By name or employee ID
✓ Pagination: 10 per page
```

### Courses Page
```
✓ Total: 1+ courses (BCA from seed)
✓ Fields: Code, Name, Description, Duration, Status, Created Date
✓ Search: By name or code
✓ Pagination: 10 per page
```

### Student - Marks Page
```
✓ Shows: All marks entered for the student
✓ Statistics: Average %, Total Exams, Highest Score, Lowest Score
✓ Table: Subject, Exam Type, Semester, Marks, Percentage, Grade, Remarks
```

### Student - Attendance Page
```
✓ Shows: Overall %, Present, Absent, Late, Excused counts
✓ Progress bar with attendance percentage
✓ Table: Date, Class, Status, Remarks
✓ Color coded: Green (Present), Red (Absent), Yellow (Late), Blue (Excused)
```

### Teacher - Classes Page
```
✓ Shows: All classes taught
✓ Fields: Name, Section, Semester, Course, Academic Year, Student Count
✓ Card layout for easy viewing
```

### Teacher - Marks Page
```
✓ Shows: All marks records
✓ Fields: Student, Subject, Exam Type, Marks, Grade, Status
✓ Status: "Entered" (marks filled) or "Pending" (no marks yet)
✓ Can edit each record
```

### Teacher - Attendance Page
```
✓ Shows: Attendance records marked by teacher
✓ Fields: Student, Date, Class, Status, Remarks
✓ Status: Present (green), Absent (red), Late (yellow), Excused (blue)
✓ Can edit attendance records
```

---

## 🔗 Important URLs

```
Homepage:           http://localhost:3002
Login:              http://localhost:3002/login

Admin Pages:        http://localhost:3002/admin/*
- Dashboard:        http://localhost:3002/admin/dashboard
- Students:         http://localhost:3002/admin/students
- Teachers:         http://localhost:3002/admin/teachers
- Courses:          http://localhost:3002/admin/courses
- Reports:          http://localhost:3002/admin/reports

Teacher Pages:      http://localhost:3002/teacher/*
- Dashboard:        http://localhost:3002/teacher/dashboard
- Classes:          http://localhost:3002/teacher/classes
- Marks:            http://localhost:3002/teacher/marks
- Attendance:       http://localhost:3002/teacher/attendance

Student Pages:      http://localhost:3002/student/*
- Dashboard:        http://localhost:3002/student/dashboard
- Courses:          http://localhost:3002/student/courses
- Marks:            http://localhost:3002/student/marks
- Attendance:       http://localhost:3002/student/attendance

API Docs:           http://localhost:3001/api/docs
API Base:           http://localhost:3001/api
```

---

## ✨ What's New

### 11 New Dashboard Pages Created:
1. ✅ Admin - Students Management
2. ✅ Admin - Teachers Management
3. ✅ Admin - Courses Management
4. ✅ Admin - Reports & Analytics
5. ✅ Student - My Courses
6. ✅ Student - Marks
7. ✅ Student - Attendance
8. ✅ Teacher - My Classes
9. ✅ Teacher - Marks Management
10. ✅ Teacher - Attendance Management
11. ✅ (Plus existing dashboard pages)

### Features:
- ✅ Role-based authentication
- ✅ Search and filtering
- ✅ Pagination support
- ✅ CRUD operations
- ✅ Statistics and analytics
- ✅ Color-coded status indicators
- ✅ Responsive design
- ✅ Empty state handling
- ✅ Loading states
- ✅ Error handling

---

## 🎓 Testing Workflow

### Recommended Testing Order

1. **Start Fresh**
   ```bash
   ./start-fresh.sh
   wait for servers to start
   ```

2. **Test Admin Features**
   - Login as admin@smp.com
   - Visit each admin page
   - Test search and pagination
   - Check all data displays correctly

3. **Test Teacher Features**
   - Logout
   - Login as john.doe@smp.com
   - Visit teacher pages
   - Verify class data and marks

4. **Test Student Features**
   - Logout
   - Login as student1@smp.com through student5@smp.com
   - Check courses, marks, attendance
   - Verify statistics calculations

5. **Cross-Browser Testing**
   - Test on Chrome, Firefox, Safari
   - Test on responsive sizes (mobile, tablet, desktop)

---

## 📞 Support

If you encounter any issues:

1. Check the browser console (F12) for errors
2. Check the backend logs for API errors
3. Verify all servers are running: `lsof -i :3001` and `lsof -i :3002`
4. Restart with fresh data: `./start-fresh.sh`
5. Check database connection: Verify PostgreSQL is running

---

**Happy Testing! 🎉**
