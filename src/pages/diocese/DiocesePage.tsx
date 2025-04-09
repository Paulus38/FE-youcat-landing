import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, alpha, useTheme, Zoom } from '@mui/material';
import { useLanguage } from '@context/LanguageContext';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, ChurchOutlined, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const DiocesePage: React.FC = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const [animationTriggered, setAnimationTriggered] = useState(false);
  
  useEffect(() => {
    setAnimationTriggered(true);
  }, []);
  
  const dioceses = [
    {
      id: 'phu-cuong',
      name: 'Giáo phận Phú Cường',
      image: 'https://giaophanphucuong.org/_next/image?url=https%3A%2F%2Fapi.client.giaophanphucuong.org%2Fstorage%2Fimages%2F18bc5735-63cf-ae62-9982-b5d866e5ea99.jpg&w=1920&q=75',
      description: 'Tìm hiểu về lịch sử Giáo phận Phú Cường, thành lập năm 1965 tại Bình Dương',
      location: 'Bình Dương',
      year: '1965'
    },
    // Add more dioceses as needed
  ];
  
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
        minHeight: '90vh',
        pt: 4,
        pb: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {dioceses.map((diocese, index) => (
            <Grid item xs={12} md={6} lg={4} key={diocese.id}>
              <Zoom in={animationTriggered} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card 
                  component={motion.div}
                  whileHover={{ 
                    y: -16,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
                  }}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    position: 'relative'
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="320"
                      image={diocese.image}
                      alt={diocese.name}
                      sx={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        width: 60,
                        height: 60,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Năm</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: theme.palette.primary.main }}>{diocese.year}</Typography>
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ChurchOutlined sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                      <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        {diocese.name}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn sx={{ color: theme.palette.secondary.main, fontSize: '0.9rem', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {diocese.location}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3,
                        color: alpha(theme.palette.text.primary, 0.8),
                        lineHeight: 1.6
                      }}
                    >
                      {diocese.description}
                    </Typography>
                    
                    <Button 
                      component={Link} 
                      to={`/diocese/${diocese.id}`} 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      startIcon={<HistoryIcon />}
                      size="large"
                      sx={{ 
                        py: 1.5,
                        borderRadius: 10,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DiocesePage; 