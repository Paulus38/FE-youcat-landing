import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Timer as TimerIcon,
  ArrowForward as NextIcon,
  ArrowBack as PrevIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import examService from '@/services/examService';

interface ExamAnswer {
  id: number;
  order: number;
  content: string;
  code_option: string;
}

interface ExamQuestion {
  id: number;
  order: number;
  content: string;
  ExamAnswers: ExamAnswer[];
}

interface ExamParticipants {
  id: number;
}
interface Book {
  id: number;
  name: string;
}

interface ExamType {
  id: number;
  name: string;
}

interface ExamData {
  id: number;
  title: string;
  status: number;
  user_id: number | null;
  description: string | null;
  duration: number; // in minutes
  total_question: number;
  User: any | null;
  Book: Book;
  ExamType: ExamType;
  ExamQuestions: ExamQuestion[];
  guest_identifier?: string;
  ExamParticipants: ExamParticipants[];
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: ExamData;
}

interface UserAnswer {
  questionId: number;
  optionId: number;
}

const TakeExamPage: React.FC = () => {
  const theme = useTheme();
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Extract participant_id from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const participantId = searchParams.get('participant_id')
    ? Number(searchParams.get('participant_id'))
    : undefined;

  // Calculate progress percentage
  const progress = examData
    ? ((currentQuestionIndex + 1) / examData.ExamQuestions.length) * 100
    : 0;

  // Get current question
  const currentQuestion = examData?.ExamQuestions[currentQuestionIndex];

  // Find user's answer for current question
  const currentAnswer = userAnswers.find(
    (answer) => currentQuestion && answer.questionId === currentQuestion.id
  );

  // Format remaining time
  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? `${hours}:` : ''}${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Timer effect
  useEffect(() => {
    if (!examData || loading) return;

    const totalSeconds = examData.duration * 60;
    setRemainingTime(totalSeconds);

    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          // Auto-submit when time is up
          handleSubmitExam();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [examData, loading]);

  // Fetch exam data
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);

        if (!examId) {
          setError('Exam ID is missing');
          setLoading(false);
          return;
        }

        // Fetch the exam data from the API
        const response = await examService.getExam(examId);
        const apiResponse = response as unknown as ApiResponse;

        if (apiResponse.statusCode === 200) {
          const examData = apiResponse.data;
          setExamData(examData);
          setRemainingTime(examData.duration * 60);

          // Initialize user answers array
          const initialAnswers = examData.ExamQuestions.map((question) => ({
            questionId: question.id,
            optionId: 0, // Default to 0 (no selection)
          }));

          setUserAnswers(initialAnswers);
        } else {
          setError(apiResponse.message || 'Failed to load exam data');
        }
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Failed to load exam data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = parseInt(event.target.value);

    if (!currentQuestion) return;

    setUserAnswers((prevAnswers) => {
      return prevAnswers.map((answer) => {
        if (answer.questionId === currentQuestion.id) {
          return { ...answer, optionId };
        }
        return answer;
      });
    });
  };

  const handleNextQuestion = () => {
    if (!examData) return;

    if (currentQuestionIndex < examData.ExamQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOpenConfirmSubmit = () => {
    setConfirmSubmitOpen(true);
  };

  const handleCloseConfirmSubmit = () => {
    setConfirmSubmitOpen(false);
  };

  const isAllQuestionsAnswered = () => {
    return !userAnswers.some((answer) => answer.optionId === 0);
  };

  const countAnsweredQuestions = () => {
    return userAnswers.filter((answer) => answer.optionId !== 0).length;
  };

  const handleSubmitExam = async () => {
    if (!examData) return;

    try {
      setSubmitting(true);

      // Prepare payload with all answers including those with optionId=0
      const payload = {
        id: examData.id,
        exam_id: examData.id,
        duration: examData.duration,
        ExamAnswers: userAnswers.map((answer) => ({
          exam_question_id: answer.questionId,
          selected_answer_id: answer.optionId || 0, // Use 0 for unanswered questions
        })),
      };

      console.log('Submitting payload:', payload); // Debug log

      // The token is automatically added to headers in the examService.submitExam function
      // when the user is logged in through the createApiInstance() function
      await examService.submitExam(
        examData.id.toString(),
        payload.ExamAnswers,
        examData.duration,
        examData.ExamParticipants[0].id,
        examData.guest_identifier // Use guest_identifier if available
      );

      // Navigate to results page with the result ID
      navigate(`/exam/result/${examData.id}`, {
        state: { participantId: examData.ExamParticipants[0].id },
      });
    } catch (error) {
      console.error('Error submitting exam:', error);
      setError('Failed to submit your answers. Please try again.');
      setSubmitting(false);
      setConfirmSubmitOpen(false);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth='md'
        sx={{ py: 8, display: 'flex', justifyContent: 'center' }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error || !examData || !currentQuestion) {
    return (
      <Container maxWidth='md' sx={{ py: 8 }}>
        <Alert severity='error' sx={{ mb: 3 }}>
          {error || 'There was a problem loading the exam. Please try again.'}
        </Alert>
        <Button variant='contained' onClick={() => navigate('/exam/create')}>
          Create New Exam
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth='md' sx={{ py: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='h5' component='h1' fontWeight={600}>
            {examData.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: remainingTime < 300 ? 'error.main' : 'text.primary',
              bgcolor:
                remainingTime < 300 ? 'error.light' : 'background.default',
              py: 0.5,
              px: 1.5,
              borderRadius: 2,
            }}
          >
            <TimerIcon sx={{ mr: 1 }} />
            <Typography variant='subtitle1' fontWeight={600}>
              {formatTime(remainingTime)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
            Question {currentQuestionIndex + 1} of{' '}
            {examData.ExamQuestions.length}
          </Typography>
          <LinearProgress
            variant='determinate'
            value={progress}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Chip
            label={examData.Book?.name}
            size='small'
            color='primary'
            variant='outlined'
          />

          <Chip
            label={examData.ExamType.name}
            size='small'
            color='secondary'
            variant='outlined'
          />
        </Box>

        <Card
          sx={{
            mb: 4,
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 500 }}>
              {currentQuestion.content}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <FormControl component='fieldset' sx={{ width: '100%' }}>
              <RadioGroup
                value={currentAnswer?.optionId || ''}
                onChange={handleAnswerChange}
              >
                {currentQuestion.ExamAnswers.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={`${option.code_option}. ${option.content}`}
                    sx={{
                      mb: 1,
                      py: 1,
                      px: 2,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                      ...(currentAnswer?.optionId === option.id && {
                        bgcolor: 'primary.lighter',
                      }),
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='outlined'
            startIcon={<PrevIcon />}
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          {currentQuestionIndex < examData.ExamQuestions.length - 1 ? (
            <Button
              variant='contained'
              endIcon={<NextIcon />}
              onClick={handleNextQuestion}
            >
              Next
            </Button>
          ) : (
            <Button
              variant='contained'
              color='success'
              startIcon={<FlagIcon />}
              onClick={handleOpenConfirmSubmit}
            >
              Submit Exam
            </Button>
          )}
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 3,
          position: 'sticky',
          bottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant='body2' color='text.secondary'>
            Answered: {countAnsweredQuestions()}/{examData.ExamQuestions.length}
          </Typography>
          <LinearProgress
            variant='determinate'
            value={
              (countAnsweredQuestions() / examData.ExamQuestions.length) * 100
            }
            sx={{ height: 6, borderRadius: 3, width: '200px', mt: 0.5 }}
          />
        </Box>

        <Button
          variant='contained'
          color='success'
          startIcon={<FlagIcon />}
          onClick={handleOpenConfirmSubmit}
          disabled={submitting}
        >
          Finish Exam
        </Button>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmSubmitOpen}
        onClose={handleCloseConfirmSubmit}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Submit your exam?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {isAllQuestionsAnswered()
              ? "You've answered all questions. Are you sure you want to submit your exam?"
              : `You've only answered ${countAnsweredQuestions()} out of ${
                  examData.ExamQuestions.length
                } questions. Are you sure you want to submit your exam?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmSubmit}>Cancel</Button>
          <Button
            onClick={handleSubmitExam}
            autoFocus
            variant='contained'
            color='success'
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Submit Exam'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TakeExamPage;
