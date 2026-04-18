'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, BarChart3, Calendar } from 'lucide-react';
import apiClient from '@/lib/api-client';

const studentMenuItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: BarChart3 as any },
  { href: '/student/courses', label: 'My Courses', icon: BookOpen as any },
  { href: '/student/marks', label: 'Marks', icon: BarChart3 as any },
  { href: '/student/attendance', label: 'Attendance', icon: Calendar as any },
];

interface AttendanceRecord {
  id: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remarks?: string;
  class?: { name: string };
}

export default function StudentAttendancePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0, excused: 0 });

  useEffect(() => {
    if (user?.role !== 'STUDENT') {
      router.push('/login');
      return;
    }
    fetchAttendance();
  }, [user, router]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/attendance');
      const records = response.data.data || [];
      setAttendance(records);

      // Calculate stats
      const newStats = { present: 0, absent: 0, late: 0, excused: 0 };
      records.forEach((record: AttendanceRecord) => {
        const status = record.status.toLowerCase() as keyof typeof newStats;
        if (status in newStats) {
          newStats[status]++;
        }
      });
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return <Badge className="bg-green-600">Present</Badge>;
      case 'ABSENT':
        return <Badge className="bg-red-600">Absent</Badge>;
      case 'LATE':
        return <Badge className="bg-yellow-600">Late</Badge>;
      case 'EXCUSED':
        return <Badge className="bg-blue-600">Excused</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalClasses = Object.values(stats).reduce((a, b) => a + b, 0);
  const attendancePercentage = totalClasses > 0 ? Math.round((stats.present / totalClasses) * 100) : 0;

  return (
    <DashboardLayout menuItems={studentMenuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-gray-500 mt-1">View your class attendance records</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your attendance...</div>
        ) : (
          <>
            {/* Attendance Summary */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Overall</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{attendancePercentage}%</div>
                  <Progress value={attendancePercentage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-green-800">Present</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.present}</div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-red-800">Absent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-yellow-800">Late</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-blue-800">Excused</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.excused}</div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Details */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>{attendance.length} records found</CardDescription>
              </CardHeader>
              <CardContent>
                {attendance.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No attendance records yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Date</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendance.map((record) => (
                          <TableRow key={record.id} className="hover:bg-gray-50">
                            <TableCell>
                              {new Date(record.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </TableCell>
                            <TableCell>{record.class?.name || '-'}</TableCell>
                            <TableCell>{getStatusBadge(record.status)}</TableCell>
                            <TableCell className="text-sm text-gray-600">{record.remarks || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
