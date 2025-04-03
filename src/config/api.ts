// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const UPLOADS_BASE_URL = API_BASE_URL.replace('/api', '') + '/uploads';

// Helper functions
export const getUploadUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  return `${UPLOADS_BASE_URL}/${imagePath}`;
}; 