import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Slider,
  FormControlLabel,
  Checkbox,
  Divider,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  useTheme,
  useMediaQuery,
  RadioGroup,
  Radio,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Create as CreateIcon,
  Timer as TimerIcon,
  Category as CategoryIcon,
  Help as HelpIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import examService, {
  ExamSettings,
  PredefinedExam,
} from '@/services/examService';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import authService from '@/services/authService';

const categoryOptions = [
  { id: 'cat1', name: 'generalCatechism' },
  { id: 'cat2', name: 'theCreed' },
  { id: 'cat3', name: 'theSacraments' },
  { id: 'cat4', name: 'tenCommandments' },
  { id: 'cat5', name: 'prayerSpirituality' },
  { id: 'cat6', name: 'churchHistory' },
  { id: 'cat7', name: 'socialTeachings' },
];

const difficultyLevels = [
  { value: 'easy', label: 'easy' },
  { value: 'medium', label: 'medium' },
  { value: 'hard', label: 'hard' },
  { value: 'mixed', label: 'mixed' },
];

type ExamMode = 'predefined' | 'custom';

interface Book {
  id: number;
  name: string;
  description: string | undefined;
}

const CreateExamPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();

  const steps = [
    t('examTypeStep'),
    t('examSettingsStep'),
    t('reviewConfirmStep'),
  ];

  // Check URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const fromDiocese = queryParams.get('from_diocese') === 'phu_cuong';

  const [activeStep, setActiveStep] = useState(fromDiocese ? 2 : 0);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [examMode, setExamMode] = useState<ExamMode>(
    fromDiocese ? 'custom' : 'custom'
  );
  const [selectedPredefinedExam, setSelectedPredefinedExam] = useState<
    number | null
  >(null);
  const [predefinedExams, setPredefinedExams] = useState<PredefinedExam[]>([]);
  const [fetchingExams, setFetchingExams] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const [examSettings, setExamSettings] = useState<ExamSettings>({
    title: fromDiocese
      ? `${t('examTitle')} - ${t('churchHistoryCategory')}`
      : `${t('examTitle')} ${new Date().toLocaleDateString()}`,
    categoryIds: fromDiocese ? ['cat6'] : [],
    difficulty: 'mixed',
    questionCount: 10,
    timeLimit: 1,
    randomOrder: true,
    book_id: undefined,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (examMode === 'predefined' && predefinedExams.length === 0) {
      fetchPredefinedExams();
    }
  }, [examMode]);

  useEffect(() => {
    if (fromDiocese) {
      setExamSettings({
        title: `${t('examTitle')} - ${t('churchHistoryCategory')}`,
        categoryIds: ['cat6'],
        difficulty: 'mixed',
        questionCount: 15,
        timeLimit: 2,
        randomOrder: true,
      });
    }
  }, [fromDiocese, t]);

  const fetchBooks = async () => {
    try {
      setLoadingBooks(true);

      const response = await examService.getBooks();
      if (response.statusCode === 200) {
        const arr = response.data.map((book) => ({
          id: book.id,
          name: book.name,
          description: book.description,
        }));
        setBooks(arr);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoadingBooks(false);
    }
  };

  const fetchPredefinedExams = async () => {
    try {
      setFetchingExams(true);
      const response = await examService.getPredefinedExams();
      setPredefinedExams(response.data);
    } catch (error) {
      console.error('Error fetching predefined exams:', error);
      setFormError(t('failedToFetchExamsError'));
    } finally {
      setFetchingExams(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!examMode) {
        setFormError(t('selectExamModeError'));
        return;
      }
      setFormError('');
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (examMode === 'custom' && examSettings.categoryIds.length === 0) {
        setFormError(t('selectCategoriesError'));
        return;
      }
      setFormError('');
      setActiveStep(2);
    }
  };

  const handleBack = () => {
    if (activeStep === 2 && examMode === 'predefined') {
      setActiveStep(0);
    } else {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleCreateExam = async () => {
    try {
      setLoading(true);
      setFormError(null);

      if (examMode === 'custom') {
        const response = await examService.createExam(examSettings);
        const examId = response.data.id;
        const participantId = response.data.ExamParticipants?.[0]?.id;
        navigate(
          `/exam/take/${examId}${
            participantId ? `?participant_id=${participantId}` : ''
          }`
        );
      } else if (examMode === 'predefined' && selectedPredefinedExam) {
        let response;
        const examId = selectedPredefinedExam;
        const guestIdentifier = authService.getGuestIdentifier();

        if (isAuthenticated) {
          response = await examService.startAuthenticatedExam(examId);
        } else {
          const payload = guestIdentifier
            ? { exam_id: examId, guest_identifier: guestIdentifier }
            : { exam_id: examId };

          response = await examService.startGuestExam(payload);
        }

        const participantId = response.data.id;
        navigate(`/exam/take/${examId}?participant_id=${participantId}`);
      } else if (fromDiocese) {
        const response = await examService.createExam(examSettings);
        const examId = response.data.id;
        const participantId = response.data.ExamParticipants?.[0]?.id;
        navigate(
          `/exam/take/${examId}${
            participantId ? `?participant_id=${participantId}` : ''
          }`
        );
      }
    } catch (error: any) {
      setFormError(
        error.response?.data?.message || t('failedToCreateExamError')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExamModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamMode(event.target.value as ExamMode);
    setSelectedPredefinedExam(null);
  };

  const handlePredefinedExamSelect = (examId: number) => {
    setSelectedPredefinedExam(examId);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamSettings({ ...examSettings, title: event.target.value });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const selectedCategories = event.target.value as string[];
    setExamSettings({ ...examSettings, categoryIds: selectedCategories });
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setExamSettings({
      ...examSettings,
      difficulty: event.target.value as 'easy' | 'medium' | 'hard' | 'mixed',
    });
  };

  const handleQuestionCountChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    setExamSettings({ ...examSettings, questionCount: newValue as number });
  };

  const handleTimeLimitChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    setExamSettings({ ...examSettings, timeLimit: newValue as number });
  };

  const handleRandomOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExamSettings({ ...examSettings, randomOrder: event.target.checked });
  };

  const handleBookChange = (event: SelectChangeEvent<number | ''>) => {
    const value = event.target.value;
    setExamSettings({
      ...examSettings,
      book_id: value === '' ? undefined : Number(value),
    });
  };

  const getTotalTime = () => {
    if (examMode === 'predefined' && selectedPredefinedExam) {
      const selectedExam = predefinedExams.find(
        (exam) => exam.id === selectedPredefinedExam
      );
      return selectedExam ? selectedExam.duration : 0;
    }
    return examSettings.timeLimit * examSettings.questionCount;
  };

  const getExamTitle = () => {
    if (examMode === 'predefined' && selectedPredefinedExam) {
      const selectedExam = predefinedExams.find(
        (exam) => exam.id === selectedPredefinedExam
      );
      return selectedExam ? selectedExam.title : '';
    }
    return examSettings.title;
  };

  const getExamCategories = () => {
    if (examMode === 'predefined' && selectedPredefinedExam) {
      return t('allCategories');
    }

    return examSettings.categoryIds.length === 0
      ? t('allCategories')
      : categoryOptions
          .filter((cat) => examSettings.categoryIds.includes(cat.id))
          .map((cat) => t(cat.name))
          .join(', ');
  };

  const getExamDifficulty = () => {
    if (examMode === 'predefined' && selectedPredefinedExam) {
      const selectedExam = predefinedExams.find(
        (exam) => exam.id === selectedPredefinedExam
      );
      return selectedExam ? t(selectedExam.difficulty.toLowerCase()) : '';
    }
    return t(examSettings.difficulty);
  };

  const getExamQuestionCount = () => {
    if (examMode === 'predefined' && selectedPredefinedExam) {
      const selectedExam = predefinedExams.find(
        (exam) => exam.id === selectedPredefinedExam
      );
      return selectedExam ? selectedExam.total_question : 0;
    }
    return examSettings.questionCount;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} ${t('minutesLabel')}`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} ${t(
      'minutesLabel'
    )}`;
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant='h6' component='h2' gutterBottom sx={{ mb: 3 }}>
              {t('chooseExamTypeHeading')}
            </Typography>

            <RadioGroup
              value={examMode}
              onChange={handleExamModeChange}
              sx={{ mb: 4 }}
            >
              <FormControlLabel
                value='predefined'
                control={<Radio />}
                label={
                  <Typography variant='body1' fontWeight={500}>
                    {t('predefinedExamOption')}
                  </Typography>
                }
              />
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  {t('predefinedExamDesc')}
                </Typography>
              </Box>

              <FormControlLabel
                value='custom'
                control={<Radio />}
                label={
                  <Typography variant='body1' fontWeight={500}>
                    {t('customExamOption')}
                  </Typography>
                }
              />
              <Box sx={{ ml: 4 }}>
                <Typography variant='body2' color='text.secondary'>
                  {t('customExamDesc')}
                </Typography>
              </Box>
            </RadioGroup>

            {examMode === 'predefined' && (
              <Box>
                <Typography variant='subtitle1' fontWeight={500} gutterBottom>
                  {t('availableExamsHeading')}
                </Typography>

                {fetchingExams ? (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', py: 4 }}
                  >
                    <CircularProgress />
                  </Box>
                ) : predefinedExams.length === 0 ? (
                  <Alert severity='info' sx={{ mb: 2 }}>
                    {t('noPredefinedExamsMessage')}
                  </Alert>
                ) : (
                  <List
                    sx={{
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    {predefinedExams.map((exam) => (
                      <ListItem
                        key={exam.id}
                        disablePadding
                        sx={{
                          borderBottom: '1px solid',
                          borderBottomColor: 'divider',
                          '&:last-child': {
                            borderBottom: 'none',
                          },
                        }}
                      >
                        <ListItemButton
                          selected={selectedPredefinedExam === exam.id}
                          onClick={() => handlePredefinedExamSelect(exam.id)}
                          sx={{
                            py: 2,
                            '&.Mui-selected': {
                              bgcolor: 'primary.light',
                              '&:hover': {
                                bgcolor: 'primary.light',
                              },
                            },
                          }}
                        >
                          <ListItemText
                            primary={exam.title}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component='span'
                                  variant='body2'
                                  color='text.primary'
                                >
                                  {exam.difficulty.toLowerCase() === 'easy'
                                    ? t('easyDifficulty')
                                    : exam.difficulty.toLowerCase() === 'medium'
                                    ? t('mediumDifficulty')
                                    : exam.difficulty.toLowerCase() === 'hard'
                                    ? t('hardDifficulty')
                                    : t('mixedDifficulty')}{' '}
                                  •
                                </Typography>{' '}
                                {exam.total_question} {t('questionsLabel')} •{' '}
                                {formatTime(exam.duration)}
                              </React.Fragment>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                variant='contained'
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
                size='large'
                disabled={examMode === 'predefined' && !selectedPredefinedExam}
              >
                {t('continueButton')}
              </Button>
            </Box>
          </Box>
        );

      case 1:
        if (examMode === 'predefined') {
          handleNext();
          return <CircularProgress />;
        }

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('testTitleLabel')}
                value={examSettings.title}
                onChange={handleTitleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='book-label'>{t('bookLabel')}</InputLabel>
                <Select
                  labelId='book-label'
                  value={examSettings.book_id || ''}
                  onChange={handleBookChange}
                  disabled={loadingBooks}
                >
                  <MenuItem value=''>
                    <em>{t('allBooks')}</em>
                  </MenuItem>
                  {books.map((book) => (
                    <MenuItem key={book.id} value={book.id}>
                      {book.name}
                    </MenuItem>
                  ))}
                </Select>
                {loadingBooks && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography variant='caption' color='text.secondary'>
                      {t('loadingBooks')}
                    </Typography>
                  </Box>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id='categories-label'>
                  {t('categoriesLabel')}
                </InputLabel>
                <Select
                  labelId='categories-label'
                  multiple
                  value={examSettings.categoryIds}
                  onChange={handleCategoryChange}
                  renderValue={(selected) => {
                    const selectedCategories = categoryOptions
                      .filter((cat) => selected.includes(cat.id))
                      .map((cat) => {
                        switch (cat.name) {
                          case 'generalCatechism':
                            return t('generalCatechismCategory');
                          case 'theCreed':
                            return t('theCreedCategory');
                          case 'theSacraments':
                            return t('theSacramentsCategory');
                          case 'tenCommandments':
                            return t('tenCommandmentsCategory');
                          case 'prayerSpirituality':
                            return t('prayerSpiritualityCategory');
                          case 'churchHistory':
                            return t('churchHistoryCategory');
                          case 'socialTeachings':
                            return t('socialTeachingsCategory');
                          default:
                            return cat.name;
                        }
                      });

                    return selectedCategories.join(', ');
                  }}
                >
                  {categoryOptions.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={examSettings.categoryIds.includes(
                              category.id
                            )}
                          />
                        }
                        label={
                          category.name === 'generalCatechism'
                            ? t('generalCatechismCategory')
                            : category.name === 'theCreed'
                            ? t('theCreedCategory')
                            : category.name === 'theSacraments'
                            ? t('theSacramentsCategory')
                            : category.name === 'tenCommandments'
                            ? t('tenCommandmentsCategory')
                            : category.name === 'prayerSpirituality'
                            ? t('prayerSpiritualityCategory')
                            : category.name === 'churchHistory'
                            ? t('churchHistoryCategory')
                            : category.name === 'socialTeachings'
                            ? t('socialTeachingsCategory')
                            : category.name
                        }
                        sx={{ width: '100%' }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='difficulty-label'>
                  {t('difficultyLevelLabel')}
                </InputLabel>
                <Select
                  labelId='difficulty-label'
                  value={examSettings.difficulty}
                  onChange={handleDifficultyChange}
                >
                  {difficultyLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.value === 'easy'
                        ? t('easyDifficulty')
                        : level.value === 'medium'
                        ? t('mediumDifficulty')
                        : level.value === 'hard'
                        ? t('hardDifficulty')
                        : t('mixedDifficulty')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={examSettings.randomOrder}
                    onChange={handleRandomOrderChange}
                  />
                }
                label={t('randomizeQuestionOrderLabel')}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography id='question-count-slider' gutterBottom>
                {t('numberOfQuestionsLabel')}: {examSettings.questionCount}
              </Typography>
              <Slider
                value={examSettings.questionCount}
                onChange={handleQuestionCountChange}
                aria-labelledby='question-count-slider'
                valueLabelDisplay='auto'
                step={5}
                marks
                min={5}
                max={50}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography id='time-limit-slider' gutterBottom>
                {t('timePerQuestionLabel')}: {examSettings.timeLimit}{' '}
                {t('minutesLabel')}
              </Typography>
              <Slider
                value={examSettings.timeLimit}
                onChange={handleTimeLimitChange}
                aria-labelledby='time-limit-slider'
                valueLabelDisplay='auto'
                step={1}
                marks
                min={1}
                max={10}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Button
                variant='outlined'
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                disabled={loading}
              >
                {t('backButton')}
              </Button>

              <Button
                variant='contained'
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
                size='large'
              >
                {t('continueButton')}
              </Button>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Typography variant='h6' component='h2' gutterBottom sx={{ mb: 3 }}>
              {t('reviewTestSettingsHeading')}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CreateIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                      <Typography variant='subtitle1' fontWeight={600}>
                        {getExamTitle()}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <CategoryIcon
                            sx={{
                              color: 'text.secondary',
                              mr: 1.5,
                              fontSize: 20,
                              mt: 0.3,
                            }}
                          />
                          <Box>
                            <Typography
                              variant='body2'
                              color='text.secondary'
                              gutterBottom
                            >
                              {t('categoriesLabel')}
                            </Typography>
                            <Typography variant='body1'>
                              {getExamCategories()}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <HelpIcon
                            sx={{
                              color: 'text.secondary',
                              mr: 1.5,
                              fontSize: 20,
                              mt: 0.3,
                            }}
                          />
                          <Box>
                            <Typography
                              variant='body2'
                              color='text.secondary'
                              gutterBottom
                            >
                              {t('difficultyLevelLabel')}
                            </Typography>
                            <Typography
                              variant='body1'
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {getExamDifficulty()}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <HelpIcon
                            sx={{
                              color: 'text.secondary',
                              mr: 1.5,
                              fontSize: 20,
                              mt: 0.3,
                            }}
                          />
                          <Box>
                            <Typography
                              variant='body2'
                              color='text.secondary'
                              gutterBottom
                            >
                              {t('numberOfQuestionsLabel')}
                            </Typography>
                            <Typography variant='body1'>
                              {getExamQuestionCount()}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <TimerIcon
                            sx={{
                              color: 'text.secondary',
                              mr: 1.5,
                              fontSize: 20,
                              mt: 0.3,
                            }}
                          />
                          <Box>
                            <Typography
                              variant='body2'
                              color='text.secondary'
                              gutterBottom
                            >
                              {t('timeLimitLabel')}
                            </Typography>
                            <Typography variant='body1'>
                              {formatTime(getTotalTime())}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Alert severity='info' sx={{ mb: 2 }}>
                  {t('timerWarningMessage')}
                </Alert>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
              >
                <Button
                  variant='outlined'
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBack}
                  disabled={loading}
                >
                  {t('backButton')}
                </Button>

                <Button
                  variant='contained'
                  startIcon={
                    loading ? <CircularProgress size={20} /> : undefined
                  }
                  onClick={handleCreateExam}
                  disabled={loading}
                  size='large'
                >
                  {t('startTestButton')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth='md' sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom fontWeight={600}>
            {t('createYourPracticeTestHeading')}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {t('customizeYourQuizSubheading')}
          </Typography>
        </Box>

        <Stepper
          activeStep={activeStep}
          alternativeLabel={!isMobile}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          sx={{ mb: 4 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {formError && (
          <Alert severity='error' sx={{ mb: 3 }}>
            {formError}
          </Alert>
        )}

        {!isAuthenticated && (
          <Alert severity='info' sx={{ mb: 3 }}>
            {t('createExamGuestMessage')}
          </Alert>
        )}

        {renderStepContent()}
      </Paper>
    </Container>
  );
};

export default CreateExamPage;
