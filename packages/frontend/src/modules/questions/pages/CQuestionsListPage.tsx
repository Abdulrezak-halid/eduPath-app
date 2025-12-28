/**
 * CQuestionsListPage
 *
 * Displays all questions with search and filtering capabilities
 */

import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { IQuestionFilters, useQuestions } from '@/shared/hooks/useQuestions';
import { MajorField } from '@/models';
import { CHeroSection } from '@/shared/components/CHeroSection';

const CQuestionsListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<MajorField | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filters: IQuestionFilters = useMemo(() => {
    const f: IQuestionFilters = {};
    if (searchQuery) f.searchQuery = searchQuery;
    if (selectedMajor) f.major = selectedMajor;
    if (selectedCategory) f.category = selectedCategory;
    return f;
  }, [searchQuery, selectedMajor, selectedCategory]);

  const { questions, loading, error } = useQuestions(filters);

  const majors: Array<{ value: MajorField; label: string }> = [
    {
      value: 'computer-science',
      label: t('major.computerScience') || 'Computer Science',
    },
    { value: 'engineering', label: t('major.engineering') || 'Engineering' },
    { value: 'medicine', label: t('major.medicine') || 'Medicine' },
    { value: 'business', label: t('major.business') || 'Business' },
    { value: 'law', label: t('major.law') || 'Law' },
    { value: 'arts', label: t('major.arts') || 'Arts' },
    { value: 'science', label: t('major.science') || 'Science' },
    { value: 'education', label: t('major.education') || 'Education' },
    {
      value: 'social-sciences',
      label: t('major.socialSciences') || 'Social Sciences',
    },
    { value: 'other', label: t('major.other') || 'Other' },
  ];

  const categories = [
    { value: 'academic', label: t('category.academic') || 'Academic' },
    { value: 'career', label: t('category.career') || 'Career' },
    { value: 'social', label: t('category.social') || 'Social' },
    { value: 'financial', label: t('category.financial') || 'Financial' },
    { value: 'general', label: t('category.general') || 'General' },
  ];

  const handleQuestionClick = (questionId: string) => {
    navigate(`/questions/${questionId}`);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return '';
    }
  };

  return (
    <Box>
      <CHeroSection
        title={t('questions.title') || 'Questions'}
        subtitle={
          t('questions.subtitle') ||
          'Ask questions and get answers from experienced students'
        }
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            {/* Search */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder={
                  t('questions.searchPlaceholder') || 'Search questions...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Major Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label={t('questions.filterByMajor') || 'Filter by Major'}
                value={selectedMajor}
                onChange={(e) =>
                  setSelectedMajor(e.target.value as MajorField | '')
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">
                  <em>{t('questions.allMajors') || 'All Majors'}</em>
                </MenuItem>
                {majors.map((major) => (
                  <MenuItem key={major.value} value={major.value}>
                    {major.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Category Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label={t('questions.filterByCategory') || 'Filter by Category'}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">
                  <em>{t('questions.allCategories') || 'All Categories'}</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {(selectedMajor || selectedCategory || searchQuery) && (
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {searchQuery && (
                <Chip
                  label={`Search: "${searchQuery}"`}
                  onDelete={() => setSearchQuery('')}
                  size="small"
                />
              )}
              {selectedMajor && (
                <Chip
                  label={majors.find((m) => m.value === selectedMajor)?.label}
                  onDelete={() => setSelectedMajor('')}
                  size="small"
                  color="primary"
                />
              )}
              {selectedCategory && (
                <Chip
                  label={
                    categories.find((c) => c.value === selectedCategory)?.label
                  }
                  onDelete={() => setSelectedCategory('')}
                  size="small"
                  color="secondary"
                />
              )}
            </Stack>
          )}
        </Box>

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Questions List */}
        {!loading && !error && (
          <>
            {questions.length === 0 ? (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('questions.noQuestions') || 'No questions found'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('questions.tryDifferentFilters') ||
                    'Try adjusting your filters or search query'}
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {questions.map((question, index) => (
                  <Grid item xs={12} key={question.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        sx={{
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 6,
                          },
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleQuestionClick(question.id!)}
                        >
                          <CardContent>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="flex-start"
                            >
                              <Box flex={1}>
                                {/* Title */}
                                <Typography variant="h6" gutterBottom>
                                  {question.title}
                                </Typography>

                                {/* Content Preview */}
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    mb: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                  }}
                                >
                                  {question.content}
                                </Typography>

                                {/* Tags */}
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  flexWrap="wrap"
                                  sx={{ mb: 2 }}
                                >
                                  {question.tags.map((tag) => (
                                    <Chip
                                      key={tag}
                                      label={tag}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ))}
                                </Stack>

                                {/* Meta Info */}
                                <Box display="flex" alignItems="center" gap={2}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <Avatar
                                      src={question.authorPhotoURL}
                                      alt={question.authorName}
                                      sx={{ width: 24, height: 24 }}
                                    >
                                      {question.authorName[0]}
                                    </Avatar>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {question.authorName}
                                    </Typography>
                                  </Box>

                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {formatDate(question.createdAt)}
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {question.answerCount}{' '}
                                    {question.answerCount === 1
                                      ? 'answer'
                                      : 'answers'}
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {question.views} views
                                  </Typography>

                                  {question.hasAcceptedAnswer && (
                                    <Chip
                                      label="✓ Answered"
                                      size="small"
                                      color="success"
                                    />
                                  )}
                                </Box>
                              </Box>

                              {/* Upvotes */}
                              <Box
                                sx={{
                                  ml: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  minWidth: 60,
                                }}
                              >
                                <Typography variant="h6" color="primary">
                                  {question.upvotes}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  votes
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Results Count */}
            {questions.length > 0 && (
              <Box textAlign="center" mt={4}>
                <Typography variant="body2" color="text.secondary">
                  {t('questions.showing') || 'Showing'} {questions.length}{' '}
                  {questions.length === 1 ? 'question' : 'questions'}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default CQuestionsListPage;
