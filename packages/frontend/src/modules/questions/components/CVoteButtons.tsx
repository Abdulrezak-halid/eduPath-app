/**
 * CVoteButtons
 *
 * Component for upvote/downvote buttons with vote count display
 */

import { FC, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useVote } from '../../../shared/hooks/useVote';
import { CIconButton } from '@/base/components';

interface ICVoteButtonsProps {
  contentType: 'question' | 'answer' | 'advice';
  contentId: string;
  questionId?: string;
  upvotes: number;
  downvotes: number;
}

export const CVoteButtons: FC<ICVoteButtonsProps> = memo(
  ({ contentType, contentId, questionId, upvotes, downvotes }) => {
    const { t } = useTranslation();
    const { userVote, voting, handleVote } = useVote({
      contentType,
      contentId,
      questionId,
    });

    const voteScore = upvotes - downvotes;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <CIconButton
          tooltip={t('questionsUpvote')}
          onClick={() => handleVote('upvote')}
          disabled={voting}
          color={userVote === 'upvote' ? 'primary' : 'default'}
          size="small"
        >
          <ArrowUpwardIcon />
        </CIconButton>

        <Typography
          variant="body2"
          fontWeight="bold"
          color={
            voteScore > 0
              ? 'success.main'
              : voteScore < 0
                ? 'error.main'
                : 'text.secondary'
          }
        >
          {voteScore}
        </Typography>

        <CIconButton
          tooltip={t('questionsDownvote')}
          onClick={() => handleVote('downvote')}
          disabled={voting}
          color={userVote === 'downvote' ? 'error' : 'default'}
          size="small"
        >
          <ArrowDownwardIcon />
        </CIconButton>
      </Box>
    );
  }
);

CVoteButtons.displayName = 'CVoteButtons';
