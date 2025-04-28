import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  Chip, 
  CircularProgress, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  SelectChangeEvent,
  Pagination,
  Paper,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Alert,
  Tabs,
  Tab,
  styled
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FilterList as FilterIcon, 
  ExpandMore as ExpandMoreIcon,
  Menu as MenuIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  BookmarkBorder as BookmarkIcon,
  LocalLibrary as LibraryIcon,
  Article as ArticleIcon
} from '@mui/icons-material';
import { questionApi } from '@apis/api';
import { useLanguage } from '@context/LanguageContext';
import { 
  Question, 
  QuestionFilters, 
  QuestionSearchParams,
  QuestionResponse 
} from '@/types/question';
import { useNavigate } from 'react-router-dom';

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: '16px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6]
  }
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontWeight: 'bold',
  borderRadius: '8px'
}));

const BookIndicator = styled(Box)(({ theme }) => ({
  width: '6px',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.primary.main
}));

const PartIndicator = styled(Box)<{partColor: string}>(({ theme, partColor }) => ({
  width: '100%',
  height: '6px',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: partColor
}));

// Main component
const QuizListPage: React.FC = () => {
  const theme = useTheme();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<number>(0);
  
  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 9;
  
  // Filter state
  const [filters, setFilters] = useState<QuestionFilters>({
    name: '',
    question_id: '',
    chapter_id: '',
    chapter_index: '',
    section_index: '',
    part_index: '',
    book_id: ''
  });
  
  // Sorting state
  const [sortField, setSortField] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  
  // Color mapping for parts
  const partColors: Record<string, string> = {
    'PHẦN 1': theme.palette.primary.main,
    'PHẦN 2': theme.palette.secondary.main, 
    'PHẦN 3': theme.palette.warning.main,
    'PHẦN 4': theme.palette.info.main
  };
  
  const getPartColor = (partName: string): string => {
    return partColors[partName] || theme.palette.primary.main;
  };
  
  // Debounce search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500); // 500ms delay
    
    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);
  
  // Fetch questions with search and filter parameters
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params: QuestionSearchParams = {
          fieldSort: sortField,
          orderBy: sortOrder,
          offSet: (page - 1) * itemsPerPage,
          limit: itemsPerPage,
          name: debouncedSearch || undefined,
          question_id: filters.question_id || undefined,
          chapter_id: filters.chapter_id || undefined,
          chapter_index: filters.chapter_index || undefined,
          section_index: filters.section_index || undefined,
          part_index: filters.part_index || undefined,
          book_id: filters.book_id || undefined
        };
        
        const response = await questionApi.searchQuestions(params);
        const data = response.data as QuestionResponse;
        
        if (data.statusCode === 200) {
          setQuestions(data.data.data);
          setTotalItems(data.data.total);
        } else {
          setError(data.message || 'Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [page, debouncedSearch, filters, sortField, sortOrder]);
  
  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  // Handle filter changes for text fields
  const handleTextFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1); // Reset to first page when filter changes
  };
  
  // Handle filter changes for select fields
  const handleSelectFilterChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1); // Reset to first page when filter changes
  };
  
  // Handle sort changes
  const handleSortChange = (field: string) => {
    if (sortField === field) {
      // If clicking the same field, toggle order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as the sort field with desc order
      setSortField(field);
      setSortOrder('desc');
    }
    setPage(1); // Reset to first page when sort changes
  };
  
  // Handle search input change
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  
  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      name: '',
      question_id: '',
      chapter_id: '',
      chapter_index: '',
      section_index: '',
      part_index: '',
      book_id: ''
    });
    setSearchInput('');
    setDebouncedSearch('');
    setSortField('id');
    setSortOrder('desc');
    setPage(1);
  };

  // Navigate to question detail
  const handleViewDetail = (questionId: number) => {
    navigate(`/quiz/detail/${questionId}`);
  };
 // Start a quiz with this question
 const handleStartQuiz = (questionId: number) => {
  if (questionId) {
    navigate(`/quiz/single-question/${questionId}`);
  }
};

  // Get translation directly from the LanguageContext
  const getTranslation = useCallback((key: string) => {
    return t(key);
  }, [t]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper 
        elevation={3}
        sx={{
          background: 'linear-gradient(135deg, #4ECDC4 0%, #06D6A0 100%)',
          color: 'white',
          mb: 4,
          p: 6,
          borderRadius: '20px',
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
            bottom: '-100px',
            right: '-50px',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            top: '-75px',
            left: '10%',
          }}
        />

        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 'bold', position: 'relative', zIndex: 1 }}
        >
          {getTranslation('questionLibrary')}
        </Typography>
        
        <Typography 
          variant="h6"
          component="p"
          sx={{ 
            maxWidth: '800px', 
            mb: 4,
            position: 'relative',
            zIndex: 1
          }}
        >
          {getTranslation('exploreQuestionsLibrary')}
        </Typography>
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <TextField
            fullWidth
            placeholder={getTranslation('searchQuestions')}
            value={searchInput}
            onChange={handleSearchInputChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { 
                bgcolor: 'white', 
                borderRadius: 2,
                '& fieldset': { border: 'none' },
              }
            }}
          />
        </Box>
      </Paper>
      
      {/* Filters Section */}
      <Paper sx={{ mb: 4, p: 3, borderRadius: '16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            {getTranslation('filters')}
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label={getTranslation('questionId')}
              name="question_id"
              value={filters.question_id}
              onChange={handleTextFilterChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="book-label">{getTranslation('book')}</InputLabel>
              <Select
                labelId="book-label"
                name="book_id"
                value={filters.book_id}
                onChange={handleSelectFilterChange}
                label={getTranslation('book')}
              >
                <MenuItem value="">
                  <em>{getTranslation('all')}</em>
                </MenuItem>
                <MenuItem value="1">Youcat</MenuItem>
                <MenuItem value="2">Toát yếu giáo lý</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="part-label">{getTranslation('part')}</InputLabel>
              <Select
                labelId="part-label"
                name="part_index"
                value={filters.part_index}
                onChange={handleSelectFilterChange}
                label={getTranslation('part')}
              >
                <MenuItem value="">
                  <em>{getTranslation('all')}</em>
                </MenuItem>
                <MenuItem value="PHẦN 1">PHẦN 1</MenuItem>
                <MenuItem value="PHẦN 2">PHẦN 2</MenuItem>
                <MenuItem value="PHẦN 3">PHẦN 3</MenuItem>
                <MenuItem value="PHẦN 4">PHẦN 4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="section-label">{getTranslation('section')}</InputLabel>
              <Select
                labelId="section-label"
                name="section_index"
                value={filters.section_index}
                onChange={handleSelectFilterChange}
                label={getTranslation('section')}
              >
                <MenuItem value="">
                  <em>{getTranslation('all')}</em>
                </MenuItem>
                <MenuItem value="ĐOẠN 1">ĐOẠN 1</MenuItem>
                <MenuItem value="ĐOẠN 2">ĐOẠN 2</MenuItem>
                <MenuItem value="ĐOẠN 3">ĐOẠN 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="chapter-label">{getTranslation('chapter')}</InputLabel>
              <Select
                labelId="chapter-label"
                name="chapter_index"
                value={filters.chapter_index}
                onChange={handleSelectFilterChange}
                label={getTranslation('chapter')}
              >
                <MenuItem value="">
                  <em>{getTranslation('all')}</em>
                </MenuItem>
                <MenuItem value="CHƯƠNG 1">CHƯƠNG 1</MenuItem>
                <MenuItem value="CHƯƠNG 2">CHƯƠNG 2</MenuItem>
                <MenuItem value="CHƯƠNG 3">CHƯƠNG 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={handleResetFilters}
              size="small"
              fullWidth
            >
              {getTranslation('resetFilters')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* View Tabs */}
      <Box sx={{ mb: 2 }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab icon={<MenuIcon />} label={getTranslation('grid')} />
          <Tab icon={<ArticleIcon />} label={getTranslation('list')} />
        </Tabs>
      </Box>
      
      {/* Results Count */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}
      >
        <Typography variant="body1">
          {getTranslation('showing')} {questions.length} {getTranslation('of')} {totalItems} {getTranslation('questions')}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {getTranslation('sortBy')}:
          </Typography>
          <Button 
            size="small" 
            onClick={() => handleSortChange('id')}
            color={sortField === 'id' ? 'primary' : 'inherit'}
            endIcon={sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
          >
            ID
          </Button>
          <Button 
            size="small" 
            onClick={() => handleSortChange('name')}
            color={sortField === 'name' ? 'primary' : 'inherit'}
            endIcon={sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          >
            {getTranslation('name')}
          </Button>
          <Button 
            size="small" 
            onClick={() => handleSortChange('created_at')}
            color={sortField === 'created_at' ? 'primary' : 'inherit'}
            endIcon={sortField === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
          >
            {getTranslation('date')}
          </Button>
        </Box>
      </Box>
      
      {/* Display Error if any */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : questions.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8, 
            px: 2,
            bgcolor: 'background.paper',
            borderRadius: 2
          }}
        >
          <MenuBookIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            {getTranslation('noQuestionsFound')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {getTranslation('tryDifferentSearch')}
          </Typography>
        </Box>
      ) : (
        // Grid View
        selectedTab === 0 ? (
          <Grid container spacing={3}>
            {questions.map((question) => (
              <Grid item xs={12} sm={6} md={4} key={question.id}>
                <StyledCard onClick={() => handleViewDetail(question.id)} sx={{ cursor: 'pointer' }}>
                  <BookIndicator />
                  <PartIndicator 
                    partColor={getPartColor(question.Chapter.Section.Part.index_name)} 
                  />
                  
                  <CardContent sx={{ position: 'relative', pt: 3, pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Tooltip title={`ID: ${question.id}`}>
                        <StyledChip 
                          label={question.Chapter.Section.Part.Book.name}
                          color="primary"
                          size="small"
                          icon={<SchoolIcon />}
                        />
                      </Tooltip>
                      
                      <Tooltip title={question.Chapter.Section.Part.name}>
                        <StyledChip 
                          label={question.Chapter.Section.Part.index_name}
                          color="secondary"
                          size="small"
                          sx={{ 
                            bgcolor: getPartColor(question.Chapter.Section.Part.index_name),
                            color: '#fff'
                          }}
                        />
                      </Tooltip>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                      <Tooltip title={question.Chapter.Section.name}>
                        <StyledChip 
                          label={question.Chapter.Section.index_name} 
                          variant="outlined"
                          size="small"
                          icon={<BookmarkIcon sx={{ fontSize: '0.8rem' }} />}
                        />
                      </Tooltip>
                      
                      <Tooltip title={question.Chapter.name}>
                        <StyledChip 
                          label={question.Chapter.index_name}
                          variant="outlined"
                          size="small"
                          icon={<LibraryIcon sx={{ fontSize: '0.8rem' }} />}
                        />
                      </Tooltip>
                    </Box>
                    
                    <Typography variant="h6" component="h3" gutterBottom>
                      {question.name}
                    </Typography>
                    
                    {question.description && (
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {question.description.substring(0, 80)}
                        {question.description.length > 80 ? '...' : ''}
                      </Typography>
                    )}
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {getTranslation('answer')}:
                    </Typography>
                    
                    {question.Answers && question.Answers.length > 0 ? (
                      <Typography variant="body2">
                        {question.Answers[0].name?.substring(0, 120)}
                        {question.Answers[0].name?.length > 120 ? '...' : ''}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary" fontStyle="italic">
                        {getTranslation('noAnswerProvided')}
                      </Typography>
                    )}
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          // List View
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            {questions.map((question, index) => (
              <Accordion 
                key={question.id}
                disableGutters
                elevation={0}
                sx={{ 
                  borderBottom: index < questions.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    bgcolor: 'background.paper',
                    borderLeft: '6px solid',
                    borderLeftColor: getPartColor(question.Chapter.Section.Part.index_name),
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {question.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={`ID: ${question.id}`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip 
                          label={question.Chapter.Section.Part.index_name}
                          size="small"
                          sx={{ 
                            bgcolor: getPartColor(question.Chapter.Section.Part.index_name),
                            color: '#fff'
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {question.Chapter.Section.Part.Book.name} &gt; {question.Chapter.Section.Part.index_name} &gt; {question.Chapter.Section.index_name} &gt; {question.Chapter.index_name}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails sx={{ p: 3, bgcolor: 'background.default' }}>
                  {question.description && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {getTranslation('description')}:
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {question.description}
                      </Typography>
                    </Box>
                  )}
                  
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {getTranslation('answer')}:
                  </Typography>
                  
                  {question.Answers && question.Answers.length > 0 ? (
                    <Box>
                      <Typography variant="body1">
                        {question.Answers[0].name}
                      </Typography>
                      
                      {question.Answers[0].description && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {getTranslation('answerDescription')}:
                          </Typography>
                          <Typography variant="body2">
                            {question.Answers[0].description}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary" fontStyle="italic">
                      {getTranslation('noAnswerProvided')}
                    </Typography>
                  )}
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small" onClick={() => handleStartQuiz(question.id)}>
                      {getTranslation('startQuiz')}
                      
                    </Button>
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={() => handleViewDetail(question.id)}
                    >
                      {getTranslation('viewDetails')}
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        )
      )}
      
      {/* Pagination */}
      {!loading && questions.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={Math.ceil(totalItems / itemsPerPage)}
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default QuizListPage; 