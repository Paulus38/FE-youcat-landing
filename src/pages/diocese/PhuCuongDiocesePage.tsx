import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Button, Divider, Card, CardContent,
  useTheme, alpha, Fade, Zoom, Collapse
} from '@mui/material';
import { useLanguage } from '@context/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Quiz as QuizIcon, 
  School as SchoolIcon, 
  History as HistoryIcon, 
  ArrowBack, 
  LocationOn, 
  EventNote, 
  People, 
  Church,
  ExpandMore,
  ExpandLess,
  Info as InfoIcon, 
  AccountBalance, 
  Person, 
  Business, 
  Photo
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PhuCuongDiocesePage: React.FC = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('history');
  
  useEffect(() => {
    setAnimationTriggered(true);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const timelineEvents = [
    {
      year: '1965',
      title: 'Thành lập Giáo phận',
      description: 'Giáo phận Phú Cường được thành lập vào ngày 14/10/1965 bởi Đức Giáo Hoàng Phaolô VI.'
    },
    {
      year: '1965-1993',
      title: 'Đức cha Giuse Phạm Văn Thiên',
      description: 'Giám mục đầu tiên của giáo phận, phục vụ trong 28 năm.'
    },
    {
      year: '1993-1995',
      title: 'Đức cha Luy Hà Kim Danh',
      description: 'Giám mục thứ hai của giáo phận, phục vụ trong 2 năm. Với tuổi cao, sức yếu, Ngài đã về với Chúa ngày 09/01/1995.'
    },
    {
      year: '1995-1999',
      title: 'Trống tòa',
      description: 'Giáo phận trống tòa gần bốn năm. Trong thời gian này, cha Micae Lê Văn Khâm làm Giám quản Giáo phận.'
    },
    {
      year: '1999-2012',
      title: 'Đức cha Phêrô Trần Đình Tứ',
      description: 'Giám mục thứ ba của giáo phận, tiếp tục xây dựng và phát triển giáo phận.'
    },
    {
      year: '2012-nay',
      title: 'Đức cha Giuse Nguyễn Tấn Tước',
      description: 'Giám mục hiện tại của giáo phận, tiếp tục sứ mệnh mục vụ và phát triển đức tin.'
    }
  ];

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
        pt: 2,
        pb: 8
      }}
    >
      <Fade in={animationTriggered} timeout={800}>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Button 
            component={Link} 
            to="/diocese" 
            startIcon={<ArrowBack />}
            sx={{ 
              mb: 3,
              borderRadius: 20,
              px: 2,
              py: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2)
              }
            }}
          >
            Quay lại
          </Button>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 4, 
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src="https://giaophanphucuong.org/_next/image?url=https%3A%2F%2Fapi.client.giaophanphucuong.org%2Fstorage%2Fimages%2F18bc5735-63cf-ae62-9982-b5d866e5ea99.jpg&w=1920&q=75"
                  alt="Nhà thờ Chánh tòa Phú Cường"
                  sx={{
                    width: '100%',
                    height: { xs: '250px', md: '400px' },
                    objectFit: 'cover',
                  }}
                />
                
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                    pt: 8,
                    pb: 3,
                    px: { xs: 3, md: 5 }
                  }}
                >
                  <Typography 
                    variant="h2" 
                    component="h1"
                    sx={{ 
                      color: 'white',
                      fontWeight: 800,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                    }}
                  >
                    Giáo Phận Phú Cường
                  </Typography>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mt: 1
                    }}
                  >
                    <LocationOn sx={{ color: 'white', mr: 1 }} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'white',
                        fontWeight: 400,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      Bình Dương, Việt Nam
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  py: 2,
                  px: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventNote sx={{ mr: 1 }} />
                  <Typography variant="body1" fontWeight="medium">Thành lập: 14/10/1965</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <People sx={{ mr: 1 }} />
                  <Typography variant="body1" fontWeight="medium">300.000+ giáo dân</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Church sx={{ mr: 1 }} />
                  <Typography variant="body1" fontWeight="medium">100+ giáo xứ</Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
          
          <Divider sx={{ my: 4 }} />
          
          <Grid container spacing={4} sx={{ p: { xs: 3, md: 5 } }}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 5 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3,
                    pb: 1,
                    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleSection('history')}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: theme.palette.primary.main,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <HistoryIcon sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                    Lịch sử hình thành
                  </Typography>
                  {expandedSection === 'history' ? <ExpandLess /> : <ExpandMore />}
                </Box>
                
                <Collapse in={expandedSection === 'history'}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Typography 
                      paragraph
                      sx={{ 
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        mb: 3,
                        color: alpha(theme.palette.text.primary, 0.95)
                      }}
                    >
                      Giáo phận Phú Cường được thành lập vào ngày 14 tháng 10 năm 1965 bởi Đức Giáo Hoàng Phaolô VI, 
                      tách ra từ Giáo phận Sài Gòn. Phú Cường trở thành một trong những giáo phận trẻ của Việt Nam,
                      với sứ mệnh phục vụ nhu cầu thiêng liêng của cộng đoàn Công giáo tại đây.
                    </Typography>
                    
                    <Box
                      component="img"
                      src="/diocese/phu-cuong-1.jpg"
                      alt="Lịch sử Giáo phận Phú Cường"
                      sx={{
                        width: '100%',
                        borderRadius: 3,
                        objectFit: 'cover',
                        mb: 3,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.02)'
                        }
                      }}
                    />
                    
                    <Typography 
                      paragraph 
                      sx={{ 
                        fontSize: '1.1rem', 
                        lineHeight: 1.7,
                        color: alpha(theme.palette.text.primary, 0.95)
                      }}
                    >
                      Năm 1966, khi mới thành lập Giáo phận Phú Cường, con số chính thức được ghi nhận là 51.488 Kitô hữu trên tổng số 715.000 dân (chiếm 7,2%); 43 linh mục; 6 giáo hạt (Bình Long, Lạc An, Phú Cường, Phước Thành, Tây Ninh và Thala); 39 họ đạo có cha chánh xứ hiện diện và 106 thánh đường lớn nhỏ. Bắt đầu từ năm 1967, Đức cha Giuse đã cho xây dựng nhiều về tinh thần và cơ sở vật chất trong giáo phận như: về tinh thần, Đức cha chú ý tổ chức sinh hoạt giáo phận theo tinh thần và đường hướng Công đồng Vatican II.
                    </Typography>
                    
                    <Typography 
                      paragraph 
                      sx={{ 
                        fontSize: '1.1rem', 
                        lineHeight: 1.7,
                        color: alpha(theme.palette.text.primary, 0.95)
                      }}
                    >
                      Trải qua nhiều thăng trầm của lịch sử, giáo phận Phú Cường đã từng bước phát triển và 
                      ngày càng khẳng định vai trò của mình trong cộng đồng. Các hoạt động mục vụ, giáo dục và từ thiện
                      của giáo phận đã góp phần không nhỏ vào sự phát triển chung của địa phương.
                    </Typography>
                  </motion.div>
                </Collapse>
              </Box>
              
              <Box sx={{ mb: 5 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3,
                    pb: 1,
                    borderBottom: `2px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleSection('present')}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: theme.palette.secondary.main,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Church sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                    Giáo phận hiện nay
                  </Typography>
                  {expandedSection === 'present' ? <ExpandLess /> : <ExpandMore />}
                </Box>
                
                <Collapse in={expandedSection === 'present'}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Typography 
                      paragraph 
                      sx={{ 
                        fontSize: '1.1rem', 
                        lineHeight: 1.7,
                        mb: 3,
                        color: alpha(theme.palette.text.primary, 0.95)
                      }}
                    >
                      Hiện nay, giáo phận Phú Cường đã phát triển mạnh mẽ với hơn 300.000 giáo dân, hơn 100 giáo xứ 
                      và nhiều cơ sở giáo dục, y tế, và từ thiện. Giáo phận tiếp tục sứ mệnh phục vụ và lan tỏa
                      tinh thần Phúc Âm trong một vùng đất có tốc độ phát triển kinh tế năng động nhất cả nước.
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          component="img"
                          src="https://giaophanphucuong.org/_next/image?url=https%3A%2F%2Fapi.client.giaophanphucuong.org%2Fstorage%2Fimages%2F2e770132-4690-8da3-1454-f2098dae4411.jpg&w=1920&q=75"
                          alt="Giáo phận Phú Cường hiện nay"
                          sx={{
                            width: '100%',
                            borderRadius: 3,
                            height: '200px',
                            objectFit: 'cover',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.02)'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          component="img"
                          src="/diocese/phu-cuong-3.jpg"
                          alt="Giáo phận Phú Cường hiện nay"
                          sx={{
                            width: '100%',
                            borderRadius: 3,
                            height: '200px',
                            objectFit: 'cover',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.02)'
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                    
                    <Typography 
                      paragraph 
                      sx={{ 
                        fontSize: '1.1rem', 
                        lineHeight: 1.7,
                        color: alpha(theme.palette.text.primary, 0.95)
                      }}
                    >
                      Các hoạt động giáo dục của giáo phận bao gồm nhiều trường học từ mầm non đến trung học,
                      đào tạo giáo lý viên và các chương trình giáo dục đức tin cho mọi lứa tuổi. 
                      Bên cạnh đó, giáo phận cũng tích cực tham gia vào các hoạt động từ thiện xã hội,
                      chăm sóc người nghèo, người già, trẻ mồ côi và người khuyết tật.
                    </Typography>
                  </motion.div>
                </Collapse>
              </Box>
              
              <Box sx={{ mb: 5 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3,
                    pb: 1,
                    borderBottom: `2px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleSection('timeline')}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: theme.palette.success.main,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <EventNote sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                    Dòng thời gian
                  </Typography>
                  {expandedSection === 'timeline' ? <ExpandLess /> : <ExpandMore />}
                </Box>
                
                <Collapse in={expandedSection === 'timeline'}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Box sx={{ position: 'relative', mb: 3, mt: 4 }}>
                      {/* Vertical line */}
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        bottom: 0, 
                        left: { xs: 16, md: 20 },
                        width: 4,
                        bgcolor: alpha(theme.palette.success.main, 0.3),
                        zIndex: 1
                      }} />
                      
                      {/* Timeline events */}
                      {timelineEvents.map((event, index) => (
                        <Zoom 
                          in={expandedSection === 'timeline'} 
                          style={{ transitionDelay: `${index * 150}ms` }}
                          key={index}
                        >
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              mb: 4,
                              position: 'relative',
                              zIndex: 2
                            }}
                          >
                            <Box 
                              sx={{ 
                                width: { xs: 32, md: 40 }, 
                                height: { xs: 32, md: 40 },
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: theme.palette.success.main,
                                color: 'white',
                                fontWeight: 'bold',
                                flexShrink: 0,
                                boxShadow: '0 0 0 4px white, 0 4px 10px rgba(0,0,0,0.1)'
                              }}
                            >
                              {index + 1}
                            </Box>
                            <Box 
                              sx={{ 
                                ml: 2,
                                p: 3,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.success.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                flexGrow: 1,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-5px)',
                                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                                }
                              }}
                            >
                              <Typography 
                                variant="subtitle1" 
                                color="text.secondary" 
                                gutterBottom
                                sx={{ fontWeight: 'bold' }}
                              >
                                {event.year}
                              </Typography>
                              <Typography 
                                variant="h6" 
                                gutterBottom 
                                sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}
                              >
                                {event.title}
                              </Typography>
                              <Typography variant="body1">
                                {event.description}
                              </Typography>
                            </Box>
                          </Box>
                        </Zoom>
                      ))}
                    </Box>
                  </motion.div>
                </Collapse>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Card 
                    elevation={0}
                    sx={{ 
                      mb: 4, 
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}
                  >
                    <Box 
                      sx={{ 
                        bgcolor: theme.palette.primary.main,
                        py: 2,
                        px: 3
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: 'white', 
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <InfoIcon sx={{ mr: 1 }} />
                        Thông tin chung
                      </Typography>
                    </Box>
                    
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: 2
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            mr: 2
                          }}>
                            <EventNote sx={{ color: theme.palette.primary.main }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Thành lập</Typography>
                            <Typography variant="body1" fontWeight="bold">14/10/1965</Typography>
                          </Box>
                        </Box>
                        
                        <Divider />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            mr: 2
                          }}>
                            <AccountBalance sx={{ color: theme.palette.primary.main }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Giáo tỉnh</Typography>
                            <Typography variant="body1" fontWeight="bold">Sài Gòn</Typography>
                          </Box>
                        </Box>
                        
                        <Divider />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            mr: 2
                          }}>
                            <LocationOn sx={{ color: theme.palette.primary.main }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Địa bàn</Typography>
                            <Typography variant="body1" fontWeight="bold">Tây Ninh, Bình Dương, 1 phần tỉnh Bình Phước và huyện Củ Chi thuộc Thành phố Hồ Chí Minh. </Typography>
                          </Box>
                        </Box>
                        
                        <Divider />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            mr: 2
                          }}>
                            <Church sx={{ color: theme.palette.primary.main }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Nhà thờ Chánh tòa</Typography>
                            <Typography variant="body1" fontWeight="bold">Nhà thờ Chánh tòa Phú Cường</Typography>
                          </Box>
                        </Box>
                        
                        <Divider />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            mr: 2
                          }}>
                            <Person sx={{ color: theme.palette.primary.main }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Giám mục hiện tại</Typography>
                            <Typography variant="body1" fontWeight="bold">Đức cha Giuse Nguyễn Tấn Tước</Typography>
                          </Box>
                        </Box>
                        
                        <Divider />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            mr: 2
                          }}>
                            <Business sx={{ color: theme.palette.primary.main }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Số giáo xứ</Typography>
                            <Typography variant="body1" fontWeight="bold">100+</Typography>
                          </Box>
                        </Box>
                        
                        <Divider />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            mr: 2
                          }}>
                            <People sx={{ color: theme.palette.primary.main }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Số giáo dân</Typography>
                            <Typography variant="body1" fontWeight="bold">Khoảng 300.000</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      startIcon={<QuizIcon />}
                      component={Link}
                      to="/exam/create"
                      size="large"
                      sx={{ 
                        py: 2,
                        borderRadius: 10,
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                          transform: 'translateY(-3px)'
                        }
                      }}
                    >
                      Làm bài thi
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      color="secondary"
                      fullWidth
                      startIcon={<SchoolIcon />}
                      component={Link}
                      to="/catechism/diocese/phu-cuong"
                      size="large"
                      sx={{ 
                        py: 2,
                        borderRadius: 10,
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        borderWidth: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderWidth: 2,
                          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-3px)'
                        }
                      }}
                    >
                      Xem câu hỏi giáo lý
                    </Button>
                    
                     
                  </Box>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </Box>
  );
};

export default PhuCuongDiocesePage; 