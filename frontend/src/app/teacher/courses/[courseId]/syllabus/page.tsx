'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { coursesApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export default function TeacherSyllabusPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const router = useRouter();
  const { user } = useAuthStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [syllabus, setSyllabus] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if user is teacher
  useEffect(() => {
    if (user?.role !== 'TEACHER') {
      router.push('/');
    }
  }, [user, router]);

  // Load existing syllabus
  useEffect(() => {
    if (courseId) {
      loadSyllabus();
    }
  }, [courseId]);

  const loadSyllabus = async () => {
    try {
      const response = await coursesApi.getSyllabusForCourse(courseId);
      setSyllabus(Array.isArray(response) ? response : []);
    } catch (err: any) {
      setError('Failed to load syllabus');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !file) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      // Simulate file upload (in real app, upload to storage service)
      const fileUrl = `/uploads/${Date.now()}-${file.name}`;

      await coursesApi.createSyllabus({
        courseId,
        title,
        description,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      });

      setSuccess('Syllabus uploaded successfully!');
      setTitle('');
      setDescription('');
      setFile(null);
      loadSyllabus();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload syllabus');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (syllabusId: string) => {
    if (!confirm('Are you sure you want to delete this syllabus?')) return;

    try {
      await coursesApi.deleteSyllabus(syllabusId);
      setSuccess('Syllabus deleted successfully!');
      loadSyllabus();
    } catch (err: any) {
      setError('Failed to delete syllabus');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Course Syllabus Management</h1>
        <p className="text-gray-600 mt-2">Upload and manage course syllabus for students</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Syllabus</CardTitle>
          <CardDescription>Upload course syllabus document for students</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-50 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Course Syllabus 2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add optional description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Upload File <span className="text-red-500">*</span>
              </label>
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              {file && <p className="text-sm text-gray-600 mt-2">{file.name}</p>}
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Syllabus'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Syllabus</CardTitle>
          <CardDescription>Manage your uploaded syllabuses</CardDescription>
        </CardHeader>
        <CardContent>
          {syllabus.length === 0 ? (
            <p className="text-gray-500">No syllabus uploaded yet</p>
          ) : (
            <div className="space-y-4">
              {syllabus.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.fileName}</p>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Uploaded: {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
