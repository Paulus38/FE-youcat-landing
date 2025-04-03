import { QuizQuestion } from '../data/sampleQuestions';

// Implement a function to randomly select questions from the pool
export const getRandomQuestions = <T>(pool: T[], count: number): T[] => {
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