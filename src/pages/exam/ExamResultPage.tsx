import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  Alert,
  CircularProgress,
  List,
  ListItem,
  Grid,
  Stack,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  CheckCircle as CorrectIcon, 
  Cancel as WrongIcon,
  Share as ShareIcon,
  Home as HomeIcon,
  Refresh as RetryIcon,
  EmojiEvents as TrophyIcon,
  ArrowBack as BackIcon,
  ArrowForward as ForwardIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle
} from '@mui/icons-material';
import { useParams, useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import examService from '@/services/examService';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import { useBuild } from '@context/BuildContext';

// New interfaces that match the API response structure
interface ExamAnswer {
  id: number;
  content: string;
  order: number;
  code_option: string;
  is_correct: number;
  UserAnswers: any[];
}

interface ExamQuestion {
  id: number;
  content: string;
  order: number;
  Question: {
    id: number;
    name: string;
    description: string;
    QuestionCategory?: any;
  };
  ExamAnswers: ExamAnswer[];
}

interface Book {
  id: number;
  name: string;
}

interface ApiExamResult {
  id: number;
  duration: number;
  title: string;
  description: string | null;
  total_question: number;
  Book: Book;
  ExamQuestions: ExamQuestion[];
  ExamParticipants: any[];
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: ApiExamResult;
}

// For compatibility with the existing component
interface UserAnswer {
  questionId: string | number;
  optionId: string | number;
  isCorrect: boolean;
}

interface Option {
  id: string | number;
  text: string;
}

interface Question {
  id: string | number;
  text: string;
  category?: string;
  options: Option[];
  correctOptionId: string | number;
}

interface ExamResult {
  id: string | number;
  title: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  questions: Question[];
  userAnswers: UserAnswer[];
}

const ExamResultPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { setIsBuilding } = useBuild();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [reviewingQuestion, setReviewingQuestion] = useState(0);
  
  // Format time spent
  const formatTimeSpent = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };
  
  // Calculate performance level
  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { label: t('excellent'), color: 'success' };
    if (score >= 70) return { label: t('good'), color: 'primary' };
    if (score >= 50) return { label: t('average'), color: 'warning' };
    return { label: t('needsImprovement'), color: 'error' };
  };
  
  // Transform API response to match the expected format
  const transformApiResponse = (apiResponse: ApiResponse): ExamResult => {
    const apiData = apiResponse.data;
    
    // Calculate number of correct answers based on each question
    const userAnswers: UserAnswer[] = [];
    const questions: Question[] = apiData.ExamQuestions.map(eq => {
      // Find correct answer
      const correctAnswer = eq.ExamAnswers.find(a => a.is_correct === 1);
      const correctOptionId = correctAnswer ? correctAnswer.id : 0;
      
      // Find user's answer from UserAnswers array
      const userAnswer = eq.ExamAnswers.find(answer => answer.UserAnswers && answer.UserAnswers.length > 0);
      const userOptionId = userAnswer ? userAnswer.id : 0;
      
      // Determine if user's answer is correct
      const isCorrect = userOptionId === correctOptionId;
      
      // Track user answer for this question
      userAnswers.push({
        questionId: eq.id,
        optionId: userOptionId,
        isCorrect
      });
      
      // Map to Question format
      return {
        id: eq.id,
        text: eq.content,
        category: eq.Question?.QuestionCategory ? eq.Question?.QuestionCategory?.name : apiData.Book?.name,
        options: eq.ExamAnswers.map(answer => ({
          id: answer.id,
          text: answer.content
        })),
        correctOptionId
      };
    });
    const totalTimeSpent = apiData.ExamParticipants[0].duration * 60;
    // Calculate score and correct answers
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / apiData.total_question) * 100);
    
    return {
      id: apiData.id,
      title: apiData.title,
      score,
      totalQuestions: apiData.total_question,
      correctAnswers,
      totalTimeSpent: totalTimeSpent, // Convert minutes to seconds
      questions,
      userAnswers
    };
  };
  
  // Fetch exam result
  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        setIsBuilding(true);
        setLoading(true);
        
        if (!resultId) {
          throw new Error('Result ID is missing');
        }
        
        const response = await examService.getExamResult(resultId, location.state?.participantId);
        
        // Transform API response to match expected format
        const transformedResult = transformApiResponse(response);
        setExamResult(transformedResult);
      } catch (error) {
        console.error("Error fetching exam result:", error);
        setError('Failed to load result data. Please try again.');
      } finally {
        setLoading(false);
        setIsBuilding(false);
      }
    };
    
    fetchExamResult();
  }, [resultId]);
  
  const handleNextQuestion = () => {
    if (!examResult) return;
    
    if (reviewingQuestion < examResult.questions.length - 1) {
      setReviewingQuestion(reviewingQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (reviewingQuestion > 0) {
      setReviewingQuestion(reviewingQuestion - 1);
    }
  };
  
  const getUserAnswer = (questionId: string | number) => {
    return examResult?.userAnswers.find(answer => answer.questionId === questionId);
  };
  
  const getOptionClass = (question: Question, optionId: string | number) => {
    const userAnswer = getUserAnswer(question.id);
    
    if (optionId === question.correctOptionId) {
      return {
        bgcolor: 'success.lighter',
        color: 'success.dark',
        border: '1px solid',
        borderColor: 'success.main'
      };
    }
    
    if (userAnswer?.optionId === optionId && !userAnswer.isCorrect) {
      return {
        bgcolor: 'error.lighter',
        color: 'error.dark',
        border: '1px solid',
        borderColor: 'error.main'
      };
    }
    
    return {
      bgcolor: 'background.paper',
      borderColor: 'divider'
    };
  };
  
  const handleRetakeExam = () => {
    navigate('/exam/create');
  };
  
  const handleShareResult = () => {
    if (navigator.share && isMobile) {
      navigator.share({
        title: `My YOUCAT Quiz Result: ${examResult?.score}%`,
        text: `I scored ${examResult?.score}% on the ${examResult?.title} quiz. Take the quiz yourself!`,
        url: window.location.href
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Would show a notification here in a real app
      alert('Result link copied to clipboard!');
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  if (error || !examResult) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Failed to load result data. Please try again.'}
        </Alert>
        <Button 
          variant="contained" 
          component={RouterLink} 
          to="/exam/create"
        >
          {t('takeAnotherQuiz')}
        </Button>
      </Container>
    );
  }
  
  const performanceLevel = getPerformanceLevel(examResult.score);
  const currentQuestion = examResult.questions[reviewingQuestion];
  const userAnswer = getUserAnswer(currentQuestion.id);
  
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Result Summary */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          mb: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
            mb: 3
          }}
        >
          <Box sx={{ mb: { xs: 3, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
              {t('examResults')}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {examResult.title}
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              borderRadius: 3,
              bgcolor: 'primary.lighter',
              minWidth: 120,
              height: 120
            }}
          >
            <Typography variant="h3" fontWeight={700} color="primary.main">
              {examResult.score}%
            </Typography>
            <Typography variant="body2" fontWeight={500} color="primary.dark">
              {t('yourScore')}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('correctAnswers')}
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {examResult.correctAnswers} / {examResult.totalQuestions}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component={TrophyIcon}
                sx={{ color: 'warning.main', mr: 1 }}
              />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('performance')}
                </Typography>
                <Typography variant="h6" fontWeight={600} color={`${performanceLevel.color}.main`}>
                  {performanceLevel.label}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="span"
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: 'info.lighter',
                  color: 'info.main',
                  mr: 1
                }}
              >
                <Typography variant="caption" fontWeight={700}>
                  ?
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('totalQuestions')}
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {examResult.totalQuestions}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                component={AccessTimeIcon} 
                sx={{ color: 'text.secondary', mr: 1 }} 
              />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('timeSpent')}
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {formatTimeSpent(examResult.totalTimeSpent)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            component={RouterLink}
            to="/"
          >
            {t('home')}
          </Button>
          
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              onClick={handleShareResult}
              sx={{ 
                display: { xs: 'none', sm: 'flex' } 
              }}
            >
              {t('shareResults')}
            </Button>
            
            <IconButton 
              color="primary" 
              onClick={handleShareResult}
              sx={{ 
                display: { xs: 'flex', sm: 'none' },
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <ShareIcon />
            </IconButton>
            
            <Button
              variant="contained"
              startIcon={<RetryIcon />}
              onClick={handleRetakeExam}
            >
              {t('takeAnotherQuiz')}
            </Button>
          </Stack>
        </Box>
        
        {!isAuthenticated && (
          <Alert severity="info" sx={{ mt: 3 }}>
            {t('signInToSave')}
          </Alert>
        )}
      </Paper>
      
      {/* Question Review */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          {t('reviewAnswers')}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('questionOf').replace('{current}', (reviewingQuestion + 1).toString()).replace('{total}', examResult.questions.length.toString())}
        </Typography>
        
        <Chip 
          label={currentQuestion.category || 'General'} 
          size="small" 
          color="primary" 
          variant="outlined"
          sx={{ mb: 2 }}
        />
        
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, flex: 1 }}>
                {currentQuestion.text}
              </Typography>
              
              {userAnswer?.isCorrect ? (
                <Chip 
                  icon={<CorrectIcon />} 
                  label={t('correct')} 
                  color="success" 
                  size="small"
                />
              ) : (
                <Chip 
                  icon={<WrongIcon />} 
                  label={t('incorrect')} 
                  color="error" 
                  size="small"
                />
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <List sx={{ p: 0 }}>
              {currentQuestion.options.map((option) => (
                <ListItem 
                  key={option.id}
                  sx={{ 
                    p: 0,
                    mb: 1
                  }}
                >
                  <Box 
                    sx={{ 
                      width: '100%', 
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      ...getOptionClass(currentQuestion, option.id)
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ flex: 1 }}>
                        {option.text}
                      </Typography>
                      
                      {option.id === currentQuestion.correctOptionId && (
                        <Tooltip title={t('correct')}>
                          <CorrectIcon color="success" />
                        </Tooltip>
                      )}
                      
                      {userAnswer?.optionId === option.id && !userAnswer.isCorrect && (
                        <Tooltip title={t('incorrect')}>
                          <WrongIcon color="error" />
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            startIcon={<BackIcon />}
            onClick={handlePrevQuestion}
            disabled={reviewingQuestion === 0}
          >
            {t('previous')}
          </Button>
          
          <Button
            variant="contained"
            endIcon={<ForwardIcon />}
            onClick={handleNextQuestion}
            disabled={reviewingQuestion === examResult.questions.length - 1}
          >
            {t('next')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ExamResultPage; 