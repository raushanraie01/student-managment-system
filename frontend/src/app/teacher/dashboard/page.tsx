'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
} from 'lucide-react';

const teacherMenuItems = [
  { href: '/teacher/dashboard', label: 'Dashboard', icon: BookOpen as any },
  { href: '/teacher/classes', label: 'My Classes', icon: Users as any },
  { href: '/teacher/assignments', label: 'Assignments', icon: FileText as any },
  { href: '/teacher/attendance', label: 'Attendance', icon: CheckCircle as any },
  { href: '/teacher/schedule', label: 'Schedule', icon: Calendar as any },
];

const stats = [
  {
    title: 'Total Students',
    value: '145',
    icon: Users,
    description: 'Across all classes',
  },
  {
    title: 'Active Classes',
    value: '5',
    icon: BookOpen,
    description: 'This semester',
  },
  {
    title: 'Pending Assignments',
    value: '12',
    icon: Clock,
    description: 'Need grading',
  },
  {
    title: 'Attendance Rate',
    value: '92%',
    icon: CheckCircle,
    description: 'This week',
  },
];

export default function TeacherDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'TEACHER') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'TEACHER') {
    return null;
  }

  return (
    <DashboardLayout menuItems={teacherMenuItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Manage your classes and students.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className="h-10 w-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
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

        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Computer Science 101', students: 35, time: 'Mon, Wed 9:00 AM' },
                { name: 'Data Structures', students: 28, time: 'Tue, Thu 11:00 AM' },
                { name: 'Web Development', students: 42, time: 'Mon, Wed 2:00 PM' },
                { name: 'Algorithms', students: 25, time: 'Tue, Thu 3:00 PM' },
              ].map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold">{cls.name}</p>
                    <p className="text-sm text-gray-600">{cls.students} students • {cls.time}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { class: 'Computer Science 101', time: 'Today, 9:00 AM', room: 'Room 201' },
                  { class: 'Web Development', time: 'Today, 2:00 PM', room: 'Room 305' },
                  { class: 'Data Structures', time: 'Tomorrow, 11:00 AM', room: 'Room 202' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 border-b pb-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.class}</p>
                      <p className="text-sm text-gray-600">{item.time} • {item.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { student: 'Alice Johnson', assignment: 'Lab 5', time: '30 mins ago' },
                  { student: 'Bob Smith', assignment: 'Project 2', time: '1 hour ago' },
                  { student: 'Carol White', assignment: 'Lab 5', time: '2 hours ago' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 border-b pb-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.student}</p>
                      <p className="text-sm text-gray-600">{item.assignment} • {item.time}</p>
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
