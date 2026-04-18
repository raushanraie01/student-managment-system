'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Trash2, Edit, Eye, Users, BookOpen, UserCheck, FileText } from 'lucide-react';
import apiClient from '@/lib/api-client';

const adminMenuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Users as any },
  { href: '/admin/students', label: 'Students', icon: Users as any },
  { href: '/admin/teachers', label: 'Teachers', icon: UserCheck as any },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen as any },
  { href: '/admin/reports', label: 'Reports', icon: FileText as any },
];

interface Teacher {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  city: string;
  qualification: string;
  createdAt: string;
}

export default function TeachersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      router.push('/login');
      return;
    }
    fetchTeachers();
  }, [page, searchTerm, user, router]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await apiClient.get(`/teachers?${params}`);
      setTeachers(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teacherId: string) => {
    try {
      await apiClient.delete(`/teachers/${teacherId}`);
      setTeachers(teachers.filter(t => t.id !== teacherId));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
            <p className="text-gray-500 mt-1">Manage all teachers in the system</p>
          </div>
          <Button onClick={() => router.push('/admin/teachers/new')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Teacher
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or employee ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Teachers</CardTitle>
            <CardDescription>{teachers.length} teacher{teachers.length !== 1 ? 's' : ''} found</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading teachers...</div>
            ) : teachers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No teachers found</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Qualification</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teachers.map((teacher) => (
                        <TableRow key={teacher.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{teacher.employeeId}</TableCell>
                          <TableCell>{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                          <TableCell>{teacher.phone}</TableCell>
                          <TableCell>{teacher.city}</TableCell>
                          <TableCell>{teacher.qualification}</TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {new Date(teacher.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`/admin/teachers/${teacher.id}`)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/admin/teachers/${teacher.id}/edit`)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    if (window.confirm(`Delete ${teacher.firstName} ${teacher.lastName}?`)) {
                                      handleDelete(teacher.id);
                                    }
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
