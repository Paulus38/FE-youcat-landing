import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" color="primary" sx={{ fontSize: { xs: '8rem', sm: '12rem' }, fontWeight: 700 }}>
        404
      </Typography>
      
      <Typography variant="h4" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
        Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          component={RouterLink} 
          to="/"
          size="large"
        >
          Go to Home
        </Button>
        
        <Button 
          variant="outlined" 
          component={RouterLink} 
          to="/contact"
          size="large"
        >
          Contact Support
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage; 