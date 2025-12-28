/**
 * CAnswerSubmit
 *
 * Component for submitting an answer to a question
 */

import { FC, useState, useCallback, ChangeEvent } from 'react';
import { Box, Alert, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { answersService } from '../../../services/answers.service';
import { CTextField, CButton } from '@/base/components';

interface ICAnswerSubmitProps {
  questionId: string;
  onSuccess?: () => void;
}

export const CAnswerSubmit: FC<ICAnswerSubmitProps> = ({
  questionId,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    setSubmitError(null);
    setError(null);

    setLoading(true);
    try {
      await answersService.create(questionId, { content });

      // Reset form
      setContent('');
      setError(null);

      onSuccess?.();
    } catch (err) {
      console.error('Error creating answer:', err);
      setSubmitError(
        err instanceof Error ? err.message : t('questionsErrorAnswering')
      );
    } finally {
      setLoading(false);
    }
  }, [questionId, content, onSuccess]);

  return (
    <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('questionsYourAnswer')}
      </Typography>

      {submitError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setSubmitError(null)}
        >
          {submitError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CTextField
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          error={!!error}
          helperText={
            error || t('questionsAnswerHelper')
          }
          placeholder={t('questionsAnswerPlaceholder')}
          multiline
          rows={8}
          disabled={loading}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CButton
            onClick={handleSubmit}
            loading={loading}
            disabled={!content.trim()}
          >
            {t('questionsPostAnswer')}
          </CButton>
        </Box>
      </Box>
    </Paper>
  );
};
