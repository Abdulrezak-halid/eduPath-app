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
import { CSubmitAdviceDialog } from '../components/CSubmitAdviceDialog';
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
    { value: '', label: t('adviceAllMajors') },
    { value: 'computer-science', label: t('majorsComputerScience') },
    { value: 'engineering', label: t('majorsEngineering') },
    { value: 'medicine', label: t('majorsMedicine') },
    { value: 'business', label: t('majorsBusiness') },
    { value: 'law', label: t('majorsLaw') },
    { value: 'arts', label: t('majorsArts') },
    { value: 'sciences', label: t('majorsSciences') },
    { value: 'education', label: t('majorsEducation') },
    { value: 'architecture', label: t('majorsArchitecture') },
    { value: 'other', label: t('majorsOther') },
  ];

  const CATEGORY_OPTIONS: ICSelectOption[] = [
    { value: '', label: t('adviceAllCategories') },
    { value: 'time-management', label: t('categoriesTimeManagement') },
    { value: 'study-tips', label: t('categoriesStudyTips') },
    { value: 'career', label: t('categoriesCareer') },
    { value: 'social', label: t('categoriesSocial') },
    { value: 'mental-health', label: t('categoriesMentalHealth') },
    { value: 'general', label: t('categoriesGeneral') },
  ];
  const [filters, setFilters] = useState<IAdviceFilters>({});
  const [searchInput, setSearchInput] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const { advice, loading, error, refetch } = useAdvice(filters);

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

  const handleOpenDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleAdviceSubmitted = useCallback(() => {
    refetch();
    setDialogOpen(false);
  }, [refetch]);

  const activeFiltersCount =
    (filters.major ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <Box>
      <CHeroSection
        title={t('adviceExpertAdvice')}
        subtitle={t('adviceExpertAdviceSubtitle')}
      >
        <CButton
          variant="primary"
          size="large"
          onClick={handleOpenDialog}
          sx={{ mt: 2 }}
        >
          {t('adviceShareAdvice')}
        </CButton>
      </CHeroSection>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search and Filters */}
        <Card sx={{ mb: 4, p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <CTextField
                placeholder={t('adviceSearchPlaceholder')}
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
                  {t('adviceClearFilters')}
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
          <CLoading message={t('adviceErrorLoading')} />
        ) : error ? (
          <CEmptyState
            title={t('adviceErrorLoading')}
            description={error.message}
            icon={<SearchIcon sx={{ fontSize: 64 }} />}
          />
        ) : advice.length === 0 ? (
          <CEmptyState
            title={t('adviceNoAdviceFound')}
            description={t('adviceNoAdviceDescription')}
            icon={<SearchIcon sx={{ fontSize: 64 }} />}
          />
        ) : (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {advice.length} {advice.length === 1 ? t('adviceItemFound') : t('adviceItemsFound')}
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
                        {item.views} {t('adviceViews')}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {item.helpfulCount} {t('adviceFoundHelpful')}
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

      <CSubmitAdviceDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleAdviceSubmitted}
      />
    </Box>
  );
};
