const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.detail || data.message || 'An error occurred',
      };
    }

    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export const apiClient = {
  // Auth endpoints
  signup: (email: string, password: string) =>
    apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string) =>
    apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getCurrentUser: () =>
    apiCall('/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`,
      },
    }),

  // Projects endpoints
  createProject: (name: string, description?: string) =>
    apiCall('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    }),

  getProjects: () =>
    apiCall('/api/projects', {
      method: 'GET',
    }),

  getProject: (projectId: number) =>
    apiCall(`/api/projects/${projectId}`, {
      method: 'GET',
    }),

  updateProject: (projectId: number, name?: string, description?: string) =>
    apiCall(`/api/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description }),
    }),

  deleteProject: (projectId: number) =>
    apiCall(`/api/projects/${projectId}`, {
      method: 'DELETE',
    }),

  // Reviews endpoints
  analyzeCode: (projectId: number, code: string, language: string) =>
    apiCall('/api/reviews/analyze', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, code, language }),
    }),

  getReviews: (projectId?: number) => {
    const params = projectId ? `?project_id=${projectId}` : '';
    return apiCall(`/api/reviews${params}`, {
      method: 'GET',
    });
  },

  getReview: (reviewId: number) =>
    apiCall(`/api/reviews/${reviewId}`, {
      method: 'GET',
    }),

  deleteReview: (reviewId: number) =>
    apiCall(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    }),

  // Docs endpoints
  generateDocumentation: (projectId: number, code: string, language: string) =>
    apiCall('/api/docs/generate', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, code, language }),
    }),

  getDocs: (projectId?: number) => {
    const params = projectId ? `?project_id=${projectId}` : '';
    return apiCall(`/api/docs${params}`, {
      method: 'GET',
    });
  },

  getDoc: (docId: number) =>
    apiCall(`/api/docs/${docId}`, {
      method: 'GET',
    }),

  deleteDoc: (docId: number) =>
    apiCall(`/api/docs/${docId}`, {
      method: 'DELETE',
    }),
};
