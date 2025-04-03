import axios from 'axios';
import { API_BASE_URL, getUploadUrl } from '../config/api';

// API response interface matching the raw data structure from backend
export interface ApiProfileResponse {
  data: {
    id: number;
    username: string;
    Candidate?: {
      name: string;
      email: string;
      image?: string;
    };
    ExamParticipants?: Array<{
      id: number;
      user_id: number;
      duration: number;
      score: number;
      start_time: string;
      end_time: string;
      is_finished: number;
      Exam?: {
        id: number;
        duration: number;
        total_question: number;
        status: number;
      };
      UserAnswers?: Array<{
        id: number;
        selected_answer_id: number;
        is_correct: number;
      }>;
    }>;
  };
}

export interface ProfileData {
  id: number;
  username: string;
  name: string;
  email: string;
  image: string | null;
  activityHistory: any[];
  statistics: {
    quizzesCompleted: number;
    averageScore: number;
    achievements: number;
    totalPoints: number;
  };
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
}

export interface UpdateAvatarPayload {
  avatar: string;
}

export interface QuizResultDetail {
  id: number;
  quizId: number;
  quizTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
  duration: number;
  questions: Array<{
    id: number;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
}

const profileService = {
  // Get user profile data
  getProfile: async (accessToken: string): Promise<ProfileData> => {
    try {
      const response = await axios.get<ApiProfileResponse>(`${API_BASE_URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      // Process the response from the new API format
      const responseData = response.data.data;
      
      // Transform the API data to a more usable format for the UI
      return {
        id: responseData.id,
        username: responseData.username,
        name: responseData.Candidate?.name || responseData.username,
        email: responseData.Candidate?.email || responseData.username,
        image: responseData.Candidate?.image || null,
        
        // Process exam history
        activityHistory: responseData.ExamParticipants?.map((exam: any) => {
          // Count correct answers from UserAnswers where is_correct=1
          const correctAnswersCount = exam.UserAnswers?.filter((answer: any) => answer.is_correct === 1).length || 0;
          
          return {
            id: exam.id,
            quizId: exam.Exam?.id || '',
            quizTitle: `Quiz #${exam.Exam?.id || 'Unknown'}`,
            score: parseFloat(((correctAnswersCount / exam.Exam?.total_question) * 100).toFixed(1)) || 0,
            correctAnswers: correctAnswersCount,
            totalQuestions: exam.Exam?.total_question || 0,
            completedAt: exam.end_time,
            duration: exam.duration,
            questions: exam.UserAnswers?.map((answer: any) => ({
              question: answer.Question?.content || 'Unknown question',
              userAnswer: answer.Answer?.content || 'No answer provided',
              correctAnswer: answer.Question?.Answers?.find((a: any) => a.is_correct === 1)?.content || 'Unknown',
              isCorrect: answer.is_correct === 1
            })) || []
          };
        }) || [],
        
        // Compute statistics
        statistics: {
          quizzesCompleted: responseData.ExamParticipants?.length || 0,
          averageScore: responseData.ExamParticipants?.length ? 
            parseFloat((responseData.ExamParticipants.reduce((acc: number, exam: any) => {
              const correctCount = exam.UserAnswers?.filter((answer: any) => answer.is_correct === 1).length || 0;
              const totalQuestions = exam.Exam?.total_question || 0;
              return acc + (totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0);
            }, 0) / responseData.ExamParticipants.length).toFixed(1)) : 0,
          achievements: 0, // Placeholder - no achievements data in API yet
          totalPoints: responseData.ExamParticipants?.reduce((acc: number, exam: any) => 
            acc + (exam.UserAnswers?.filter((answer: any) => answer.is_correct === 1).length || 0), 0) || 0,
        }
      };
    } catch (error) {
      console.error('Error fetching profile data:', error);
      throw error;
    }
  },

  // Update user profile information
  updateProfile: async (accessToken: string, profileData: UpdateProfilePayload): Promise<void> => {
    try {
      await axios.put(
        `${API_BASE_URL}/user/update-profile`,
        profileData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Update user avatar
  updateAvatar: async (accessToken: string, avatarData: UpdateAvatarPayload): Promise<void> => {
    try {
      await axios.put(
        `${API_BASE_URL}/user/update-avatar`,
        avatarData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      console.error('Error updating avatar:', error);
      throw error;
    }
  },

  // Get the uploads base URL for images
  getUploadsUrl: (imagePath: string): string => {
    return getUploadUrl(imagePath);
  }
};

export default profileService; 