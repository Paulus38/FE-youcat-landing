// API configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const UPLOADS_BASE_URL = API_BASE_URL.replace('/api', '') + '/uploads';
export const TOKEN_KEY = 't';
export const REFRESH_TOKEN = 'rt';
export const GUEST_IDENTIFIER_COOKIE = 'exam_guest_identifier';
// Helper functions
export const getUploadUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  return `${UPLOADS_BASE_URL}/${imagePath}`;
};
