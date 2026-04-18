'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, BarChart3, Calendar } from 'lucide-react';
import apiClient from '@/lib/api-client';

const studentMenuItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: BarChart3 as any },
  { href: '/student/courses', label: 'My Courses', icon: BookOpen as any },
  { href: '/student/marks', label: 'Marks', icon: BarChart3 as any },
  { href: '/student/attendance', label: 'Attendance', icon: Calendar as any },
];

interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
}

interface CourseDetail {
  id: string;
  name: string;
  code: string;
  subjects: Subject[];
  duration: number;
}

export default function StudentCoursesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<CourseDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'STUDENT') {
      router.push('/login');
      return;
    }
    fetchCourses();
  }, [user, router]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/courses');
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout menuItems={studentMenuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-gray-500 mt-1">View all your enrolled courses and progress</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your courses...</div>
        ) : courses.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">You are not enrolled in any courses yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{course.name}</CardTitle>
                      <CardDescription className="mt-1">{course.code}</CardDescription>
                    </div>
                    <Badge variant="outline">{course.duration} Sem</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Subjects ({course.subjects.length})</p>
                    <div className="space-y-1">
                      {course.subjects.slice(0, 3).map((subject) => (
                        <div key={subject.id} className="text-sm text-gray-600 flex items-center justify-between">
                          <span>{subject.name}</span>
                          <Badge variant="secondary" className="text-xs">{subject.credits} Cr</Badge>
                        </div>
                      ))}
                      {course.subjects.length > 3 && (
                        <p className="text-sm text-gray-500 pt-1">+{course.subjects.length - 3} more</p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push(`/student/courses/${course.id}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View Details
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
