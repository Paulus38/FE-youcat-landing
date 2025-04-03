import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  Button, 
  CircularProgress,
  Alert,
  Container,
  Card,
  CardContent
} from '@mui/material';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { QuizAnswer, QuizQuestion, QuizQuestionResponse } from '../../types/question';

interface QuizSingleQuestionProps {
  questionId: number;
}

const QuizSingleQuestion: React.FC<QuizSingleQuestionProps> = ({ questionId }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<QuizQuestionResponse>(
          `${import.meta.env.VITE_API_URL}/questions/${questionId}/quiz`
        );
        
        if (response.data.statusCode === 200) {
          setQuestion(response.data.data);
        } else {
          setError(response.data.message || t('errorLoadingQuestion') || 'Error loading question');
        }
      } catch (err) {
        console.error('Error fetching question:', err);
        setError(t('errorLoadingQuestion') || 'Error loading question');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId, t]);

  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !question) return;
    
    // Find the correct answer
    const correctAnswerObj = question.answers.find(answer => answer.is_correct);
    if (correctAnswerObj) {
      setCorrectAnswer(correctAnswerObj.id);
    }
    
    setIsSubmitted(true);
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setCorrectAnswer(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">{error}</Alert>
    );
  }

  if (!question) {
    return (
      <Alert severity="warning">{t('questionNotFound') || 'Question not found'}</Alert>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {question.name}
        </Typography>
        
        {question.description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {question.description}
          </Typography>
        )}
        
        <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
          <RadioGroup 
            value={selectedAnswer} 
            onChange={handleAnswerSelect}
          >
            {question.answers.map((answer) => (
              <Card 
                key={answer.id}
                variant="outlined" 
                sx={{ 
                  mb: 2, 
                  borderRadius: 2,
                  borderWidth: 2,
                  borderColor: isSubmitted 
                    ? answer.is_correct 
                      ? 'success.main' 
                      : selectedAnswer === answer.id && !answer.is_correct 
                        ? 'error.main' 
                        : 'divider'
                    : selectedAnswer === answer.id 
                      ? 'primary.main' 
                      : 'divider',
                  bgcolor: isSubmitted 
                    ? answer.is_correct 
                      ? 'success.light' 
                      : selectedAnswer === answer.id && !answer.is_correct 
                        ? 'error.light' 
                        : 'background.paper'
                    : 'background.paper',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: isSubmitted ? undefined : 'primary.main',
                    bgcolor: isSubmitted ? undefined : 'action.hover',
                  }
                }}
              >
                <CardContent>
                  <FormControlLabel 
                    value={answer.id} 
                    control={<Radio />} 
                    label={answer.name} 
                    disabled={isSubmitted}
                    sx={{ 
                      width: '100%',
                      '.MuiFormControlLabel-label': {
                        width: '100%',
                        fontWeight: isSubmitted && answer.is_correct ? 'bold' : 'normal'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </FormControl>
        
        {isSubmitted && (
          <Box mt={4}>
            <Alert severity={selectedAnswer === correctAnswer ? "success" : "error"} sx={{ mb: 2 }}>
              {selectedAnswer === correctAnswer 
                ? (t('correctAnswer') || 'Correct answer!') 
                : (t('incorrectAnswer') || 'Incorrect answer!')}
            </Alert>
            
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleTryAgain}
              fullWidth
            >
              {t('tryAgain') || 'Try Again'}
            </Button>
          </Box>
        )}
        
        {!isSubmitted && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            fullWidth
            sx={{ mt: 2 }}
          >
            {t('checkAnswer') || 'Check Answer'}
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default QuizSingleQuestion; 