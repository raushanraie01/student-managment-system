import { PrismaClient, Role, Gender, AttendanceStatus, AssignmentStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.activityLog.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.material.deleteMany();
  await prisma.timetable.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.mark.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.class.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@smp.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log('✓ Created Admin user');

  // Create Course
  const bcaCourse = await prisma.course.create({
    data: {
      name: 'Bachelor of Computer Applications',
      code: 'BCA',
      description: 'Three year undergraduate program in Computer Applications',
      duration: 6, // 6 semesters
    },
  });
  console.log('✓ Created BCA Course');

  // Create Teachers
  const teacher1Password = await bcrypt.hash('Teacher@123', 10);
  const teacher1User = await prisma.user.create({
    data: {
      email: 'john.doe@smp.com',
      password: teacher1Password,
      role: Role.TEACHER,
    },
  });

  const teacher1 = await prisma.teacher.create({
    data: {
      userId: teacher1User.id,
      employeeId: 'T001',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1985-05-15'),
      gender: Gender.MALE,
      phone: '+91-9876543210',
      address: '123 Teacher Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      qualification: 'M.Tech in Computer Science',
      experience: 8,
      joiningDate: new Date('2018-07-01'),
    },
  });

  const teacher2User = await prisma.user.create({
    data: {
      email: 'jane.smith@smp.com',
      password: teacher1Password,
      role: Role.TEACHER,
    },
  });

  const teacher2 = await prisma.teacher.create({
    data: {
      userId: teacher2User.id,
      employeeId: 'T002',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: new Date('1990-08-20'),
      gender: Gender.FEMALE,
      phone: '+91-9876543211',
      address: '456 Faculty Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      qualification: 'MCA',
      experience: 5,
      joiningDate: new Date('2020-08-01'),
    },
  });
  console.log('✓ Created Teachers');

  // Create Subjects
  const subjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Data Structures',
        code: 'BCA301',
        description: 'Introduction to Data Structures and Algorithms',
        credits: 4,
        semester: 3,
        courseId: bcaCourse.id,
        teacherId: teacher1.id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Database Management Systems',
        code: 'BCA302',
        description: 'Relational Database Design and SQL',
        credits: 4,
        semester: 3,
        courseId: bcaCourse.id,
        teacherId: teacher2.id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Web Development',
        code: 'BCA303',
        description: 'HTML, CSS, JavaScript and Modern Frameworks',
        credits: 4,
        semester: 3,
        courseId: bcaCourse.id,
        teacherId: teacher1.id,
      },
    }),
  ]);
  console.log('✓ Created Subjects');

  // Create Class
  const class1 = await prisma.class.create({
    data: {
      name: 'BCA Third Year',
      section: 'A',
      semester: 3,
      academicYear: '2024-25',
      courseId: bcaCourse.id,
      teacherId: teacher1.id,
    },
  });
  console.log('✓ Created Class');

  // Create Students
  const studentPassword = await bcrypt.hash('Student@123', 10);
  
  const students: any[] = [];
  for (let i = 1; i <= 5; i++) {
    const studentUser = await prisma.user.create({
      data: {
        email: `student${i}@smp.com`,
        password: studentPassword,
        role: Role.STUDENT,
      },
    });

    const student = await prisma.student.create({
      data: {
        userId: studentUser.id,
        enrollmentNo: `BCA2024000${i}`,
        firstName: `Student${i}`,
        lastName: `Test`,
        dateOfBirth: new Date(`2003-0${i}-15`),
        gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE,
        phone: `+91-987654321${i}`,
        address: `${i * 10} Student Colony`,
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400003',
        parentName: `Parent${i} Test`,
        parentPhone: `+91-987654320${i}`,
        parentEmail: `parent${i}@example.com`,
        bloodGroup: i % 4 === 0 ? 'O+' : i % 3 === 0 ? 'A+' : 'B+',
        classId: class1.id,
      },
    });
    students.push(student);
  }
  console.log('✓ Created Students');

  // Create Attendance Records
  const today = new Date();
  for (const student of students) {
    await prisma.attendance.create({
      data: {
        studentId: student.id,
        classId: class1.id,
        teacherId: teacher1.id,
        date: today,
        status: AttendanceStatus.PRESENT,
      },
    });
  }
  console.log('✓ Created Attendance Records');

  // Create Marks
  for (const student of students) {
    for (const subject of subjects) {
      await prisma.mark.create({
        data: {
          studentId: student.id,
          subjectId: subject.id,
          teacherId: teacher1.id,
          examType: 'Mid-Term',
          totalMarks: 50,
          obtainedMarks: 35 + Math.floor(Math.random() * 15),
          grade: 'A',
          academicYear: '2024-25',
          semester: 3,
        },
      });
    }
  }
  console.log('✓ Created Marks');

  // Create Assignment
  const assignment = await prisma.assignment.create({
    data: {
      title: 'Data Structures Project',
      description: 'Implement Binary Search Tree with all operations',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      totalMarks: 20,
      subjectId: subjects[0].id,
      teacherId: teacher1.id,
      attachments: [],
    },
  });
  console.log('✓ Created Assignment');

  // Create Announcement
  await prisma.announcement.create({
    data: {
      title: 'Welcome to Student Management Portal',
      content: 'We are excited to launch our new student management system. Please explore all features.',
      priority: 'high',
      teacherId: teacher1.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      attachments: [],
    },
  });
  console.log('✓ Created Announcement');

  // Create Timetable
  await prisma.timetable.createMany({
    data: [
      { classId: class1.id, dayOfWeek: 1, startTime: '09:00', endTime: '10:00', subjectCode: 'BCA301', room: 'R101' },
      { classId: class1.id, dayOfWeek: 1, startTime: '10:00', endTime: '11:00', subjectCode: 'BCA302', room: 'R102' },
      { classId: class1.id, dayOfWeek: 2, startTime: '09:00', endTime: '10:00', subjectCode: 'BCA303', room: 'R101' },
    ],
  });
  console.log('✓ Created Timetable');

  console.log('\n🎉 Database seeding completed!');
  console.log('\n📧 Default Credentials:');
  console.log('Admin: admin@smp.com / Admin@123');
  console.log('Teacher: john.doe@smp.com / Teacher@123');
  console.log('Student: student1@smp.com / Student@123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
