import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';

const InspirationalQuote: React.FC = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  
  return (
    <Paper
      elevation={3}
      sx={{
        py: 4,
        px: 6,
        textAlign: 'center',
        borderRadius: 2,
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '"""',
          position: 'absolute',
          fontSize: '12rem',
          opacity: 0.1,
          top: '-2rem',
          left: '1rem',
          fontFamily: 'serif',
          fontWeight: 'bold',
        }
      }}
    >
      <Typography 
        variant="h4" 
        component="blockquote"
        fontStyle="italic"
        fontWeight="medium"
        mb={2}
      >
        "{t('seekGod')}"
      </Typography>
    </Paper>
  );
};

export default InspirationalQuote; 