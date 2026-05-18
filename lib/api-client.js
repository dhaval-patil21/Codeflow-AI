const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function apiCall(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
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
  signup: (email, password) =>
    apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
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
  createProject: (name, description) =>
    apiCall('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    }),

  getProjects: () =>
    apiCall('/api/projects', {
      method: 'GET',
    }),

  getProject: (projectId) =>
    apiCall(`/api/projects/${projectId}`, {
      method: 'GET',
    }),

  updateProject: (projectId, name, description) =>
    apiCall(`/api/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description }),
    }),

  deleteProject: (projectId) =>
    apiCall(`/api/projects/${projectId}`, {
      method: 'DELETE',
    }),

  // Reviews endpoints
  analyzeCode: (projectId, code, language) =>
    apiCall('/api/reviews/analyze', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, code, language }),
    }),

  getReviews: (projectId) => {
    const params = projectId ? `?project_id=${projectId}` : '';
    return apiCall(`/api/reviews${params}`, {
      method: 'GET',
    });
  },

  getReview: (reviewId) =>
    apiCall(`/api/reviews/${reviewId}`, {
      method: 'GET',
    }),

  deleteReview: (reviewId) =>
    apiCall(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    }),

  // Docs endpoints
  generateDocumentation: (projectId, code, language) =>
    apiCall('/api/docs/generate', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, code, language }),
    }),

  getDocs: (projectId) => {
    const params = projectId ? `?project_id=${projectId}` : '';
    return apiCall(`/api/docs${params}`, {
      method: 'GET',
    });
  },

  getDoc: (docId) =>
    apiCall(`/api/docs/${docId}`, {
      method: 'GET',
    }),

  deleteDoc: (docId) =>
    apiCall(`/api/docs/${docId}`, {
      method: 'DELETE',
    }),
};
