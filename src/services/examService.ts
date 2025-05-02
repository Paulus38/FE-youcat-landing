import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import authService from './authService';
import { setCookie } from './cookieService';

// Cookie name for guest identifier
const GUEST_IDENTIFIER_COOKIE = 'exam_guest_identifier';

// Define interfaces for exam-related data
export interface ExamSettings {
  title: string;
  categoryIds: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount: number;
  timeLimit: number;
  randomOrder: boolean;
  guest_identifier?: string;
  book_id?: number; // Add this line
}

export interface ExamResponse {
  statusCode: number;
  message: string;
  data: {
    id: string | number;
    guest_identifier?: string;
    ExamParticipants?: Array<{
      id: number;
      user_id: number | null;
      duration: number | null;
      score: number | null;
      start_time: string;
      end_time: string | null;
      is_finished: number;
    }>;
    [key: string]: any;
  };
}

export interface ExamResult {
  id: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  [key: string]: any;
}

// Interface for predefined exams
export interface PredefinedExam {
  id: number;
  title: string;
  description: string;
  duration: number;
  total_question: number;
  difficulty: string;
  ExamType: {
    id: number;
    name: string;
  };
}

export interface PredefinedExamsResponse {
  statusCode: number;
  message: string;
  data: PredefinedExam[];
}

// Interface for books
export interface Book {
  id: number;
  name: string;
  description?: string;
}

export interface BooksResponse {
  statusCode: number;
  message: string;
  data: Book[];
}

// Create API instance with auth token and guest identifier
const createApiInstance = () => {
  const token = authService.getToken();
  // Get guest identifier from cookies

  const guestId = authService.getGuestIdentifier();

  return axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Enable sending cookies
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(!token && guestId ? { 'guest-identifier': guestId } : {}),
    },
  });
};

const examService = {
  // Create a new exam
  createExam: async (examData: ExamSettings) => {
    const api = createApiInstance();
    const token = authService.getToken();

    // Extract guest_identifier if present
    let { guest_identifier, ...examSettings } = examData;

    // Check if guest_identifier exists in cookies
    const guestIdFromCookie = authService.getGuestIdentifier();
    // If guest_identifier is not provided and exists in cookies, use it
    // Otherwise, generate a new one
    if (!guest_identifier && guestIdFromCookie) {
      guest_identifier = guestIdFromCookie;
      setCookie(GUEST_IDENTIFIER_COOKIE, guestIdFromCookie, {
        path: '/',
        sameSite: 'strict',
      });
    }

    const payload = {
      ...examSettings,
    };

    try {
      // Use different endpoints based on authentication status
      const endpoint = token ? '/exam/create/auth' : '/exam/create/guest';
      const response = await api.post<ExamResponse>(endpoint, payload);

      // Store guest_identifier in cookie if present in response
      if (response.data?.data?.guest_identifier) {
        setCookie(
          GUEST_IDENTIFIER_COOKIE,
          response.data.data.guest_identifier,
          { expires: new Date(Date.now() + 7 * 60 * 60 * 1000) } // 7 hours in milliseconds
        );
      }

      return response.data;
    } catch (error: any) {
      console.error(
        'Create exam error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get predefined exams
  getPredefinedExams: async () => {
    const api = createApiInstance();

    try {
      const response = await api.get<PredefinedExamsResponse>('/exam/type-3');
      return response.data;
    } catch (error: any) {
      console.error(
        'Get predefined exams error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get exam details by ID
  getExam: async (examId: string) => {
    const api = createApiInstance();

    try {
      const response = await api.get<ExamResponse>(`/exam/${examId}/detail`);
      return response.data;
    } catch (error: any) {
      console.error('Get exam error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Submit exam answers
  submitExam: async (
    examId: string,
    answers: { exam_question_id: number; selected_answer_id: number | null }[],
    duration: number,
    participant_id?: number,
    guest_identifier?: string
  ) => {
    const api = createApiInstance();
    const token = authService.getToken();

    try {
      // Use guest_identifier from cookie if not provided and user is not authenticated
      const guestId =
        guest_identifier &&
        guest_identifier !== '' &&
        guest_identifier !== undefined
          ? guest_identifier
          : authService.getGuestIdentifier();

      // For guest users (no token), guest_identifier is required
      if (!token && !guestId) {
        throw new Error('guest_identifier is required for guest users');
      }

      const payload = {
        id: participant_id || 0,
        user_id: token ? 0 : null,
        ...(!token && guestId ? { guest_identifier: guestId } : {}),
        exam_id: Number(examId),
        duration,
        ExamAnswers: Array.isArray(answers) ? answers : [],
      };

      console.log('Submit payload:', JSON.stringify(payload)); // Debug log

      // Use different endpoints based on authentication status
      const endpoint = token ? '/exam/submit/auth' : '/exam/submit/guest';
      const response = await api.post(endpoint, payload);
      return response.data;
    } catch (error: any) {
      console.error(
        'Submit exam error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get exam result
  getExamResult: async (resultId: string, participantId: number) => {
    const api = createApiInstance();
    const token = authService.getToken();
    const guestId = authService.getGuestIdentifier();

    try {
      // Nếu đã login (có token), gọi API result thông thường
      // Nếu chưa login (không có token) và có guest_identifier, gọi API guest_result
      const endpoint = token
        ? `/exam/${resultId}/result?participant=${participantId}`
        : `/exam/${resultId}/guest_result/${guestId}?participant=${participantId}`;

      const response = await api.get(endpoint);
      return response.data;
    } catch (error: any) {
      console.error(
        'Get exam result error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get user's exams
  getUserExams: async () => {
    const api = createApiInstance();

    try {
      const response = await api.get('/exam/user');
      return response.data;
    } catch (error: any) {
      console.error(
        'Get user exams error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get user's exam results
  getUserExamResults: async () => {
    const api = createApiInstance();

    try {
      const response = await api.get('/exam-results/user');
      return response.data;
    } catch (error: any) {
      console.error(
        'Get user exam results error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Start a predefined exam for authenticated users
  startAuthenticatedExam: async (examId: number) => {
    const api = createApiInstance();

    try {
      const response = await api.post('/exam_participant/start', {
        exam_id: examId,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        'Start authenticated exam error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Start a predefined exam for guest users
  startGuestExam: async (payload: {
    exam_id: number;
    guest_identifier?: string;
  }) => {
    const api = createApiInstance();

    try {
      const response = await api.post('/exam_participant/guest/start', payload);

      // Store guest_identifier in cookie if present in response
      if (response.data?.data?.guest_identifier) {
        setCookie(
          GUEST_IDENTIFIER_COOKIE,
          response.data.data.guest_identifier,
          { expires: new Date(Date.now() + 7 * 60 * 60 * 1000) } // 7 hours in milliseconds
        );
      }

      return response.data;
    } catch (error: any) {
      console.error(
        'Start guest exam error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get books
  getBooks: async () => {
    const api = createApiInstance();

    try {
      const response = await api.get<BooksResponse>('/books');
      return response.data;
    } catch (error: any) {
      console.error('Get books error:', error.response?.data || error.message);
      throw error;
    }
  },
};

export default examService;
