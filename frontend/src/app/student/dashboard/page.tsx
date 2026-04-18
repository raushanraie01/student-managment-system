'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Calendar,
  FileText,
  Award,
  Clock,
  TrendingUp,
} from 'lucide-react';

const studentMenuItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: BookOpen as any },
  { href: '/student/courses', label: 'My Courses', icon: BookOpen as any },
  { href: '/student/assignments', label: 'Assignments', icon: FileText as any },
  { href: '/student/grades', label: 'Grades', icon: Award as any },
  { href: '/student/schedule', label: 'Schedule', icon: Calendar as any },
];

const stats = [
  {
    title: 'Enrolled Courses',
    value: '6',
    icon: BookOpen,
    description: 'Active this semester',
  },
  {
    title: 'Assignments Due',
    value: '4',
    icon: Clock,
    description: 'This week',
  },
  {
    title: 'Average Grade',
    value: 'A-',
    icon: Award,
    description: '87.5%',
  },
  {
    title: 'Attendance',
    value: '95%',
    icon: TrendingUp,
    description: 'This semester',
  },
];

export default function StudentDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'STUDENT') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'STUDENT') {
    return null;
  }

  return (
    <DashboardLayout menuItems={studentMenuItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your academic overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'Computer Science 101', progress: 75, grade: 'A' },
                { name: 'Mathematics 201', progress: 65, grade: 'B+' },
                { name: 'Physics 101', progress: 80, grade: 'A-' },
                { name: 'English Literature', progress: 90, grade: 'A' },
              ].map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-gray-600">Current Grade: {course.grade}</p>
                    </div>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assignments & Schedule */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'Lab Report 5',
                    course: 'Physics 101',
                    due: 'Due in 2 days',
                    status: 'pending',
                  },
                  {
                    title: 'Essay: Shakespeare',
                    course: 'English Literature',
                    due: 'Due in 4 days',
                    status: 'pending',
                  },
                  {
                    title: 'Math Problem Set 8',
                    course: 'Mathematics 201',
                    due: 'Due in 5 days',
                    status: 'pending',
                  },
                ].map((assignment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-gray-600">{assignment.course}</p>
                      </div>
                    </div>
                    <span className="text-xs text-orange-600 font-medium">{assignment.due}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { class: 'Computer Science 101', time: '9:00 AM - 10:30 AM', room: 'Room 201' },
                  { class: 'Mathematics 201', time: '11:00 AM - 12:30 PM', room: 'Room 305' },
                  { class: 'Physics 101', time: '2:00 PM - 3:30 PM', room: 'Lab 102' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.class}</p>
                      <p className="text-sm text-gray-600">
                        {item.time} • {item.room}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
