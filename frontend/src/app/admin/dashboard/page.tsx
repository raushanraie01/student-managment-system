'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, GraduationCap, TrendingUp, UserCheck, FileText } from 'lucide-react';

const adminMenuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Users as any },
  { href: '/admin/students', label: 'Students', icon: GraduationCap as any },
  { href: '/admin/teachers', label: 'Teachers', icon: UserCheck as any },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen as any },
  { href: '/admin/reports', label: 'Reports', icon: FileText as any },
];

const stats = [
  {
    title: 'Total Students',
    value: '1,234',
    icon: GraduationCap,
    change: '+12%',
    changeType: 'positive',
  },
  {
    title: 'Total Teachers',
    value: '89',
    icon: UserCheck,
    change: '+3%',
    changeType: 'positive',
  },
  {
    title: 'Active Courses',
    value: '45',
    icon: BookOpen,
    change: '+5%',
    changeType: 'positive',
  },
  {
    title: 'Attendance Rate',
    value: '94.2%',
    icon: TrendingUp,
    change: '+2.1%',
    changeType: 'positive',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Smith', course: 'Computer Science 101', time: '2 hours ago' },
                  { name: 'Sarah Johnson', course: 'Mathematics 201', time: '4 hours ago' },
                  { name: 'Mike Brown', course: 'Physics 101', time: '6 hours ago' },
                ].map((enrollment, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{enrollment.name}</p>
                      <p className="text-sm text-gray-600">{enrollment.course}</p>
                    </div>
                    <span className="text-xs text-gray-500">{enrollment.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'Add New Student',
                  'Create Course',
                  'Schedule Class',
                  'Generate Report',
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
