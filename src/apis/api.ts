import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  login: (username: string, password: string) => {
    return api.post('/sign-in', { username, password });
  },

  register: (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
  }) => {
    return api.post('/sign-up', userData);
  },

  googleLogin: (accessToken: string) => {
    return api.post('/auth/candidate/google/login', {
      credential: accessToken,
    });
  },

  logout: () => {
    return api.post('/auth/logout');
  },

  getProfile: () => {
    return api.get('/user/profile');
  },

  updateProfile: (userData: any) => {
    return api.put('/user/profile', userData);
  },
};

export const questionApi = {
  getQuestions: (params: any) => {
    return api.get('/questions', { params });
  },

  getQuestionById: (id: string | number) => {
    return api.get(`/questions/${id}`);
  },

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

  searchQuestions: (params: any) => {
    return api.get('/questions/search', { params });
  },
};

export default api;
