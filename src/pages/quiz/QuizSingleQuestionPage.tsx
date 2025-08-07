import React from 'react';
import { Container, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Home as HomeIcon, Quiz as QuizIcon } from '@mui/icons-material';
import QuizSingleQuestion from '../../components/quiz/QuizSingleQuestion';
import { useLanguage } from '../../context/LanguageContext';

const QuizSingleQuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const question_id = id ? parseInt(id, 10) : 0;

  if (!id || isNaN(question_id)) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Typography
          variant='h4'
          component='h1'
          color='error'
          align='center'
          gutterBottom
        >
          {t('invalidQuestionId') || 'Invalid Question ID'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component={RouterLink}
          to='/'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
          {t('home')}
        </Link>
        <Link
          component={RouterLink}
          to='/quiz'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <QuizIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
          {t('quizzes')}
        </Link>
        <Typography color='text.primary'>
          {t('singleQuestion') || 'Single Question Quiz'}
        </Typography>
      </Breadcrumbs>

      <Typography variant='h4' component='h1' align='center' gutterBottom>
        {t('singleQuestion') || 'Single Question Quiz'}
      </Typography>

      <Typography
        variant='subtitle1'
        align='center'
        color='text.secondary'
        paragraph
      >
        {t('singleQuestionDescription') ||
          'Test your knowledge with this question. Choose the correct answer!'}
      </Typography>

      <Box mt={4}>
        <QuizSingleQuestion question_id={question_id} />
      </Box>
    </Container>
  );
};

export default QuizSingleQuestionPage;
