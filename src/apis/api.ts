import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
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
  login: (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: (name: string, email: string, password: string) => {
    return api.post('/auth/register', { name, email, password });
  },
  
  googleLogin: (accessToken: string) => {
    return api.post('/auth/google', { token: accessToken });
  },
  
  logout: () => {
    return api.post('/auth/logout');
  },
  
  getProfile: () => {
    return api.get('/auth/profile');
  },
  
  updateProfile: (userData: any) => {
    return api.put('/auth/profile', userData);
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
  }
};

export default api; 