import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const QuizResultPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Quiz Results
      </Typography>
      <Box>
        {/* Quiz results will go here */}
      </Box>
    </Container>
  );
};

export default QuizResultPage; 