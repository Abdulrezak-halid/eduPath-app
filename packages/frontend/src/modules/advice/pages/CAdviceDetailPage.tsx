import { FC, useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import { getAdviceById, likeAdvice } from '@/shared/hooks/useAdvice';
import { Advice } from '@/models';
import { useAuth } from '@/shared/contexts/AuthContext';

export const CAdviceDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const loadAdvice = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getAdviceById(id);
        setAdvice(data);
      } catch (err: any) {
        setError(err.message || t('adviceErrorLoading'));
      } finally {
        setLoading(false);
      }
    };

    loadAdvice();
  }, [id, t]);

  const handleLike = async () => {
    if (!id || !currentUser || isLiking) return;
    
    try {
      setIsLiking(true);
      await likeAdvice(id, currentUser.uid);
      
      // Reload advice to get updated likes
      const updatedAdvice = await getAdviceById(id);
      setAdvice(updatedAdvice);
    } catch (err: any) {
      console.error('Error liking advice:', err);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return format(date, 'PPP');
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {t('adviceLoading')}
        </Typography>
      </Container>
    );
  }

  if (error || !advice) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || t('adviceNotFound')}
        </Alert>
        <IconButton onClick={() => navigate('/advice')}>
          <ArrowBackIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate('/advice')} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {advice.title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Chip label={t(`majors${advice.major}`)} color="primary" size="small" />
            <Chip label={t(`categories${advice.category}`)} variant="outlined" size="small" />
            {advice.tags?.map((tag: string) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" sx={{ mb: 4, whiteSpace: 'pre-wrap' }}>
            {advice.content}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={advice.authorPhotoURL} alt={advice.authorName}>
                {advice.authorName[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {advice.authorName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(advice.createdAt)}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <IconButton 
                onClick={handleLike} 
                disabled={!currentUser || isLiking}
                color="primary"
              >
                <ThumbUpOutlinedIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {advice.upvotes || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                {advice.views || 0} {t('adviceViews')}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
