'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, BarChart3, Calendar } from 'lucide-react';
import apiClient from '@/lib/api-client';

const teacherMenuItems = [
  { href: '/teacher/dashboard', label: 'Dashboard', icon: BarChart3 as any },
  { href: '/teacher/classes', label: 'My Classes', icon: Users as any },
  { href: '/teacher/marks', label: 'Marks', icon: BarChart3 as any },
  { href: '/teacher/attendance', label: 'Attendance', icon: Calendar as any },
];

interface Class {
  id: string;
  name: string;
  section: string;
  semester: number;
  academicYear: string;
  course?: { name: string };
  students?: any[];
}

export default function TeacherClassesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'TEACHER') {
      router.push('/login');
      return;
    }
    fetchClasses();
  }, [user, router]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      // Fetch courses to get classes
      const response = await apiClient.get('/courses');
      const courses = response.data.data || [];
      setClasses(courses);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout menuItems={teacherMenuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
          <p className="text-gray-500 mt-1">Manage your classes and view enrolled students</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your classes...</div>
        ) : classes.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No classes assigned yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => (
              <Card key={cls.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{cls.name}</CardTitle>
                      <CardDescription>{cls.section && `Section: ${cls.section}`}</CardDescription>
                    </div>
                    <Badge variant="outline">Sem {cls.semester}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course:</span>
                      <span className="font-medium">{cls.course?.name || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Academic Year:</span>
                      <span className="font-medium">{cls.academicYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{cls.students?.length || 0}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push(`/teacher/classes/${cls.id}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View Class
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
