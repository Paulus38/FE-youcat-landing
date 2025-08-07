import {
  BooksResponse,
  ExamResponse,
  ExamSettings,
  PredefinedExamsResponse,
} from '@/pages/exam/types/Exam.interface';
import authService from './authService';
import axiosInstance from '@/config/AxiosConfig';

const GUEST_IDENTIFIER_COOKIE = 'exam_guest_identifier';

// Create API instance with auth token and guest identifier
const createApiInstance = () => {
  const token = authService.getToken();
  const guestId = authService.getGuestIdentifier();
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else if (guestId) {
    authService.setCookieGuestIdentifier(guestId);
    axiosInstance.defaults.headers.common[
      'Cookie'
    ] = `${GUEST_IDENTIFIER_COOKIE}=${guestId}`;
  }
  return axiosInstance;
};

const api = createApiInstance();

const examService = {
  // Create a new exam
  createExam: async (examData: ExamSettings) => {
    const token = authService.getToken();

    // Extract guest_identifier if present
    let { guest_identifier, ...examSettings } = examData;

    // Check if guest_identifier exists in cookies
    const guestIdFromCookie = authService.getGuestIdentifier();
    // If guest_identifier is not provided and exists in cookies, use it
    // Otherwise, generate a new one
    if (!guest_identifier && guestIdFromCookie) {
      guest_identifier = guestIdFromCookie;
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
        authService.setCookieGuestIdentifier(
          response.data.data.guest_identifier
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
    participant_id?: number
  ) => {
    const token = authService.getToken();

    try {
      const payload = {
        id: participant_id || 0,
        user_id: token ? 0 : null,
        exam_id: Number(examId),
        duration,
        ExamAnswers: Array.isArray(answers) ? answers : [],
      };

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
    const token = authService.getToken();

    try {
      // Nếu đã login (có token), gọi API result thông thường
      // Nếu chưa login (không có token) và có guest_identifier, gọi API guest_result
      const endpoint = token
        ? `/exam/${resultId}/result?participant=${participantId}`
        : `/exam/${resultId}/guest_result?participant=${participantId}`;

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
    try {
      const response = await api.post('/exam_participant/guest/start', payload);

      // Store guest_identifier in cookie if present in response
      if (response.data?.data?.guest_identifier) {
        authService.setCookieGuestIdentifier(
          response.data.data.guest_identifier
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
