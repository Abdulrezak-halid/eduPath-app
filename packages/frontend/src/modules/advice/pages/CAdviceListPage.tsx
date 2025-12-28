/**
 * CAdviceListPage
 *
 * Page for displaying advice with filters and search
 */

import { FC, useState, useCallback, ChangeEvent, KeyboardEvent } from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Chip,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CHeroSection } from '../../../shared/components/CHeroSection';
import {
  useAdvice,
  IAdviceFilters,
  AdviceCategory,
} from '../../../shared/hooks/useAdvice';
import { MajorField } from '../../../models/firestore.models';
import {
  ICSelectOption,
  CTextField,
  CSelect,
  CButton,
  CLoading,
  CEmptyState,
  CBadge,
} from '@/base/components';

export const CAdviceListPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const MAJOR_OPTIONS: ICSelectOption[] = [
    { value: '', label: t('advice.allMajors') },
    { value: 'computer-science', label: t('majors.computerScience') },
    { value: 'engineering', label: t('majors.engineering') },
    { value: 'medicine', label: t('majors.medicine') },
    { value: 'business', label: t('majors.business') },
    { value: 'law', label: t('majors.law') },
    { value: 'arts', label: t('majors.arts') },
    { value: 'sciences', label: t('majors.sciences') },
    { value: 'education', label: t('majors.education') },
    { value: 'architecture', label: t('majors.architecture') },
    { value: 'other', label: t('majors.other') },
  ];

  const CATEGORY_OPTIONS: ICSelectOption[] = [
    { value: '', label: t('advice.allCategories') },
    { value: 'time-management', label: t('categories.timeManagement') },
    { value: 'study-tips', label: t('categories.studyTips') },
    { value: 'career', label: t('categories.career') },
    { value: 'social', label: t('categories.social') },
    { value: 'mental-health', label: t('categories.mentalHealth') },
    { value: 'general', label: t('categories.general') },
  ];
  const [filters, setFilters] = useState<IAdviceFilters>({});
  const [searchInput, setSearchInput] = useState('');

  const { advice, loading, error } = useAdvice(filters);

  const handleSearch = useCallback(() => {
    setFilters((prev) => ({ ...prev, searchQuery: searchInput }));
  }, [searchInput]);

  const handleFilterChange = useCallback(
    (field: keyof IAdviceFilters, value: string) => {
      setFilters((prev) => ({
        ...prev,
        [field]: value || undefined,
      }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setSearchInput('');
  }, []);

  const activeFiltersCount =
    (filters.major ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <Box>
      <CHeroSection
        title={t('advice.expertAdvice')}
        subtitle={t('advice.expertAdviceSubtitle')}
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search and Filters */}
        <Card sx={{ mb: 4, p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <CTextField
                placeholder={t('advice.searchPlaceholder')}
                value={searchInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchInput(e.target.value)
                }
                onKeyPress={(e: KeyboardEvent) =>
                  e.key === 'Enter' && handleSearch()
                }
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSearch} size="small">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CSelect
                label="Major"
                value={filters.major || ''}
                onChange={(e) =>
                  handleFilterChange('major', e.target.value as MajorField)
                }
                options={MAJOR_OPTIONS}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CSelect
                label="Category"
                value={filters.category || ''}
                onChange={(e) =>
                  handleFilterChange(
                    'category',
                    e.target.value as AdviceCategory
                  )
                }
                options={CATEGORY_OPTIONS}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              {activeFiltersCount > 0 && (
                <CButton fullWidth onClick={handleClearFilters}>
                  {t('advice.clearFilters')}
                </CButton>
              )}
            </Grid>
          </Grid>

          {activeFiltersCount > 0 && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {filters.major && (
                <Chip
                  label={`Major: ${filters.major}`}
                  onDelete={() => handleFilterChange('major', '')}
                  size="small"
                />
              )}
              {filters.category && (
                <Chip
                  label={`Category: ${filters.category}`}
                  onDelete={() => handleFilterChange('category', '')}
                  size="small"
                />
              )}
              {filters.searchQuery && (
                <Chip
                  label={`Search: ${filters.searchQuery}`}
                  onDelete={() => handleFilterChange('searchQuery', '')}
                  size="small"
                />
              )}
            </Box>
          )}
        </Card>

        {/* Results */}
        {loading ? (
          <CLoading message={t('advice.errorLoading')} />
        ) : error ? (
          <CEmptyState
            title={t('advice.errorLoading')}
            description={error.message}
            icon={<SearchIcon sx={{ fontSize: 64 }} />}
          />
        ) : advice.length === 0 ? (
          <CEmptyState
            title={t('advice.noAdviceFound')}
            description={t('advice.noAdviceDescription')}
            icon={<SearchIcon sx={{ fontSize: 64 }} />}
          />
        ) : (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {advice.length} {advice.length === 1 ? t('advice.itemFound') : t('advice.itemsFound')}
            </Typography>

            {advice.map((item) => (
              <Card
                key={item.id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 4 },
                  transition: 'box-shadow 0.2s',
                }}
                onClick={() => navigate(`/advice/${item.id}`)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.content}
                  </Typography>

                  <Box
                    sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}
                  >
                    <CBadge
                      label={item.major}
                      status="info"
                      variant="outlined"
                    />
                    <CBadge label={item.category} status="default" />
                    {item.tags.map((tag: string) => (
                      <CBadge key={tag} label={tag} variant="outlined" />
                    ))}
                  </Box>

                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <ThumbUpIcon fontSize="small" color="action" />
                      <Typography variant="body2">{item.upvotes}</Typography>
                    </Box>

                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <VisibilityIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {item.views} {t('advice.views')}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {item.helpfulCount} {t('advice.foundHelpful')}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 'auto' }}
                    >
                      {format(item.createdAt.toDate(), 'MMM d, yyyy')}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};
