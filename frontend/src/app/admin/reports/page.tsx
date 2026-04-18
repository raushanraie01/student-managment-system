'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Download, Users, BookOpen, UserCheck, FileText } from 'lucide-react';

const adminMenuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Users as any },
  { href: '/admin/students', label: 'Students', icon: Users as any },
  { href: '/admin/teachers', label: 'Teachers', icon: UserCheck as any },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen as any },
  { href: '/admin/reports', label: 'Reports', icon: FileText as any },
];

export default function AdminReportsPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      router.push('/login');
    }
  }, [user, router]);

  if (user?.role !== 'ADMIN') {
    return null;
  }

  const reportSections = [
    {
      title: 'Academic Reports',
      description: 'View academic performance and statistics',
      reports: [
        { name: 'Student Performance', description: 'Academic marks and grades analysis' },
        { name: 'Course Enrollment', description: 'Course-wise enrollment statistics' },
        { name: 'Class-wise Analysis', description: 'Performance metrics by class' },
      ],
    },
    {
      title: 'Attendance Reports',
      description: 'Attendance tracking and analysis',
      reports: [
        { name: 'Attendance Summary', description: 'Overall attendance statistics' },
        { name: 'Absent Students', description: 'Students with low attendance' },
        { name: 'Monthly Attendance', description: 'Month-wise attendance trends' },
      ],
    },
    {
      title: 'Administrative Reports',
      description: 'System administration and management reports',
      reports: [
        { name: 'User Activity Log', description: 'System user activity tracking' },
        { name: 'Resource Utilization', description: 'Resource usage statistics' },
        { name: 'System Health', description: 'System performance metrics' },
      ],
    },
  ];

  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Generate and view comprehensive system reports</p>
        </div>

        <Tabs defaultValue="academic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="admin">Administrative</TabsTrigger>
          </TabsList>

          {reportSections.map((section, idx) => (
            <TabsContent key={idx} value={section.title.toLowerCase().split(' ')[0]}>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {section.reports.map((report, reportIdx) => (
                    <Card key={reportIdx} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{report.name}</CardTitle>
                            <CardDescription className="mt-1">{report.description}</CardDescription>
                          </div>
                          <BarChart3 className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
