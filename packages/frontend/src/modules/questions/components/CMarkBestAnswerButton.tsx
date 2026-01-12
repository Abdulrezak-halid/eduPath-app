import { FC, useState, useCallback, memo } from 'react';
import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { questionsService } from '../../../services/questions.service';
import { answersService } from '../../../services/answers.service';
import { CIconButton } from '@/base/components/CIconButton';

interface ICMarkBestAnswerButtonProps {
  questionId: string;
  answerId: string;
  isAccepted: boolean;
  isAuthor: boolean;
  onSuccess?: () => void;
}

export const CMarkBestAnswerButton: FC<ICMarkBestAnswerButtonProps> = memo(
  ({ questionId, answerId, isAccepted, isAuthor, onSuccess }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggle = useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        if (isAccepted) {
          await answersService.unmarkAsAccepted(questionId, answerId);
        } else {
          await answersService.markAsAccepted(questionId, answerId);
          await questionsService.markAnswerAsAccepted(questionId, answerId);
        }

        onSuccess?.();
      } catch (err) {
        console.error('Error toggling best answer:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to update answer'
        );
      } finally {
        setLoading(false);
      }
    }, [questionId, answerId, isAccepted, onSuccess]);

    if (!isAuthor) {
      return null;
    }

    return (
      <>
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <CIconButton
          tooltip={isAccepted ? t('questionsUnmarkBestAnswer') : t('questionsMarkBestAnswer')}
          onClick={handleToggle}
          disabled={loading}
          color={isAccepted ? 'success' : 'default'}
        >
          {isAccepted ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </CIconButton>
      </>
    );
  }
);

CMarkBestAnswerButton.displayName = 'CMarkBestAnswerButton';
