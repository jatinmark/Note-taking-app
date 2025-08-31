// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  health: `${API_URL}/api/health`,
  api: `${API_URL}/api`,
  users: `${API_URL}/api/users`,
} as const;

// Helper function for API calls
export const fetchAPI = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};