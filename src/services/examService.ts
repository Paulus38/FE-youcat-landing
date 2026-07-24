import authService from '@services/authService';
import axiosInstance from '@config/axiosConfig';
import {
  ExamResponse,
  ExamSettings,
  PredefinedExamsResponse,
} from '@interfaces/Exam.interface';
import { BooksResponse } from '@interfaces/Book.interface';
import { UserChooseAnswer } from '@interfaces/UserAnswer.interface';

const GUEST_IDENTIFIER_COOKIE = 'exam_guest_identifier';

/** Guest-only: reuse cookie UUID or create one and persist on FE domain. */
const ensureGuestIdentifier = (): string => {
  const existing = authService.getGuestIdentifier();
  if (existing) {
    return existing;
  }
  const generated =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
  authService.setCookieGuestIdentifier(generated);
  return generated;
};

// Create API instance with auth token and guest identifier
const createApiInstance = () => {
  const token = authService.getToken();
  const guestId = authService.getGuestIdentifier();
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else if (guestId) {
    authService.setCookieGuestIdentifier(guestId);
    // Note: browsers ignore custom Cookie headers; guest id must go in request body.
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

    const payload: Record<string, unknown> = {
      ...examSettings,
    };

    // Guest path only — do not alter authenticated create payload
    if (!token) {
      guest_identifier = guest_identifier || ensureGuestIdentifier();
      authService.setCookieGuestIdentifier(guest_identifier);
      payload.guest_identifier = guest_identifier;
    }

    try {
      // Use different endpoints based on authentication status
      const endpoint = token ? '/exam/create/auth' : '/exam/create/guest';
      const response = await api.post<ExamResponse>(endpoint, payload);

      // Prefer server-issued guest id (keeps FE cookie in sync with BE)
      if (!token && response.data?.data?.guest_identifier) {
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
    answers: UserChooseAnswer[],
    duration: number,
    participant_id?: number
  ) => {
    const token = authService.getToken();

    try {
      const payload: Record<string, unknown> = {
        id: participant_id || 0,
        user_id: token ? 0 : null,
        exam_id: Number(examId),
        duration,
        ExamAnswers: Array.isArray(answers) ? answers : [],
      };

      // Guest path only: BE cannot rely on cross-domain cookies
      if (!token) {
        const guest_identifier = authService.getGuestIdentifier();
        if (!guest_identifier) {
          throw new Error(
            'Guest identifier is missing. Please create the exam again.'
          );
        }
        payload.guest_identifier = guest_identifier;
      }

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
      // Auth: JWT result API
      // Guest: BE only reads httpOnly cookie exam_guest_identifier (no body/query).
      // Local: use Vite proxy + VITE_API_URL=/api so that cookie is same-origin.
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
      const guest_identifier =
        payload.guest_identifier || ensureGuestIdentifier();
      authService.setCookieGuestIdentifier(guest_identifier);

      const response = await api.post('/exam_participant/guest/start', {
        ...payload,
        guest_identifier,
      });

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
