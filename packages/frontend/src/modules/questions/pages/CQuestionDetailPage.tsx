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
  TextField,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import { getQuestionById, addAnswer } from '@/shared/hooks/useQuestions';
import { Question } from '@/models';
import { useAuth } from '@/shared/contexts/AuthContext';

export const CQuestionDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadQuestion = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getQuestionById(id);
        setQuestion(data);
      } catch (err: any) {
        setError(err.message || t('questionErrorLoading'));
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [id, t]);

  const handleSubmitAnswer = async () => {
    if (!id || !currentUser || !answerText.trim() || submitting) return;

    try {
      setSubmitting(true);
      await addAnswer(id, {
        content: answerText,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email || 'Anonymous',
        authorPhotoURL: currentUser.photoURL || '',
      });

      // Reload question to show new answer
      const updatedQuestion = await getQuestionById(id);
      setQuestion(updatedQuestion);
      setAnswerText('');
    } catch (err: any) {
      console.error('Error submitting answer:', err);
    } finally {
      setSubmitting(false);
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
          {t('questionLoading')}
        </Typography>
      </Container>
    );
  }

  if (error || !question) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || t('questionNotFound')}
        </Alert>
        <IconButton onClick={() => navigate('/questions')}>
          <ArrowBackIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate('/questions')} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Question Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {question.title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Chip label={question.major} color="primary" size="small" />
            <Chip label={question.category} variant="outlined" size="small" />
            {question.tags?.map((tag: string) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" sx={{ mb: 4, whiteSpace: 'pre-wrap' }}>
            {question.content}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={question.authorPhotoURL} alt={question.authorName}>
                {question.authorName[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {question.authorName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(question.createdAt)}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                {question.answerCount || 0} {t('questionAnswers')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                {question.views || 0} {t('questionViews')}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom fontWeight="bold">
        {t('questionAnswers')} ({question.answerCount || 0})
      </Typography>

      {question.answerCount === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No answers yet. Be the first to answer!
        </Alert>
      )}

      {/* Note: In real implementation, load answers from subcollection */}
      {/* <Card sx={{ mb: 2 }}>...</Card> */}

      {currentUser ? (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('questionYourAnswer')}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder={t('questionAnswerPlaceholder')}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSubmitAnswer}
              disabled={!answerText.trim() || submitting}
            >
              {submitting ? t('questionSubmitting') : t('questionSubmitAnswer')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="info" sx={{ mt: 4 }}>
          {t('questionSignInToAnswer')}
        </Alert>
      )}
    </Container>
  );
};
