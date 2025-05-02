import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY, REFRESH_TOKEN } from '../config/api';
import { getCookie } from '@/services/cookieService';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const questionApi = {
  getRandomQuestions: () => {
    return api.get('/home/rand-question');
  },

  getCategories: () => {
    return api.get('/questions/categories');
  },

  getTopPlayers: () => {
    return api.get(`/user/top-10-scores`);
  },

  getTopScores: () => {
    return api.get('/user/top-scores');
  },
};
export default api;
