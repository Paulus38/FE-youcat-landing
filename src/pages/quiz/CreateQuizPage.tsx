import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const CreateQuizPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Quiz
      </Typography>
      <Box>
        {/* Quiz creation form will go here */}
      </Box>
    </Container>
  );
};

export default CreateQuizPage; 