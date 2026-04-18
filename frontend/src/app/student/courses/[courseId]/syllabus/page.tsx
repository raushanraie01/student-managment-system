'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { coursesApi } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export default function StudentCourseSyllabusPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const router = useRouter();
  const { user } = useAuthStore();

  const [syllabus, setSyllabus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is student
  useEffect(() => {
    if (user?.role !== 'STUDENT') {
      router.push('/');
    }
  }, [user, router]);

  // Load syllabus
  useEffect(() => {
    if (courseId) {
      loadSyllabus();
    }
  }, [courseId]);

  const loadSyllabus = async () => {
    try {
      setLoading(true);
      const response = await coursesApi.getSyllabusForCourse(courseId);
      setSyllabus(Array.isArray(response) ? response : []);
    } catch (err: any) {
      setError('Failed to load syllabus');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading syllabus...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Course Syllabus</h1>
        <p className="text-gray-600 mt-2">Download and review course materials</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {syllabus.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500 text-center py-8">
              No syllabus available for this course yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {syllabus.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.fileName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}

                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    <strong>Size:</strong> {(item.fileSize / 1024).toFixed(2)} KB
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Uploaded:</strong>{' '}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>By:</strong> {item.teacher?.user?.email}
                  </p>
                </div>

                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full">Download</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
