// Data exports
export { sampleResultQuestions } from './data/examQuestions';
export type { Question, Option } from './data/examQuestions';
export { leaderboardData } from './data/leaderboard';
export { mockTopPlayers } from './data/topPlayers';
export type { TopPlayer } from './data/topPlayers';
export { sampleQuestions } from './data/sampleQuestions';
export type { QuizQuestion } from './data/sampleQuestions';

// Utility exports
export { 
  getRandomQuestions,
  generateRandomUserAnswers,
  generateMockExamResult
} from './utils/examUtils';
export type { UserAnswer, ExamResult } from './utils/examUtils';

// Quiz utility exports
export { getRandomQuestions as getRandomQuizQuestions } from './utils/quizUtils'; 