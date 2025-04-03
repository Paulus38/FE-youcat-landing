import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface QuizButtonProps extends ButtonProps {
  questionId: number;
}

const QuizButton: React.FC<QuizButtonProps> = ({ questionId, children, ...props }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleStartQuiz = () => {
    navigate(`/quiz/single-question/${questionId}`);
  };
  
  return (
    <Button
      onClick={handleStartQuiz}
      variant="contained"
      color="primary"
      {...props}
    >
      {children || t('startQuiz') || 'Start Quiz'}
    </Button>
  );
};

export default QuizButton; 