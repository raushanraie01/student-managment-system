'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookOpen, BarChart3, Calendar } from 'lucide-react';
import apiClient from '@/lib/api-client';

const studentMenuItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: BarChart3 as any },
  { href: '/student/courses', label: 'My Courses', icon: BookOpen as any },
  { href: '/student/marks', label: 'Marks', icon: BarChart3 as any },
  { href: '/student/attendance', label: 'Attendance', icon: Calendar as any },
];

interface Mark {
  id: string;
  subject: { name: string; code: string };
  examType: string;
  totalMarks: number;
  obtainedMarks: number;
  grade?: string;
  remarks?: string;
  semester: number;
  academicYear: string;
}

export default function StudentMarksPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'STUDENT') {
      router.push('/login');
      return;
    }
    fetchMarks();
  }, [user, router]);

  const fetchMarks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/marks');
      setMarks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching marks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade?: string) => {
    if (!grade) return 'secondary';
    if (['A', 'A+'].includes(grade)) return 'default';
    if (['B', 'B+'].includes(grade)) return 'secondary';
    if (['C', 'C+'].includes(grade)) return 'outline';
    return 'destructive';
  };

  const calculatePercentage = (obtained: number, total: number) => {
    return Math.round((obtained / total) * 100);
  };

  return (
    <DashboardLayout menuItems={studentMenuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Marks</h1>
          <p className="text-gray-500 mt-1">View your academic performance and grades</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your marks...</div>
        ) : marks.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No marks recorded yet</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Summary Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      marks.reduce((sum, m) => sum + calculatePercentage(m.obtainedMarks, m.totalMarks), 0) /
                      marks.length
                    )}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{marks.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.max(...marks.map(m => calculatePercentage(m.obtainedMarks, m.totalMarks)))}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Lowest Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.min(...marks.map(m => calculatePercentage(m.obtainedMarks, m.totalMarks)))}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Marks Table */}
            <Card>
              <CardHeader>
                <CardTitle>Marks Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Subject</TableHead>
                        <TableHead>Exam Type</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Obtained / Total</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marks.map((mark) => (
                        <TableRow key={mark.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <p className="font-medium">{mark.subject.name}</p>
                              <p className="text-sm text-gray-600">{mark.subject.code}</p>
                            </div>
                          </TableCell>
                          <TableCell>{mark.examType}</TableCell>
                          <TableCell>{mark.semester}</TableCell>
                          <TableCell>
                            {mark.obtainedMarks} / {mark.totalMarks}
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold">
                              {calculatePercentage(mark.obtainedMarks, mark.totalMarks)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            {mark.grade && (
                              <Badge variant={getGradeColor(mark.grade)}>{mark.grade}</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{mark.remarks || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
