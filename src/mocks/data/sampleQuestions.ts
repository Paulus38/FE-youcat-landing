export interface QuizQuestion {
  id?: string;
  question_name: string;
  answer_name: string;
}

// Define a larger pool of sample questions for randomization
export const sampleQuestions: QuizQuestion[] = [
  {
    question_name: 'What is the YOUCAT?',
    answer_name: 'YOUCAT is the Catholic Church\'s youth catechism, designed to teach young people about the Catholic faith.'
  },
  {
    question_name: 'What are the seven Sacraments?',
    answer_name: 'Baptism, Confirmation, Eucharist, Reconciliation, Anointing of the Sick, Holy Orders, and Matrimony.'
  },
  {
    question_name: 'What is the Holy Trinity?',
    answer_name: 'The Holy Trinity is the central mystery of the Christian faith - one God in three divine persons: Father, Son, and Holy Spirit.'
  },
  {
    question_name: 'What is the Eucharist?',
    answer_name: 'The Eucharist is the sacrament in which Jesus Christ gives his Body and Blood for us, so that we too might give ourselves to him in love and be united with him in Holy Communion.'
  },
  {
    question_name: 'What is the purpose of prayer?',
    answer_name: 'Prayer is a vital relationship with God, a communion with God through which we connect with Him, listen to Him, and allow Him to transform us.'
  },
  {
    question_name: 'What are the Ten Commandments?',
    answer_name: 'The Ten Commandments are divine laws given by God to guide humanity in moral living, establishing the foundation for our relationship with God and with one another.'
  },
  {
    question_name: 'What is the mission of the Church?',
    answer_name: 'The mission of the Church is to proclaim and spread the Good News of Jesus Christ, to celebrate the sacraments, and to exercise the ministry of charity to all people.'
  },
  {
    question_name: 'What is the meaning of the Incarnation?',
    answer_name: 'The Incarnation is the mystery of the Son of God assuming human nature and becoming man in Jesus Christ, revealing God to us and reconciling us to Him.'
  },
  {
    question_name: 'What are the Beatitudes?',
    answer_name: 'The Beatitudes are the teachings of Jesus in the Sermon on the Mount that describe the qualities of the citizens of the Kingdom of God and the path to true happiness.'
  },
  {
    question_name: 'What is the Communion of Saints?',
    answer_name: 'The Communion of Saints is the spiritual solidarity which binds together the faithful on earth, the souls in purgatory, and the saints in heaven in the unity of the Church.'
  }
]; 