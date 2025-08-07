import { sampleResultQuestions, Question } from '../data/examQuestions';

export interface UserAnswer {
  question_id: string;
  option_id: string;
  isCorrect: boolean;
}

//! export interface ExamResult {
//   id: string;
//   title: string;
//   date: string;
//   score: number;
//   totalQuestions: number;
//   correctAnswers: number;
//   totalTimeSpent: number; // in seconds
//   questions: Question[];
//   userAnswers: UserAnswer[];
// }

// Get random questions from the sample pool
export const getRandomQuestions = (
  pool: Question[],
  count: number
): Question[] => {
  // Create a copy of the pool to avoid modifying the original
  const shuffled = [...pool];

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first 'count' elements
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Generate random user answers based on questions (with some correct and some incorrect)
export const generateRandomUserAnswers = (
  questions: Question[]
): UserAnswer[] => {
  return questions.map((question) => {
    // Create a random boolean to determine if the answer is correct (75% chance of being correct)
    const isCorrect = Math.random() < 0.75;

    // If the answer is correct, use the correct option ID
    if (isCorrect) {
      return {
        question_id: question.id,
        option_id: question.correctOptionId,
        isCorrect: true,
      };
    } else {
      // If the answer is incorrect, pick a random wrong option
      const wrongOptions = question.options.filter(
        (option) => option.id !== question.correctOptionId
      );
      const randomWrongOption =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

      return {
        question_id: question.id,
        option_id: randomWrongOption.id,
        isCorrect: false,
      };
    }
  });
};

//! Generate a mock exam result with random questions and answers
//! export const generateMockExamResult = (resultId: string = 'mock-result'): ExamResult => {
//   // Get 8 random questions
//   const questions = getRandomQuestions(sampleResultQuestions, 8);

//   // Generate random user answers
//   const userAnswers = generateRandomUserAnswers(questions);

//   // Calculate score and correct answers
//   const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
//   const score = Math.round((correctAnswers / questions.length) * 100);

//   // Generate a random time spent (between 5 and 20 minutes)
//   const totalTimeSpent = Math.floor(Math.random() * (1200 - 300 + 1)) + 300;

//   // Create the exam result
//   return {
//     id: resultId,
//     title: 'YOUCAT Faith Quiz',
//     date: new Date().toISOString(),
//     score,
//     totalQuestions: questions.length,
//     correctAnswers,
//     totalTimeSpent,
//     questions,
//     userAnswers
//   };
// };
