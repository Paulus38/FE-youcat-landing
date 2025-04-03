export interface TopPlayer {
  id: number;
  username: string;
  Candidate: {
    id: number;
    name: string;
    email: string;
    image: string | null;
  };
  ExamParticipants: {
    score: number;
  }[];
  totalScore: number;
}

export const mockTopPlayers: TopPlayer[] = [
  { 
    id: 8, 
    username: "cherrytran201014@gmail.com", 
    Candidate: {
      id: 7,
      name: "Cherry",
      email: "cherrytran201014@gmail.com",
      image: "avatar-9.webp"
    },
    ExamParticipants: [
      { score: 2.67 },
      { score: 0.67 },
      { score: 7.33 },
      { score: 2 },
      { score: 0 }
    ],
    totalScore: 12.67
  },
  { 
    id: 1, 
    username: "cd", 
    Candidate: {
      id: 1,
      name: "Name",
      email: "thaiantran065@gmail.com",
      image: null
    },
    ExamParticipants: [
      { score: 2.67 },
      { score: 1.33 },
      { score: 0 }
    ],
    totalScore: 4
  },
  { 
    id: 2, 
    username: "user3", 
    Candidate: {
      id: 2,
      name: "John Smith",
      email: "john@example.com",
      image: "avatar-3.webp"
    },
    ExamParticipants: [
      { score: 1.5 },
      { score: 1.5 }
    ],
    totalScore: 3
  },
  { 
    id: 3, 
    username: "user4", 
    Candidate: {
      id: 3,
      name: "Maria Garcia",
      email: "maria@example.com",
      image: "avatar-5.webp"
    },
    ExamParticipants: [
      { score: 1 },
      { score: 1 }
    ],
    totalScore: 2
  },
  { 
    id: 4, 
    username: "user5", 
    Candidate: {
      id: 4,
      name: "Robert Wilson",
      email: "robert@example.com",
      image: "avatar-7.webp"
    },
    ExamParticipants: [
      { score: 0.5 },
      { score: 0.5 }
    ],
    totalScore: 1
  }
]; 