import apiClient from './api-client';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, role?: string) => {
    const response = await apiClient.post('/auth/register', { email, password, role });
    return response.data;
  },

  logout: async (refreshToken?: string) => {
    const response = await apiClient.post('/auth/logout', { refreshToken });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const response = await apiClient.post('/auth/change-password', { oldPassword, newPassword });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },
};

export const studentsApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/students', { params });
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await apiClient.get(`/students/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/students', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.patch(`/students/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/students/${id}`);
    return response.data;
  },
};

export const teachersApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/teachers', { params });
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await apiClient.get(`/teachers/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/teachers', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.patch(`/teachers/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/teachers/${id}`);
    return response.data;
  },
};

export const coursesApi = {
  getAll: async () => {
    const response = await apiClient.get('/courses');
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/courses', data);
    return response.data;
  },

  // Syllabus APIs
  getSyllabusForCourse: async (courseId: string) => {
    const response = await apiClient.get(`/courses/${courseId}/syllabus`);
    return response.data;
  },

  getSyllabusById: async (syllabusId: string) => {
    const response = await apiClient.get(`/courses/syllabus/${syllabusId}`);
    return response.data;
  },

  createSyllabus: async (data: any) => {
    const response = await apiClient.post(`/courses/${data.courseId}/syllabus`, data);
    return response.data;
  },

  updateSyllabus: async (syllabusId: string, data: any) => {
    const response = await apiClient.patch(`/courses/syllabus/${syllabusId}`, data);
    return response.data;
  },

  deleteSyllabus: async (syllabusId: string) => {
    const response = await apiClient.delete(`/courses/syllabus/${syllabusId}`);
    return response.data;
  },
};

export const subjectsApi = {
  getAll: async () => {
    const response = await apiClient.get('/subjects');
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/subjects', data);
    return response.data;
  },
};

export const classesApi = {
  getAll: async () => {
    const response = await apiClient.get('/classes');
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/classes', data);
    return response.data;
  },
};

export const marksApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/marks', { params });
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/marks', data);
    return response.data;
  },
};

export const attendanceApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/attendance', { params });
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/attendance', data);
    return response.data;
  },
};

export const assignmentsApi = {
  getAll: async () => {
    const response = await apiClient.get('/assignments');
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/assignments', data);
    return response.data;
  },
};

export const announcementsApi = {
  getAll: async () => {
    const response = await apiClient.get('/announcements');
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/announcements', data);
    return response.data;
  },
};
