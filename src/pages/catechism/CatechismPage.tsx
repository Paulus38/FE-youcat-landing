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
  ListItemText
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';

const CatechismPage: React.FC = () => {
  const navigate = useNavigate();

  const handleQuizNavigation = () => {
    navigate('/quiz');
  };

  return (
    <>
      <Helmet>
        <title>Giáo Lý Công Giáo - Tìm Hiểu Hành Trình Đức Tin</title>
        <meta name="description" content="Khám phá Giáo Lý Công Giáo từ cơ bản đến nâng cao. Hiểu rõ về Đức Tin, các Bí Tích, Mười Điều Răn và Kinh Nguyện trong đời sống Công Giáo." />
        <meta name="keywords" content="Giáo Lý Công Giáo, Đức Tin Công Giáo, Hỏi Đáp Giáo Lý, YOUCAT, Giáo Lý Hội Thánh Công Giáo, Giáo Lý Tân Tòng" />
      </Helmet>

      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Giáo Lý Công Giáo
              </Typography>
              <Typography variant="h5" paragraph>
                Hành Trình Khám Phá Đức Tin
              </Typography>
              <Typography variant="body1" paragraph>
                Giáo lý là nền tảng giáo huấn của Hội Thánh Công Giáo về đức tin. Hiểu rõ giáo lý giúp người tín hữu sống đức tin một cách trọn vẹn và có ý nghĩa hơn.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large" 
                sx={{ mt: 2 }}
                onClick={handleQuizNavigation}
              >
                Tìm Hiểu Ngay
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={6}
                sx={{
                  height: 300,
                  backgroundImage: `url('/catechism-hero.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        {/* Intro Section */}
        <Box mb={6}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="primary.main">
            Tầm Quan Trọng của Giáo Lý trong Đời Sống Đức Tin
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
            Giáo lý Công Giáo là tổng hợp những giáo huấn của Giáo Hội Công Giáo về đức tin, luân lý và đời sống thiêng liêng. 
            Đây là hành trang cần thiết cho mỗi Kitô hữu trong cuộc sống và là nền tảng vững chắc để sống đức tin một cách trưởng thành và có ý thức.
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom color="secondary.main">
                Lịch Sử Hình Thành
              </Typography>
              <Typography variant="body1" paragraph>
                Giáo lý Công Giáo hiện đại được công bố chính thức vào năm 1992 dưới sự chủ trì của Đức Giáo Hoàng Gioan Phaolô II. 
                Tuy nhiên, truyền thống dạy giáo lý đã có từ thời các Tông Đồ với mục đích truyền đạt những giáo huấn của Chúa Giêsu.
              </Typography>
              <Typography variant="body1" paragraph>
                Qua nhiều thế kỷ, các hình thức giáo lý đã được phát triển, từ những văn bản cổ như Didache (thế kỷ thứ nhất) đến Sách Giáo Lý của Công Đồng Trent 
                (thế kỷ 16) và cuối cùng là Sách Giáo Lý của Giáo Hội Công Giáo năm 1992 và các ấn bản như YOUCAT dành cho giới trẻ.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/catechism-history.jpg"
                alt="Lịch sử Giáo lý Công Giáo"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Four Pillars of Catechism */}
        <Box mb={6}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="primary.main">
            Bốn Trụ Cột của Giáo Lý Công Giáo
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
            Sách Giáo Lý Hội Thánh Công Giáo được tổ chức xoay quanh bốn trụ cột chính yếu, 
            phản ánh cấu trúc các văn bản giáo lý cổ đại và cung cấp một cái nhìn toàn diện về đức tin Công Giáo.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/pillar-creed.jpg"
                  alt="Tín Điều"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    Tuyên Xưng Đức Tin
                  </Typography>
                  <Typography variant="body2">
                    Bao gồm các tín điều trong Kinh Tin Kính, về Thiên Chúa Ba Ngôi, sự sáng tạo, 
                    Giáo Hội, và các chân lý đức tin cốt lõi khác mà người Công Giáo tin.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/pillar-sacraments.jpg"
                  alt="Các Bí Tích"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    Các Bí Tích
                  </Typography>
                  <Typography variant="body2">
                    Giải thích bảy Bí Tích của Giáo Hội: Rửa Tội, Thêm Sức, Thánh Thể, 
                    Hòa Giải, Xức Dầu Bệnh Nhân, Truyền Chức Thánh và Hôn Phối.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/pillar-moral.jpg"
                  alt="Luân Lý"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    Đời Sống Luân Lý
                  </Typography>
                  <Typography variant="body2">
                    Dựa trên Mười Điều Răn và Bài Giảng Trên Núi, trình bày các nguyên tắc 
                    luân lý và đạo đức Kitô giáo cho đời sống hàng ngày.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/pillar-prayer.jpg"
                  alt="Cầu Nguyện"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    Kinh Nguyện
                  </Typography>
                  <Typography variant="body2">
                    Giải thích ý nghĩa và tầm quan trọng của việc cầu nguyện, đặc biệt là 
                    Kinh Lạy Cha và các hình thức cầu nguyện khác trong đời sống Kitô hữu.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        
        {/* Key Benefits */}
        <Box mb={6} sx={{ bgcolor: 'grey.100', p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="primary.main">
            Lợi Ích của Việc Học Giáo Lý
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Hiểu rõ đức tin của mình" 
                secondary="Giáo lý giúp bạn nắm vững nền tảng đức tin Công giáo, hiểu lý do tại sao bạn tin và thực hành đức tin."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Tham gia tích cực vào đời sống Giáo Hội" 
                secondary="Hiểu biết giáo lý giúp bạn tham gia đầy đủ và có ý thức vào các cử hành phụng vụ và đời sống cộng đoàn."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Biện hộ và chia sẻ đức tin" 
                secondary="Trang bị kiến thức để bạn có thể giải thích đức tin cho người khác và trả lời các câu hỏi về niềm tin Công giáo."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Sống đức tin trong đời thường" 
                secondary="Ứng dụng các nguyên tắc giáo lý vào các quyết định và hành động hàng ngày để sống một đời sống Kitô hữu đích thực."
              />
            </ListItem>
          </List>
        </Box>
        
        {/* Different Catechism Versions */}
        <Box mb={6}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="primary.main">
            Các Ấn Bản Giáo Lý Phổ Biến
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h5" gutterBottom color="secondary.main">
                  <BookIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Sách Giáo Lý Của Hội Thánh Công Giáo
                </Typography>
                <Typography variant="body1" paragraph>
                  Đây là ấn bản đầy đủ và chính thức nhất của Giáo lý Công Giáo, được xuất bản năm 1992. 
                  Cuốn sách trình bày toàn bộ giáo huấn của Giáo Hội một cách có hệ thống và đầy đủ, 
                  là tài liệu tham khảo cho các linh mục, tu sĩ, giáo lý viên và tín hữu muốn đào sâu về đức tin.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h5" gutterBottom color="secondary.main">
                  <PeopleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  YOUCAT - Giáo Lý Cho Người Trẻ
                </Typography>
                <Typography variant="body1" paragraph>
                  Được phát triển đặc biệt cho giới trẻ, YOUCAT trình bày giáo lý với ngôn ngữ hiện đại, 
                  dễ hiểu và có minh họa. Đây là công cụ tuyệt vời để giới trẻ bắt đầu hành trình khám phá 
                  đức tin Công giáo một cách sống động và gần gũi.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom color="secondary.main">
                  <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Giáo Lý Tân Tòng
                </Typography>
                <Typography variant="body1" paragraph>
                  Đây là chương trình giáo lý dành cho người trưởng thành muốn gia nhập Giáo Hội Công Giáo. 
                  Chương trình này kéo dài khoảng một năm, giúp người học hiểu về đức tin và chuẩn bị nhận các Bí tích 
                  Khai Tâm (Rửa Tội, Thêm Sức và Thánh Thể).
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Call to Action */}
        <Box mb={6} textAlign="center">
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              bgcolor: 'primary.light', 
              color: 'primary.contrastText',
              borderRadius: 2
            }}
          >
            <Typography variant="h4" gutterBottom>
              Bắt Đầu Hành Trình Đức Tin Của Bạn
            </Typography>
            <Typography variant="body1" paragraph>
              Khám phá sự phong phú của Giáo lý Công Giáo và làm phong phú đời sống đức tin của bạn. 
              Từ những kiến thức cơ bản đến những lời dạy sâu sắc, Giáo lý là nguồn mạch vô tận để nuôi dưỡng tâm hồn.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ mt: 2 }}
              onClick={handleQuizNavigation}
            >
              Tham Gia Học Giáo Lý
            </Button>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default CatechismPage; 