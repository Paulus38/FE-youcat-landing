import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Collapse,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import QuizIcon from '@mui/icons-material/Quiz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { getExamBySetId, getExamSets } from '@/services/examSetService';
import { PredefinedExam } from './types/Exam.interface';

interface Topic {
  id: number;
  name: string;
  description: string | null;
  created_time: string;
  updated_time: string;
  is_deleted: number;
}

interface ExamSelectorProps {
  handlePredefinedExamSelect: (examId: number) => void;
  setPredefinedExams?: React.Dispatch<React.SetStateAction<PredefinedExam[]>>;
}
export const TopicList: React.FC<ExamSelectorProps> = ({
  handlePredefinedExamSelect,
  setPredefinedExams,
}) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [expandedTopicId, setExpandedTopicId] = useState<number | null>(null);
  const [exams, setExams] = useState<PredefinedExam[]>([]);
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  const fetchExamSet = async () => {
    try {
      const res = await getExamSets();
      setTopics(res.data);
    } catch (err) {
      console.error('Error fetching exam sets:', err);
    }
  };
  useEffect(() => {
    fetchExamSet();
  }, []);

  const fetchExams = async (topicId: number) => {
    try {
      setLoading((prev) => ({ ...prev, [topicId]: true }));
      const data = await getExamBySetId(topicId);
      setExams(data.data.Exams);
      setPredefinedExams && setPredefinedExams(data.data.Exams);
      setLoading((prev) => ({ ...prev, [topicId]: false }));
    } catch (err) {
      console.error(`Error fetching exams for topic ${topicId}:`, err);
    }
  };
  const handleToggle = (topicId: number) => {
    const isExpanded = expandedTopicId === topicId;
    setExpandedTopicId(isExpanded ? null : topicId);

    if (!isExpanded && !exams[topicId]) {
      fetchExams(topicId);
    }
  };

  const handleClickedExam = (examId: number) => {
    handlePredefinedExamSelect(examId);
    // You can add any additional logic here if needed
  };

  return (
    <Grid container spacing={2}>
      {topics.map((topic) => (
        <Grid item xs={12} md={6} lg={4} key={topic.id}>
          <Card
            sx={{
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='h6' display='flex' alignItems='center'>
                  <MenuBookIcon sx={{ mr: 1, color: '#3f51b5' }} />
                  {topic.name}
                </Typography>
                <IconButton onClick={() => handleToggle(topic.id)}>
                  {expandedTopicId === topic.id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </Box>
              <Collapse in={expandedTopicId === topic.id}>
                <Box mt={2}>
                  {loading[topic.id] ? (
                    <CircularProgress size={24} />
                  ) : (
                    <List dense>
                      {exams.map((exam) => (
                        <ListItem
                          key={exam.id}
                          button
                          onClick={() => handleClickedExam(exam.id)}
                          sx={{
                            borderRadius: 1,
                            mb: 1,
                            bgcolor: '#f5f5f5',
                            '&:hover': {
                              bgcolor: '#e0f7fa',
                            },
                          }}
                        >
                          <QuizIcon sx={{ color: '#1976d2', mr: 2 }} />
                          <Box>
                            <Typography variant='subtitle1' fontWeight='bold'>
                              {exam.title}
                            </Typography>
                            <Box display='flex' alignItems='center' gap={1}>
                              <AccessTimeIcon fontSize='small' color='action' />
                              <Typography variant='body2'>
                                {exam.duration} phút
                              </Typography>
                              <HelpOutlineIcon
                                fontSize='small'
                                color='action'
                              />
                              <Typography variant='body2'>
                                {exam.total_question} câu hỏi
                              </Typography>
                            </Box>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
