import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  Avatar
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpIcon from '@mui/icons-material/Help';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import GroupsIcon from '@mui/icons-material/Groups';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const YoucatPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleQuizNavigation = () => {
    navigate('/quiz');
  };

  return (
    <>
      <Helmet>
        <title>YOUCAT - Giáo Lý Công Giáo Cho Giới Trẻ | Youcat Question</title>
        <meta name="description" content="Khám phá YOUCAT - Sách Giáo Lý Công Giáo dành cho giới trẻ với hình thức hỏi đáp hấp dẫn. Hiểu sâu về đức tin Công Giáo qua ngôn ngữ đơn giản, gần gũi." />
        <meta name="keywords" content="YOUCAT, Youcat Question, Giáo Lý Công Giáo, Giáo Lý Giới Trẻ, Hỏi Đáp Giáo Lý, Sách Giáo Lý, YOUCAT Tiếng Việt" />
      </Helmet>

      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            top: '-50px',
            right: '10%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            bottom: '-30px',
            left: '5%',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                YOUCAT
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ color: theme.palette.secondary.light }}>
                Giáo Lý Công Giáo Cho Giới Trẻ
              </Typography>
              <Typography variant="body1" paragraph>
                YOUCAT là sách Giáo Lý Công Giáo được viết đặc biệt cho giới trẻ, dưới dạng hỏi đáp dễ hiểu và cuốn hút. 
                Được Đức Giáo Hoàng Bênêđictô XVI giới thiệu, YOUCAT đã trở thành công cụ quan trọng giúp giới trẻ Công Giáo trên toàn thế giới hiểu rõ hơn về đức tin của mình.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                onClick={handleQuizNavigation}
                sx={{ mt: 2, mr: 2 }}
              >
                Khám Phá Ngay
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                sx={{ mt: 2, borderColor: 'white', '&:hover': { borderColor: theme.palette.secondary.light } }}
                onClick={() => navigate('/catechism')}
              >
                Về Giáo Lý
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 3
                }}
              >
                <Box
                  component="img"
                  src="/youcat/catechism-hero.jpg"
                  alt="Sách YOUCAT - Giáo Lý Công Giáo Cho Giới Trẻ"
                  sx={{
                    maxWidth: '80%',
                    maxHeight: 300,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    borderRadius: 2
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* What is YOUCAT Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom color="primary.main">
              YOUCAT là gì?
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>YOUCAT</strong> - viết tắt của <em>"Youth Catechism of the Catholic Church"</em> (Sách Giáo Lý Công Giáo Cho Giới Trẻ) - là phiên bản Giáo Lý Công Giáo được thiết kế đặc biệt cho người trẻ trên toàn thế giới.
            </Typography>
            <Typography variant="body1" paragraph>
              Được xuất bản lần đầu vào năm 2011, YOUCAT trình bày giáo lý Công Giáo với ngôn ngữ đơn giản, trực quan và gần gũi với đời sống giới trẻ. Sách được trình bày theo định dạng hỏi-đáp, giúp người đọc dễ dàng tìm hiểu và nắm bắt những điểm cốt lõi của đức tin Công Giáo.
            </Typography>
            <Typography variant="body1" paragraph>
              YOUCAT đã được dịch sang hơn 72 ngôn ngữ và là một trong những cuốn sách Công Giáo bán chạy nhất thế giới với hơn 5 triệu bản được phát hành.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FormatQuoteIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="h6" component="h3" color="primary.main">
                      Lời Đức Giáo Hoàng Bênêđictô XVI
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                    "Các bạn cần phải biết đức tin của mình thật chính xác, như một lập trình viên công nghệ biết rõ về hệ điều hành của máy tính. Các bạn cần phải hiểu đức tin ấy rõ ràng hơn nữa, như một nhạc sĩ giỏi biết rõ tác phẩm mình đang trình diễn. Các bạn cần củng cố đức tin của mình còn vững chắc hơn cả những gì mà các thế hệ cha ông đã trải qua."
                  </Typography>
                  <Typography variant="body2" align="right">
                    - Trích Lời Nói Đầu sách YOUCAT
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2
              }}
            >
              <Card sx={{ maxWidth: 350, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="220"
                  image="/youcat/structure.jpg"
                  alt="Trang sách YOUCAT minh họa"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Thiết kế trực quan với hình ảnh minh họa, trích dẫn từ Kinh Thánh, giải thích và định nghĩa giúp người đọc dễ tiếp cận.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features of YOUCAT */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom textAlign="center" color="primary.main" sx={{ mb: 5 }}>
            Đặc Điểm Nổi Bật Của YOUCAT
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                      <HelpIcon />
                    </Avatar>
                    <Typography variant="h5" component="h3">
                      Định Dạng Hỏi-Đáp
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    YOUCAT được trình bày dưới dạng 527 câu hỏi và trả lời, giúp người đọc dễ dàng tìm kiếm thông tin cụ thể và hiểu rõ từng chủ đề.
                  </Typography>
                  <Typography variant="body1">
                    Mỗi câu hỏi đều có câu trả lời ngắn gọn, súc tích và được bổ sung với trích dẫn Kinh Thánh, giải thích thêm và gợi ý suy niệm.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                      <TranslateIcon />
                    </Avatar>
                    <Typography variant="h5" component="h3">
                      Ngôn Ngữ Hiện Đại
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Sử dụng ngôn ngữ đơn giản, dễ hiểu và gần gũi với đời sống giới trẻ, tránh các thuật ngữ thần học phức tạp.
                  </Typography>
                  <Typography variant="body1">
                    Cách diễn đạt trực tiếp, cụ thể giúp người đọc dễ dàng kết nối với những vấn đề của cuộc sống hiện đại và tìm thấy câu trả lời từ đức tin.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                      <MenuBookIcon />
                    </Avatar>
                    <Typography variant="h5" component="h3">
                      Thiết Kế Trực Quan
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    YOUCAT nổi bật với màu vàng đặc trưng, nhiều hình ảnh minh họa, đồ họa và sơ đồ giúp trình bày các khái niệm phức tạp một cách dễ hiểu.
                  </Typography>
                  <Typography variant="body1">
                    Bố cục rõ ràng với các phần được phân chia theo màu sắc, viền mép có thể lật nhanh để tìm kiếm thông tin.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Structure of YOUCAT */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center" color="primary.main" sx={{ mb: 5 }}>
          Cấu Trúc Của YOUCAT
        </Typography>
        
        <Typography variant="body1" paragraph textAlign="center" sx={{ mb: 4 }}>
          Giống như Sách Giáo Lý Của Hội Thánh Công Giáo, YOUCAT được chia thành bốn phần chính, mỗi phần tập trung vào một khía cạnh cơ bản của đức tin Công Giáo.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', bgcolor: theme.palette.primary.light, color: 'white', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  PHẦN I
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Những Gì Chúng Ta Tin
                </Typography>
                <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
                <Typography variant="body1" paragraph>
                  Giải thích các tín điều trong Kinh Tin Kính, trình bày về đức tin vào Thiên Chúa Ba Ngôi, sự sáng tạo, Giáo Hội và ơn cứu độ.
                </Typography>
                <Chip 
                  label="Câu hỏi 1-165" 
                  sx={{ bgcolor: 'white', color: theme.palette.primary.main, fontWeight: 'bold' }} 
                />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', bgcolor: theme.palette.secondary.main, color: 'white', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  PHẦN II
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Chúng Ta Mừng Các Bí Tích
                </Typography>
                <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
                <Typography variant="body1" paragraph>
                  Giải thích về bảy Bí Tích, phụng vụ và cách thức Thiên Chúa hoạt động qua các dấu chỉ và nghi thức trong Giáo Hội.
                </Typography>
                <Chip 
                  label="Câu hỏi 166-278" 
                  sx={{ bgcolor: 'white', color: theme.palette.secondary.main, fontWeight: 'bold' }} 
                />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', bgcolor: theme.palette.success.main, color: 'white', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  PHẦN III
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Chúng Ta Sống Trong Chúa Kitô
                </Typography>
                <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
                <Typography variant="body1" paragraph>
                  Khám phá cách sống theo giáo huấn của Chúa Kitô, dựa trên Mười Điều Răn và đời sống luân lý Kitô giáo trong thế giới hiện đại.
                </Typography>
                <Chip 
                  label="Câu hỏi 279-468" 
                  sx={{ bgcolor: 'white', color: theme.palette.success.main, fontWeight: 'bold' }} 
                />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', bgcolor: theme.palette.warning.main, color: 'white', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  PHẦN IV
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Chúng Ta Cầu Nguyện Thế Nào
                </Typography>
                <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
                <Typography variant="body1" paragraph>
                  Hướng dẫn về đời sống cầu nguyện, giải thích Kinh Lạy Cha và các hình thức cầu nguyện khác nhau trong truyền thống Công Giáo.
                </Typography>
                <Chip 
                  label="Câu hỏi 469-527" 
                  sx={{ bgcolor: 'white', color: theme.palette.warning.main, fontWeight: 'bold' }} 
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Why YOUCAT is Important */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom textAlign="center" color="primary.main" sx={{ mb: 5 }}>
            Tầm Quan Trọng Của YOUCAT
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <LocalLibraryIcon color="primary" sx={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">Cầu Nối Đức Tin Cho Giới Trẻ</Typography>}
                    secondary={
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        YOUCAT giúp người trẻ tiếp cận với đức tin Công Giáo qua ngôn ngữ và phong cách gần gũi với đời sống của họ, giải quyết khoảng cách giữa giáo lý truyền thống và thế hệ trẻ hiện đại.
                      </Typography>
                    }
                  />
                </ListItem>
                
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <GroupsIcon color="primary" sx={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">Công Cụ Giáo Dục Đức Tin</Typography>}
                    secondary={
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Là tài liệu quan trọng trong việc dạy giáo lý, hướng dẫn dự tòng, và giáo dục đức tin cho người trẻ. Định dạng hỏi-đáp giúp việc học và giảng dạy trở nên cụ thể và hiệu quả.
                      </Typography>
                    }
                  />
                </ListItem>
                
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" sx={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">Nguồn Tham Khảo Đáng Tin Cậy</Typography>}
                    secondary={
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Trong thời đại thông tin phức tạp, YOUCAT cung cấp nội dung chính thống, được Tòa Thánh Vatican phê chuẩn, giúp người trẻ tìm hiểu đức tin từ nguồn đáng tin cậy.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3, borderRadius: 3, bgcolor: 'white' }}>
                <Typography variant="h5" component="h3" gutterBottom color="primary.main">
                  YOUCAT Trong Thời Đại Số
                </Typography>
                <Typography variant="body1" paragraph>
                  YOUCAT không chỉ là một cuốn sách giáo lý thông thường mà đã phát triển thành một bộ sưu tập các tài liệu và công cụ đa phương tiện hiện đại để tiếp cận giới trẻ trong kỷ nguyên số:
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Chip 
                      label="Ứng dụng di động YOUCAT Daily" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ width: '100%', mb: 1 }} 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Chip 
                      label="Sách DOCAT về giáo huấn xã hội" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ width: '100%', mb: 1 }} 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Chip 
                      label="Kinh Thánh YOUCAT" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ width: '100%', mb: 1 }} 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Chip 
                      label="Sách Cầu Nguyện YOUCAT" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ width: '100%', mb: 1 }} 
                    />
                  </Grid>
                </Grid>
                
                <Typography variant="body1" paragraph>
                  YOUCAT Foundation cũng tổ chức nhiều hoạt động và phong trào quốc tế, kết nối người trẻ Công Giáo toàn cầu và khuyến khích họ đào sâu hiểu biết về đức tin.
                </Typography>
                
                <Box textAlign="center" mt={3}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size="large"
                    onClick={handleQuizNavigation}
                  >
                    Trải Nghiệm Youcat Question
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Call to Action */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 6,
          backgroundImage: 'linear-gradient(135deg, #00A3FF 0%, #2965F1 100%)',
          borderRadius: { xs: 0, md: '30px 30px 0 0' },
          mt: 8
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Khám Phá YOUCAT Ngay Hôm Nay
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal' }}>
            Ứng dụng Youcat Question giúp bạn học hỏi giáo lý qua các bài kiểm tra tương tác hấp dẫn
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ px: 4, bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                onClick={handleQuizNavigation}
              >
                Bắt Đầu Ngay
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                size="large" 
                sx={{ px: 4, borderColor: 'white', color: 'white', '&:hover': { borderColor: 'grey.300' } }}
                onClick={() => navigate('/about')}
              >
                Tìm Hiểu Thêm
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default YoucatPage; 