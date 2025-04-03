import React, { useState } from 'react';
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
  useMediaQuery
} from '@mui/material';
import { 
  Create as CreateIcon, 
  Timer as TimerIcon, 
  Category as CategoryIcon,
  Help as HelpIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import examService, { ExamSettings } from '@/services/examService';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';

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

const CreateExamPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();
  
  const steps = [t('examSettings'), t('reviewConfirm')];
  
  const [activeStep, setActiveStep] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [examSettings, setExamSettings] = useState<ExamSettings>({
    title: `Bài thi ${new Date().toLocaleDateString('vi-VN')}`,
    categoryIds: [],
    difficulty: 'mixed',
    questionCount: 10,
    timeLimit: 1,
    randomOrder: true
  });
  
  const handleNext = () => {
    // Validate form before proceeding
    if (activeStep === 0) {
      if (examSettings.title.trim() === '') {
        setFormError(t('pleaseEnterTitle'));
        return;
      }
      
      if (examSettings.categoryIds.length === 0) {
        setFormError(t('pleaseSelectCategory'));
        return;
      }
    }
    
    setFormError(null);
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleCreateExam = async () => {
    try {
      setLoading(true);
      setFormError(null);
      
      // Create exam using the appropriate endpoint based on authentication status
      const response = await examService.createExam(examSettings);
      
      // Get the exam ID
      const examId = response.data.id;
      
      // Get the exam participant ID
      const participantId = response.data.ExamParticipants?.[0]?.id;
      
      // Navigate to the exam taking page with participant ID if available
      navigate(`/exam/take/${examId}${participantId ? `?participant_id=${participantId}` : ''}`);
    } catch (error: any) {
      setFormError(error.response?.data?.message || t('failedToCreateExam'));
    } finally {
      setLoading(false);
    }
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
      difficulty: event.target.value as 'easy' | 'medium' | 'hard' | 'mixed' 
    });
  };
  
  const handleQuestionCountChange = (_event: Event, newValue: number | number[]) => {
    setExamSettings({ ...examSettings, questionCount: newValue as number });
  };
  
  const handleTimeLimitChange = (_event: Event, newValue: number | number[]) => {
    setExamSettings({ ...examSettings, timeLimit: newValue as number });
  };
  
  const handleRandomOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamSettings({ ...examSettings, randomOrder: event.target.checked });
  };
  
  const getTotalTime = () => {
    return examSettings.timeLimit * examSettings.questionCount;
  };
  
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} ${t('minutes')}`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} ${t('minutes')}`;
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
            {t('createYourPracticeTest')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('customizeYourQuiz')}
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
          <Alert severity="error" sx={{ mb: 3 }}>
            {formError}
          </Alert>
        )}
        
        {!isAuthenticated && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {t('createExamGuest')}
          </Alert>
        )}
        
        {activeStep === 0 ? (
          // Step 1: Exam Settings
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('testTitle')}
                value={examSettings.title}
                onChange={handleTitleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="categories-label">{t('categories')}</InputLabel>
                <Select
                  labelId="categories-label"
                  multiple
                  value={examSettings.categoryIds}
                  onChange={handleCategoryChange}
                  renderValue={(selected) => {
                    const selectedCategories = categoryOptions
                      .filter(cat => selected.includes(cat.id))
                      .map(cat => t(cat.name));
                    
                    return selectedCategories.join(', ');
                  }}
                >
                  {categoryOptions.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={examSettings.categoryIds.includes(category.id)} 
                          />
                        }
                        label={t(category.name)}
                        sx={{ width: '100%' }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="difficulty-label">{t('difficultyLevel')}</InputLabel>
                <Select
                  labelId="difficulty-label"
                  value={examSettings.difficulty}
                  onChange={handleDifficultyChange}
                >
                  {difficultyLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {t(level.label)}
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
                label={t('randomizeQuestionOrder')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography id="question-count-slider" gutterBottom>
                {t('numberOfQuestions')}: {examSettings.questionCount}
              </Typography>
              <Slider
                value={examSettings.questionCount}
                onChange={handleQuestionCountChange}
                aria-labelledby="question-count-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={50}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography id="time-limit-slider" gutterBottom>
                {t('timePerQuestion')}: {examSettings.timeLimit} {t('minutes')}
              </Typography>
              <Slider
                value={examSettings.timeLimit}
                onChange={handleTimeLimitChange}
                aria-labelledby="time-limit-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
              />
            </Grid>
            
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
                size="large"
              >
                {t('continue')}
              </Button>
            </Grid>
          </Grid>
        ) : (
          // Step 2: Review & Confirm
          <Box>
            <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 3 }}>
              {t('reviewTestSettings')}
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CreateIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                      <Typography variant="subtitle1" fontWeight={600}>
                        {examSettings.title}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <CategoryIcon sx={{ color: 'text.secondary', mr: 1.5, fontSize: 20, mt: 0.3 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {t('categories')}
                            </Typography>
                            <Typography variant="body1">
                              {examSettings.categoryIds.length === 0 ? (
                                t('allCategories')
                              ) : (
                                categoryOptions
                                  .filter(cat => examSettings.categoryIds.includes(cat.id))
                                  .map(cat => t(cat.name))
                                  .join(', ')
                              )}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <HelpIcon sx={{ color: 'text.secondary', mr: 1.5, fontSize: 20, mt: 0.3 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {t('difficulty')}
                            </Typography>
                            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                              {t(examSettings.difficulty)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <HelpIcon sx={{ color: 'text.secondary', mr: 1.5, fontSize: 20, mt: 0.3 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {t('numberOfQuestions')}
                            </Typography>
                            <Typography variant="body1">
                              {examSettings.questionCount}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <TimerIcon sx={{ color: 'text.secondary', mr: 1.5, fontSize: 20, mt: 0.3 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {t('timeLimit')}
                            </Typography>
                            <Typography variant="body1">
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
                <Alert severity="info" sx={{ mb: 2 }}>
                  {t('timerWarning')}
                </Alert>
              </Grid>
              
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBack}
                  disabled={loading}
                >
                  {t('back')}
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : undefined}
                  onClick={handleCreateExam}
                  disabled={loading}
                  size="large"
                >
                  {t('startTest')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CreateExamPage; 