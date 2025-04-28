import React from 'react';
import { Box, Typography, Paper, Grid, Chip, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ToatYeuIntroHome = () => (
  <Paper elevation={4} sx={{ p: { xs: 2, md: 5 }, mb: 5, background: '#f4f8fb', borderRadius: 4 }}>
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={5}>
        {/* Hình ảnh minh họa, có thể thay src bằng hình thật */}
        <Box display="flex" justifyContent="center">
          <img
            src="/toat-yeu-giao-ly/toat-yeu-giao-ly.jpeg"
            alt="Toát Yếu Giáo Lý"
            style={{ maxWidth: '100%', borderRadius: 16, boxShadow: '0 4px 24px rgba(25, 118, 210, 0.12)' }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box>
          <Chip label="Cốt lõi Đức Tin" color="primary" sx={{ mb: 2, fontWeight: 'bold', fontSize: 16 }} />
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', letterSpacing: 1 }}>
            Toát Yếu Giáo Lý Công Giáo
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 20, color: '#222', mb: 2, fontWeight: 500 }}>
            Toát Yếu Giáo Lý là tinh hoa của giáo huấn Công Giáo, giúp bạn nắm vững nền tảng đức tin, hiểu rõ ý nghĩa và giá trị của đời sống Kitô hữu.
          </Typography>
          <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1, fontSize: 16 }}>
            Hãy khám phá, học hỏi và để giáo lý soi sáng từng bước đường đời bạn!
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
            Bộ Toát Yếu không chỉ là tài liệu học tập, mà còn là nguồn cảm hứng giúp bạn sống và truyền cảm hứng đức tin cho cộng đồng.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/catechism/toat-yeu"
              sx={{ fontWeight: 'bold', px: 4, borderRadius: 99, boxShadow: 2 }}
            >
              Khám phá ngay
            </Button>
          </Box>

        </Box>
      </Grid>
    </Grid>
  </Paper>
);

export default ToatYeuIntroHome;
