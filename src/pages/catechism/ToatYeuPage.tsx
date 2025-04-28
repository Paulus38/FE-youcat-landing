import React from 'react';
import { Container, Typography, Box, Divider, Grid, Paper } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const ToatYeuPage: React.FC = () => (
  <>
    <Helmet>
      <title>Toát yếu Giáo Lý Công Giáo | Tìm hiểu cốt lõi đức tin Công Giáo</title>
      <meta
        name="description"
        content="Toát yếu giáo lý là bản tóm lược súc tích, dễ hiểu nhất về Giáo Lý Công Giáo, giúp bạn tiếp cận nhanh, hiểu sâu và sống trọn vẹn đức tin. Khám phá nội dung, câu hỏi thường gặp, lợi ích và cách học hiệu quả Toát yếu giáo lý tại đây!"
      />
      <meta
        name="keywords"
        content="toát yếu giáo lý, giáo lý công giáo, compendium, catechism, compendium of the catechism, học giáo lý, đức tin công giáo, giáo lý viên, sách giáo lý, tài liệu giáo lý, học hỏi giáo lý, giáo lý căn bản, giáo lý nâng cao, giáo lý thiếu nhi, giáo lý người lớn, giáo lý dự tòng, giáo lý tân tòng, giáo lý hôn nhân, giáo lý bí tích, giáo lý rửa tội, giáo lý thêm sức, giáo lý hôn phối, giáo lý thánh lễ, giáo lý kitô giáo, giáo lý công giáo việt nam, giáo lý công giáo english, giáo lý công giáo pdf, giáo lý công giáo online, giáo lý công giáo hỏi đáp, giáo lý công giáo căn bản, giáo lý công giáo nâng cao, giáo lý công giáo thiếu nhi, giáo lý công giáo người lớn, giáo lý công giáo dự tòng, giáo lý công giáo tân tòng, giáo lý công giáo hôn nhân, giáo lý công giáo bí tích, giáo lý công giáo rửa tội, giáo lý công giáo thêm sức, giáo lý công giáo hôn phối, giáo lý công giáo thánh lễ, giáo lý công giáo kitô giáo, học toát yếu giáo lý, tìm hiểu toát yếu giáo lý, câu hỏi toát yếu giáo lý, trả lời toát yếu giáo lý, tài liệu toát yếu giáo lý, sách toát yếu giáo lý, hướng dẫn toát yếu giáo lý, toát yếu giáo lý công giáo, toát yếu giáo lý hỏi đáp, toát yếu giáo lý pdf, toát yếu giáo lý online, toát yếu giáo lý thiếu nhi, toát yếu giáo lý người lớn, toát yếu giáo lý dự tòng, toát yếu giáo lý tân tòng, toát yếu giáo lý hôn nhân, toát yếu giáo lý bí tích, toát yếu giáo lý rửa tội, toát yếu giáo lý thêm sức, toát yếu giáo lý hôn phối, toát yếu giáo lý thánh lễ, toát yếu giáo lý kitô giáo, compendium giáo lý công giáo, compendium giáo lý, compendium catechism, compendium of catechism, catholic catechism, catholic compendium, catholic faith, giáo lý công giáo toàn tập, giáo lý công giáo trọn bộ, giáo lý công giáo tổng hợp, giáo lý công giáo chi tiết, giáo lý công giáo dễ hiểu, giáo lý công giáo ngắn gọn, giáo lý công giáo hỏi đáp, giáo lý công giáo cho người mới, giáo lý công giáo cho người trẻ, giáo lý công giáo cho thiếu nhi, giáo lý công giáo cho người lớn, giáo lý công giáo cho dự tòng, giáo lý công giáo cho tân tòng, giáo lý công giáo cho hôn nhân, giáo lý công giáo cho bí tích, giáo lý công giáo cho rửa tội, giáo lý công giáo cho thêm sức, giáo lý công giáo cho hôn phối, giáo lý công giáo cho thánh lễ, giáo lý công giáo cho kitô giáo"
      />
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Toát yếu giáo lý là gì?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Toát yếu giáo lý là bản tóm lược các điểm cốt lõi của Giáo Lý Công Giáo, trình bày ngắn gọn, dễ hiểu, giúp mọi người tiếp cận nhanh và sống đức tin vững vàng."
              }
            },
            {
              "@type": "Question",
              "name": "Vì sao nên học Toát yếu giáo lý?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Toát yếu giáo lý giúp bạn nắm vững nền tảng đức tin, trả lời các thắc mắc về giáo lý, và áp dụng vào đời sống Kitô hữu hằng ngày."
              }
            },
            {
              "@type": "Question",
              "name": "Toát yếu giáo lý có dành cho ai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Toát yếu giáo lý phù hợp cho mọi tín hữu Công Giáo, đặc biệt là người mới tìm hiểu hoặc muốn hệ thống lại kiến thức giáo lý."
              }
            }
          ]
        }
        `}
      </script>
    </Helmet>

    <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 6, lg: 12 }, py: { xs: 4, md: 8 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>

        <Typography variant="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: 32, md: 44 }, color: 'primary.main' }}>
          Toát Yếu Giáo Lý Công Giáo
        </Typography>
        <Typography variant="h2" align="center" color="text.secondary" gutterBottom sx={{ fontSize: { xs: 18, md: 28 } }}>
          Khám phá cốt lõi đức tin, sống trọn vẹn đời Kitô hữu với <b>Toát yếu giáo lý</b> – chìa khóa giúp bạn tiếp cận nhanh, hiểu sâu và ứng dụng các giá trị giáo lý Công Giáo vào đời sống mỗi ngày.
        </Typography>
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
          <ul style={{ fontSize: 18, lineHeight: 1.6, color: '#444', paddingLeft: 24 }}>
            <li>Hệ thống hóa kiến thức đức tin một cách bài bản, dễ nhớ, dễ thực hành.</li>
            <li>Phù hợp cho mọi đối tượng: người mới tìm hiểu Công Giáo, giáo lý viên, dự tòng, tân tòng, thiếu nhi, người lớn, nhóm học hỏi.</li>
            <li>Giúp trả lời mọi câu hỏi về đức tin, bí tích, mười điều răn, kinh nguyện.</li>
            <li>Là nguồn tài liệu tham khảo đáng tin cậy cho hành trình sống đạo, học hỏi và chia sẻ đức tin.</li>
            <li>Truyền cảm hứng, động lực sống đức tin, lan tỏa tình yêu thương và bác ái đến cộng đồng.</li>
          </ul>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src="/toat-yeu-giao-ly/toat-yeu-giao-ly.jpeg"
              alt="Sách Toát yếu giáo lý Công Giáo - tài liệu học hỏi giáo lý, compendium, giáo lý công giáo, toát yếu giáo lý cho mọi người"
              style={{ display: 'block', margin: '0 auto', maxWidth: 320, width: '100%', borderRadius: 12, boxShadow: '0 4px 24px rgba(25, 118, 210, 0.12)' }}
              loading="lazy"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, background: '#f8fafc' }}>
              <Typography variant="h3" sx={{ fontSize: 22, fontWeight: 'bold', mb: 2, color: 'primary.dark' }}>
                Toát yếu giáo lý là gì?
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Toát yếu giáo lý</strong> là bản tóm lược các điểm cốt lõi của <strong>Giáo Lý Công Giáo</strong>, được trình bày ngắn gọn, dễ hiểu, giúp mọi người tiếp cận nhanh và sống đức tin vững vàng.
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Đây là tài liệu không thể thiếu cho người mới tìm hiểu đạo, các bạn trẻ, giáo lý viên và mọi tín hữu muốn hệ thống lại kiến thức đức tin.
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Nội dung bao gồm các chủ đề: <strong>Đức Tin, Bí Tích, Mười Điều Răn, Kinh Nguyện</strong>... được trình bày theo dạng hỏi đáp, dễ nhớ, dễ áp dụng.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="h2" sx={{ fontSize: 26, fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            Vì sao nên học Toát yếu giáo lý?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, height: '100%', background: '#e3f2fd' }}>
                <Typography variant="h4" sx={{ fontSize: 18, fontWeight: 'bold', color: 'primary.dark' }}>Hiểu đúng đức tin</Typography>
                <Typography variant="body2">Giúp bạn nắm vững nền tảng giáo lý, tránh hiểu sai hoặc lệch lạc về đức tin Công Giáo.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, height: '100%', background: '#fffde7' }}>
                <Typography variant="h4" sx={{ fontSize: 18, fontWeight: 'bold', color: 'warning.dark' }}>Ứng dụng thực tế</Typography>
                <Typography variant="body2">Dễ dàng áp dụng giáo lý vào đời sống, giúp sống đạo tích cực và truyền cảm hứng cho cộng đồng.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, height: '100%', background: '#e8f5e9' }}>
                <Typography variant="h4" sx={{ fontSize: 18, fontWeight: 'bold', color: 'success.dark' }}>Dễ học, dễ nhớ</Typography>
                <Typography variant="body2">Cấu trúc hỏi đáp ngắn gọn, dễ học, phù hợp cho mọi lứa tuổi và trình độ.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box mt={6}>
          <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            Câu hỏi thường gặp về Toát yếu giáo lý
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box>
            <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 600, mb: 1 }}>Toát yếu giáo lý có khác gì với sách Giáo Lý?</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Toát yếu giáo lý là bản tóm lược, giúp bạn nắm nhanh nội dung chính của sách Giáo Lý Công Giáo. Nếu muốn đào sâu, bạn nên kết hợp cả hai tài liệu này.
            </Typography>
            <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 600, mb: 1 }}>Ai nên học Toát yếu giáo lý?</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Mọi tín hữu Công Giáo, đặc biệt là người mới tìm hiểu, người chuẩn bị lãnh nhận các bí tích, giáo lý viên và các bạn trẻ.
            </Typography>
            <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 600, mb: 1 }}>Học Toát yếu giáo lý ở đâu hiệu quả?</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Bạn có thể học online tại đây, tham khảo tài liệu chính thức từ Giáo Hội, hoặc tham gia các lớp giáo lý tại giáo xứ.
            </Typography>
          </Box>
        </Box>
        <Box mt={6}>
          <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            Hình ảnh & cảm hứng giáo lý
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img
                src="/toat-yeu-giao-ly/sach-giao-ly.png"
                alt="Cộng đoàn học giáo lý Công Giáo, học hỏi toát yếu giáo lý, giáo lý công giáo, compendium, catechism, giáo lý viên, nhóm học giáo lý"
                style={{ width: '100%', borderRadius: 10, marginBottom: 8 }}
                loading="lazy"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <img
                src="/toat-yeu-giao-ly/user-read-book.png"
                alt="Sách giáo lý, cây thánh giá, tài liệu giáo lý công giáo, compendium, catechism, học giáo lý, đức tin công giáo"
                style={{ width: '100%', borderRadius: 10, marginBottom: 8 }}
                loading="lazy"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <img
                src="/toat-yeu-giao-ly/book-thanh-gia.png"
                alt="Giáo lý viên hướng dẫn thiếu nhi Công Giáo, học giáo lý thiếu nhi, giáo lý công giáo, compendium, catechism, giáo lý cho trẻ em"
                style={{ width: '100%', borderRadius: 10, marginBottom: 8 }}
                loading="lazy"
              />
            </Grid>
          </Grid>
        </Box>
      </Box> 
  </>
);

export default ToatYeuPage;
 