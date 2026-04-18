'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Edit, BookOpen, Users, BarChart3, Calendar } from 'lucide-react';
import apiClient from '@/lib/api-client';

const teacherMenuItems = [
  { href: '/teacher/dashboard', label: 'Dashboard', icon: BarChart3 as any },
  { href: '/teacher/classes', label: 'My Classes', icon: Users as any },
  { href: '/teacher/marks', label: 'Marks', icon: BarChart3 as any },
  { href: '/teacher/attendance', label: 'Attendance', icon: Calendar as any },
];

interface MarkRecord {
  id: string;
  student: { firstName: string; lastName: string };
  subject: { name: string; code: string };
  examType: string;
  totalMarks: number;
  obtainedMarks?: number;
  grade?: string;
}

export default function TeacherMarksPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [marks, setMarks] = useState<MarkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.role !== 'TEACHER') {
      router.push('/login');
      return;
    }
    fetchMarks();
  }, [user, router, searchTerm]);

  const fetchMarks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
      });
      const response = await apiClient.get(`/marks?${params}`);
      setMarks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching marks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout menuItems={teacherMenuItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marks Management</h1>
            <p className="text-gray-500 mt-1">Enter and manage student marks</p>
          </div>
          <Button onClick={() => router.push('/teacher/marks/new')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Marks
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by student name or subject..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marks Records</CardTitle>
            <CardDescription>{marks.length} record{marks.length !== 1 ? 's' : ''} found</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading marks...</div>
            ) : marks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No marks records found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Student</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Obtained / Total</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marks.map((mark) => (
                      <TableRow key={mark.id} className="hover:bg-gray-50">
                        <TableCell>
                          <span className="font-medium">{`${mark.student.firstName} ${mark.student.lastName}`}</span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{mark.subject.name}</p>
                            <p className="text-sm text-gray-600">{mark.subject.code}</p>
                          </div>
                        </TableCell>
                        <TableCell>{mark.examType}</TableCell>
                        <TableCell>
                          {mark.obtainedMarks !== undefined ? `${mark.obtainedMarks} / ${mark.totalMarks}` : '-'}
                        </TableCell>
                        <TableCell>
                          {mark.grade ? <Badge>{mark.grade}</Badge> : <span className="text-gray-400">-</span>}
                        </TableCell>
                        <TableCell>
                          <Badge variant={mark.obtainedMarks ? 'default' : 'secondary'}>
                            {mark.obtainedMarks ? 'Entered' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/teacher/marks/${mark.id}/edit`)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
