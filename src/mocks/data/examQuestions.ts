export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  category: string;
  correctOptionId: string;
}

// Define a larger pool of sample questions with correct answers for randomization
export const sampleResultQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is the YOUCAT?',
    category: 'General',
    correctOptionId: 'q1_b',
    options: [
      { id: 'q1_a', text: 'A youth magazine about cats' },
      { id: 'q1_b', text: 'A Catholic youth catechism' },
      { id: 'q1_c', text: 'A social networking app for young Catholics' },
      { id: 'q1_d', text: 'A youth retreat program' }
    ]
  },
  {
    id: 'q2',
    text: 'What are the three theological virtues?',
    category: 'Doctrine',
    correctOptionId: 'q2_c',
    options: [
      { id: 'q2_a', text: 'Prudence, justice, and temperance' },
      { id: 'q2_b', text: 'Humility, chastity, and patience' },
      { id: 'q2_c', text: 'Faith, hope, and charity (love)' },
      { id: 'q2_d', text: 'Wisdom, understanding, and knowledge' }
    ]
  },
  {
    id: 'q3',
    text: 'How many sacraments are there in the Catholic Church?',
    category: 'Sacraments',
    correctOptionId: 'q3_c',
    options: [
      { id: 'q3_a', text: '3' },
      { id: 'q3_b', text: '5' },
      { id: 'q3_c', text: '7' },
      { id: 'q3_d', text: '12' }
    ]
  },
  {
    id: 'q4',
    text: 'What is the first of the Ten Commandments?',
    category: 'Ten Commandments',
    correctOptionId: 'q4_c',
    options: [
      { id: 'q4_a', text: 'Remember to keep holy the Sabbath' },
      { id: 'q4_b', text: 'You shall not take the name of the Lord your God in vain' },
      { id: 'q4_c', text: 'I am the Lord your God; you shall not have strange gods before me' },
      { id: 'q4_d', text: 'Honor your father and mother' }
    ]
  },
  {
    id: 'q5',
    text: 'What is the Holy Trinity?',
    category: 'Doctrine',
    correctOptionId: 'q5_b',
    options: [
      { id: 'q5_a', text: 'Three different gods working together' },
      { id: 'q5_b', text: 'Three divine persons in one God' },
      { id: 'q5_c', text: 'Three names for the same person' },
      { id: 'q5_d', text: 'Three historical manifestations of God' }
    ]
  },
  {
    id: 'q6',
    text: 'What is the significance of baptism?',
    category: 'Sacraments',
    correctOptionId: 'q6_c',
    options: [
      { id: 'q6_a', text: 'It is a cultural tradition with no spiritual significance' },
      { id: 'q6_b', text: 'It is a symbolic act representing cleanliness' },
      { id: 'q6_c', text: 'It cleanses us from original sin and makes us members of the Church' },
      { id: 'q6_d', text: 'It is only necessary for adults who choose the faith' }
    ]
  },
  {
    id: 'q7',
    text: 'What is the Magisterium?',
    category: 'Church Structure',
    correctOptionId: 'q7_b',
    options: [
      { id: 'q7_a', text: 'A Catholic university for theological studies' },
      { id: 'q7_b', text: 'The teaching authority of the Catholic Church' },
      { id: 'q7_c', text: 'The building where the Pope resides' },
      { id: 'q7_d', text: 'A special prayer said during Mass' }
    ]
  },
  {
    id: 'q8',
    text: 'What is meant by the "Real Presence" in the Eucharist?',
    category: 'Sacraments',
    correctOptionId: 'q8_c',
    options: [
      { id: 'q8_a', text: 'The priest\'s spiritual presence during Mass' },
      { id: 'q8_b', text: 'The symbolic representation of Christ\'s last supper' },
      { id: 'q8_c', text: 'Christ\'s actual presence - body, blood, soul, and divinity in the Eucharist' },
      { id: 'q8_d', text: 'The community\'s collective presence at Mass' }
    ]
  },
  {
    id: 'q9',
    text: 'What is the main purpose of prayer?',
    category: 'Spirituality',
    correctOptionId: 'q9_c',
    options: [
      { id: 'q9_a', text: 'To ask God for material things we want' },
      { id: 'q9_b', text: 'To fulfill a religious obligation' },
      { id: 'q9_c', text: 'To build a relationship with God' },
      { id: 'q9_d', text: 'To impress others with our devotion' }
    ]
  },
  {
    id: 'q10',
    text: 'What does "Catholic" mean?',
    category: 'General',
    correctOptionId: 'q10_b',
    options: [
      { id: 'q10_a', text: 'Roman' },
      { id: 'q10_b', text: 'Universal' },
      { id: 'q10_c', text: 'Holy' },
      { id: 'q10_d', text: 'Traditional' }
    ]
  },
  {
    id: 'q11',
    text: 'What is the Immaculate Conception?',
    category: 'Doctrine',
    correctOptionId: 'q11_a',
    options: [
      { id: 'q11_a', text: 'The doctrine that Mary was conceived without original sin' },
      { id: 'q11_b', text: 'The virgin birth of Jesus' },
      { id: 'q11_c', text: 'The belief that Jesus was sinless' },
      { id: 'q11_d', text: 'The conception of John the Baptist' }
    ]
  },
  {
    id: 'q12',
    text: 'Who is the patron saint of youth?',
    category: 'Saints',
    correctOptionId: 'q12_c',
    options: [
      { id: 'q12_a', text: 'St. Francis of Assisi' },
      { id: 'q12_b', text: 'St. Thérèse of Lisieux' },
      { id: 'q12_c', text: 'St. John Bosco' },
      { id: 'q12_d', text: 'St. Teresa of Calcutta' }
    ]
  }
]; 